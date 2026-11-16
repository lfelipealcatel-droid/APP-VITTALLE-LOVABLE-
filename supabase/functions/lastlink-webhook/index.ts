import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// Mapeamento preferencial: ID do produto na Lastlink -> product_code
const PRODUCT_MAP: Record<string, string> = {
  "5d38d177-cb62-45cb-a58c-91e84b82bd05": "plano-barriga-hormonal-40-plus",
};

// Mapeamento reserva: NOME do produto na Lastlink (normalizado) -> product_code
const PRODUCT_NAME_MAP: Record<string, string> = {
  "plano barriga hormonal 40+": "plano-barriga-hormonal-40-plus",
  "desinchar express 24h": "desinchar-express-24h",
  "protocolo noite inteira - sono hormonal 40+": "noite-inteira-sono-40-plus",
  "acelerador de emagrecimento glp-1 natural": "acelerador-glp1-natural",
  "glp-1 natural - ativacao 7 dias": "glp1-ativacao-7-dias",
};

const MAIN_PRODUCT_CODE = "plano-barriga-hormonal-40-plus";

// Cada webhook da Lastlink tem um token proprio. Todos ficam nos Secrets do Supabase.
const TOKEN_ENV_NAMES = [
  "LASTLINK_WEBHOOK_SECRET",
  "LASTLINK_TOKEN_ACELERADOR",
  "LASTLINK_TOKEN_ATIVACAO",
  "LASTLINK_TOKEN_DESINCHAR",
  "LASTLINK_TOKEN_NOITE",
];

const PROVIDER = "lastlink";
const EVENT_PURCHASE = "Purchase_Order_Confirmed";
const EVENT_REFUND = "Payment_Refund";
const EVENT_CHARGEBACK = "Payment_Chargeback";
const APP_URL = "https://app.vittalle.com.br";
const RESET_PATH = "/redefinir-senha";
const EMAIL_FROM = "VITTALLE <noreply@vittalle.com.br>";
const EMAIL_SUBJECT = "Crie sua senha para acessar a VITTALLE";

function json(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeEmail(value: unknown): string {
  return clean(value).toLowerCase();
}

function normalizeName(value: unknown): string {
  return clean(value)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function allowedTokens(): string[] {
  const list: string[] = [];
  for (const name of TOKEN_ENV_NAMES) {
    const v = (Deno.env.get(name) ?? "").trim();
    if (v) list.push(v);
  }
  return list;
}

function admin() {
  return createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}

async function findUserIdByEmail(db: ReturnType<typeof admin>, email: string): Promise<string | null> {
  const perPage = 200;
  const MAX_PAGES = 50;
  for (let page = 1; page <= MAX_PAGES; page++) {
    const { data, error } = await db.auth.admin.listUsers({ page, perPage });
    if (error) throw new Error("auth_list_failed: " + error.message);
    const found = data.users.find((u) => (u.email ?? "").toLowerCase() === email);
    if (found) return found.id;
    if (data.users.length < perPage) break;
  }
  return null;
}

async function createUser(db: ReturnType<typeof admin>, email: string, name: string, phone: string): Promise<string> {
  const { data, error } = await db.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: { name: name || undefined, whatsapp: phone || undefined, source: PROVIDER },
  });
  if (error || !data?.user) throw new Error("auth_create_failed: " + (error?.message ?? "unknown"));
  return data.user.id;
}

async function markEventError(db: ReturnType<typeof admin>, eventId: string, message: string): Promise<void> {
  await db.from("webhook_events").update({
    processing_status: "error",
    error_message: message,
    processed_at: new Date().toISOString(),
  }).eq("provider", PROVIDER).eq("external_event_id", eventId);
}

async function markEventDone(db: ReturnType<typeof admin>, eventId: string, note: string | null): Promise<boolean> {
  const { error } = await db.from("webhook_events").update({
    processing_status: "done",
    error_message: note,
    processed_at: new Date().toISOString(),
  }).eq("provider", PROVIDER).eq("external_event_id", eventId);
  if (error) {
    console.error("LASTLINK_EVENT_FINALIZE_ERROR", JSON.stringify({ eventId, msg: error.message }));
    return false;
  }
  return true;
}

// Registra o evento como "processing". Retorna: "new", "done" ou "error".
async function registerEvent(db: ReturnType<typeof admin>, eventId: string, eventType: string, payload: unknown): Promise<string> {
  const { error: insErr } = await db.from("webhook_events").insert({
    provider: PROVIDER,
    external_event_id: eventId,
    event_type: eventType,
    processing_status: "processing",
    payload: payload,
  });
  if (!insErr) return "new";
  const code = (insErr as { code?: string }).code;
  if (code !== "23505") {
    console.error("LASTLINK_EVENT_INSERT_ERROR", JSON.stringify({ eventId, code, msg: insErr.message }));
    return "error";
  }
  const { data: existing, error: selErr } = await db
    .from("webhook_events")
    .select("processing_status")
    .eq("provider", PROVIDER)
    .eq("external_event_id", eventId)
    .maybeSingle();
  if (selErr) {
    console.error("LASTLINK_EVENT_LOOKUP_ERROR", JSON.stringify({ eventId, msg: selErr.message }));
    return "error";
  }
  if (existing?.processing_status === "done") return "done";
  return "new";
}

async function generateAccessLink(db: ReturnType<typeof admin>, email: string): Promise<string> {
  const { data, error } = await db.auth.admin.generateLink({
    type: "recovery",
    email,
    options: { redirectTo: APP_URL + RESET_PATH },
  });
  const link = data?.properties?.action_link;
  if (error || !link) throw new Error("generate_link_failed: " + (error?.message ?? "no_link"));
  return link;
}

function buildEmailHtml(greeting: string, accessLink: string, hasMainProduct: boolean): string {
  const accessLine = hasMainProduct
    ? "<p>Seu acesso ao Plano Barriga Hormonal 40+ foi liberado.</p>"
    : "<p>Seu acesso a VITTALLE foi liberado.</p>";
  const parts = [
    '<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;color:#1a1a1a;">',
    '<h2>Bem-vinda a VITTALLE</h2>',
    '<p>' + greeting + '</p>',
    accessLine,
    '<p>Para comecar, crie sua senha de acesso clicando no botao abaixo:</p>',
    '<p style="text-align:center;margin:32px 0;">',
    '<a href="' + accessLink + '" style="background:#1a1a1a;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:8px;display:inline-block;">Criar minha senha</a>',
    '</p>',
    '<p>Depois de criar sua senha, acesse o aplicativo em: ' + APP_URL + '</p>',
    '<p style="color:#888;font-size:13px;margin-top:32px;">Se voce nao realizou esta compra, ignore este e-mail.</p>',
    '</div>',
  ];
  return parts.join("");
}

async function sendAccessEmail(toEmail: string, toName: string, accessLink: string, hasMainProduct: boolean): Promise<boolean> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.error("RESEND_API_KEY nao configurado.");
    return false;
  }
  const greeting = toName ? ("Ola, " + toName + "!") : "Ola!";
  const html = buildEmailHtml(greeting, accessLink, hasMainProduct);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + apiKey },
      body: JSON.stringify({ from: EMAIL_FROM, to: [toEmail], subject: EMAIL_SUBJECT, html }),
    });
    if (!res.ok) {
      const txt = await res.text();
      console.error("RESEND_SEND_FAILED", JSON.stringify({ status: res.status, body: txt.slice(0, 300) }));
      return false;
    }
    return true;
  } catch (e) {
    console.error("RESEND_SEND_EXCEPTION", e instanceof Error ? e.message : String(e));
    return false;
  }
}

function mapProducts(products: Array<Record<string, unknown>>): string[] {
  const codes: string[] = [];
  const unmapped: Array<{ id: string; name: string }> = [];
  for (const p of products) {
    const id = clean(p.Id);
    const code = PRODUCT_MAP[id] ?? PRODUCT_NAME_MAP[normalizeName(p.Name)];
    if (code) {
      if (!codes.includes(code)) codes.push(code);
    } else {
      unmapped.push({ id, name: clean(p.Name) });
    }
  }
  if (unmapped.length > 0) {
    console.warn("LASTLINK_UNMAPPED_PRODUCTS", JSON.stringify(unmapped));
  }
  return codes;
}

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

    const tokens = allowedTokens();
    if (tokens.length === 0) {
      console.error("Nenhum token de webhook configurado.");
      return json({ ok: false, error: "server_configuration_error" }, 500);
    }
    const receivedToken = (req.headers.get("x-lastlink-token") ?? "").trim();
    if (!receivedToken || !tokens.includes(receivedToken)) {
      console.warn("LASTLINK_WEBHOOK_UNAUTHORIZED", JSON.stringify({ hasToken: Boolean(receivedToken) }));
      return json({ ok: false, error: "unauthorized" }, 401);
    }

    let payload: Record<string, unknown>;
    try {
      payload = await req.json();
    } catch {
      return json({ ok: false, error: "invalid_json" }, 400);
    }

    const eventId = clean(payload.Id);
    const eventType = clean(payload.Event);
    const isTest = payload.IsTest === true;
    const data = (payload.Data ?? {}) as Record<string, unknown>;

    if (!eventId || !eventType) {
      console.warn("LASTLINK_INVALID_PAYLOAD", JSON.stringify({ hasId: Boolean(eventId), hasEvent: Boolean(eventType) }));
      return json({ ok: false, error: "invalid_payload" }, 400);
    }

    const products = Array.isArray(data.Products) ? (data.Products as Array<Record<string, unknown>>) : [];
    const rawOffer = (data.Offer ?? {}) as Record<string, unknown>;
    console.info("LASTLINK_RAW_EVENT", JSON.stringify({
      eventId,
      eventType,
      isTest,
      productIds: products.map((p) => clean(p.Id)),
      productNames: products.map((p) => clean(p.Name)),
      offerId: clean(rawOffer.Id),
      offerName: clean(rawOffer.Name),
    }));

    const isPurchase = eventType === EVENT_PURCHASE;
    const isRevoke = eventType === EVENT_REFUND || eventType === EVENT_CHARGEBACK;

    if (!isPurchase && !isRevoke) {
      console.info("LASTLINK_EVENT_IGNORED", JSON.stringify({ eventType }));
      return json({ ok: true, ignored: true, eventType });
    }

    const buyer = (data.Buyer ?? {}) as Record<string, unknown>;
    const buyerEmail = normalizeEmail(buyer.Email);
    const purchase = (data.Purchase ?? {}) as Record<string, unknown>;
    const paymentId = clean(purchase.PaymentId);
    const grantedCodes = mapProducts(products);

    // ---- EVENTO DE TESTE: somente logs ----
    if (isTest) {
      console.info("LASTLINK_TEST_PARSED", JSON.stringify({ eventId, eventType, buyerEmailPresent: Boolean(buyerEmail), mappedCodes: grantedCodes }));
      return json({ ok: true, test: true, eventId, eventType, mappedCodes: grantedCodes });
    }

    const db = admin();

    // ---- IDEMPOTENCIA ----
    const status = await registerEvent(db, eventId, eventType, payload);
    if (status === "error") return json({ ok: false, error: "event_register_failed" }, 500);
    if (status === "done") {
      console.info("LASTLINK_EVENT_ALREADY_DONE", JSON.stringify({ eventId }));
      return json({ ok: true, duplicate: true, eventId });
    }

    // =====================================================
    //  REFUND / CHARGEBACK: revoga SOMENTE os produtos do evento
    // =====================================================
    if (isRevoke) {
      const newStatus = eventType === EVENT_REFUND ? "refunded" : "chargeback";

      // Correcao A: produto desconhecido NAO revoga nada.
      if (grantedCodes.length === 0) {
        await markEventDone(db, eventId, "revoke_no_mapped_product");
        console.warn("LASTLINK_REVOKE_NO_MAPPED_PRODUCT", JSON.stringify({ eventId, productIds: products.map((p) => clean(p.Id)) }));
        return json({ ok: true, eventId, revoked: 0, note: "produto nao mapeado" });
      }

      if (!buyerEmail) {
        await markEventError(db, eventId, "missing_buyer_email_on_revoke");
        return json({ ok: false, error: "missing_buyer_email" }, 422);
      }

      let userId: string | null = null;
      try {
        userId = await findUserIdByEmail(db, buyerEmail);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        await markEventError(db, eventId, msg);
        return json({ ok: false, error: "user_lookup_failed" }, 500);
      }

      if (!userId) {
        await markEventDone(db, eventId, "revoke_user_not_found");
        console.info("LASTLINK_REVOKE_NO_USER", JSON.stringify({ eventId, eventType }));
        return json({ ok: true, eventId, revoked: 0, note: "usuario nao encontrado" });
      }

      let revokedCount = 0;
      for (const code of grantedCodes) {
        const { error: updErr, count } = await db
          .from("entitlements")
          .update({ status: newStatus, updated_at: new Date().toISOString() }, { count: "exact" })
          .eq("user_id", userId)
          .eq("product_code", code);
        if (updErr) {
          await markEventError(db, eventId, "revoke_failed: " + updErr.message);
          console.error("LASTLINK_REVOKE_ERROR", JSON.stringify({ eventId, code, msg: updErr.message }));
          return json({ ok: false, error: "revoke_failed" }, 500);
        }
        revokedCount += count ?? 0;
      }

      // Correcao B: atualiza somente a compra deste pagamento.
      if (paymentId) {
        await db.from("purchases").update({ status: newStatus }).eq("external_payment_id", paymentId);
      } else {
        console.warn("LASTLINK_REVOKE_NO_PAYMENT_ID", JSON.stringify({ eventId }));
      }

      if (!(await markEventDone(db, eventId, null))) {
        return json({ ok: false, error: "event_finalize_failed" }, 500);
      }

      console.info("LASTLINK_REVOKE_DONE", JSON.stringify({ eventId, eventType, userId, codes: grantedCodes, revokedCount, newStatus }));
      return json({ ok: true, eventId, revoked: revokedCount, status: newStatus });
    }

    // =====================================================
    //  COMPRA CONFIRMADA
    // =====================================================
    const buyerName = clean(buyer.Name);
    const buyerPhone = clean(buyer.PhoneNumber);
    const paymentObj = (purchase.Payment ?? {}) as Record<string, unknown>;
    const paymentMethod = clean(paymentObj.PaymentMethod);
    const priceObj = (purchase.Price ?? {}) as Record<string, unknown>;
    const priceValue = typeof priceObj.Value === "number" ? priceObj.Value : null;
    const amountCents = priceValue !== null ? Math.round(priceValue * 100) : null;

    if (grantedCodes.length === 0) {
      if (!(await markEventDone(db, eventId, "no_mapped_product"))) {
        return json({ ok: false, error: "event_finalize_failed" }, 500);
      }
      console.info("LASTLINK_NO_MAPPED_PRODUCT", JSON.stringify({ eventId, productIds: products.map((p) => clean(p.Id)) }));
      return json({ ok: true, eventId, granted: 0, note: "produto nao mapeado" });
    }

    if (!buyerEmail) {
      await markEventError(db, eventId, "missing_buyer_email");
      return json({ ok: false, error: "missing_buyer_email" }, 422);
    }

    let userId: string;
    let isNewUser = false;
    try {
      const existingId = await findUserIdByEmail(db, buyerEmail);
      if (existingId) {
        userId = existingId;
      } else {
        userId = await createUser(db, buyerEmail, buyerName, buyerPhone);
        isNewUser = true;
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      await markEventError(db, eventId, msg);
      return json({ ok: false, error: "user_processing_failed" }, 500);
    }

    const primaryCode = grantedCodes.includes(MAIN_PRODUCT_CODE) ? MAIN_PRODUCT_CODE : grantedCodes[0];

    let purchaseId: string | null = null;
    if (paymentId) {
      const { data: purIns, error: purErr } = await db
        .from("purchases")
        .insert({
          user_id: userId,
          buyer_email: buyerEmail,
          buyer_name: buyerName || null,
          buyer_phone: buyerPhone || null,
          provider: PROVIDER,
          external_payment_id: paymentId,
          external_event_id: eventId,
          product_code: primaryCode,
          status: "confirmed",
          payment_method: paymentMethod || null,
          amount_cents: amountCents,
          raw_payload: payload,
        })
        .select("id")
        .maybeSingle();
      if (purErr) {
        const code = (purErr as { code?: string }).code;
        if (code === "23505") {
          const { data: existingPur, error: findErr } = await db
            .from("purchases")
            .select("id")
            .eq("external_payment_id", paymentId)
            .maybeSingle();
          if (findErr) {
            await markEventError(db, eventId, "purchase_lookup_failed: " + findErr.message);
            return json({ ok: false, error: "purchase_lookup_failed" }, 500);
          }
          purchaseId = existingPur?.id ?? null;
        } else {
          await markEventError(db, eventId, "purchase_failed: " + purErr.message);
          return json({ ok: false, error: "purchase_failed" }, 500);
        }
      } else {
        purchaseId = purIns?.id ?? null;
      }
    }

    let grantedCount = 0;
    for (const code of grantedCodes) {
      const { error: entErr } = await db
        .from("entitlements")
        .upsert(
          { user_id: userId, product_code: code, status: "active", source: PROVIDER, purchase_id: purchaseId },
          { onConflict: "user_id,product_code" },
        );
      if (entErr) {
        await markEventError(db, eventId, "entitlement_failed: " + entErr.message);
        return json({ ok: false, error: "entitlement_failed" }, 500);
      }
      grantedCount++;
    }

    let accessEmailStatus = "skipped_existing_user";
    {
      const { data: evRow } = await db
        .from("webhook_events")
        .select("access_email_status")
        .eq("provider", PROVIDER)
        .eq("external_event_id", eventId)
        .maybeSingle();
      const current = evRow?.access_email_status ?? null;
      if (current === "sent") {
        accessEmailStatus = "sent";
      } else if (isNewUser) {
        try {
          const link = await generateAccessLink(db, buyerEmail);
          const ok = await sendAccessEmail(buyerEmail, buyerName, link, grantedCodes.includes(MAIN_PRODUCT_CODE));
          accessEmailStatus = ok ? "sent" : "failed";
        } catch (e) {
          console.error("LASTLINK_ACCESS_EMAIL_ERROR", e instanceof Error ? e.message : String(e));
          accessEmailStatus = "failed";
        }
      }
    }

    const { error: doneErr } = await db.from("webhook_events").update({
      processing_status: "done",
      error_message: null,
      access_email_status: accessEmailStatus,
      processed_at: new Date().toISOString(),
    }).eq("provider", PROVIDER).eq("external_event_id", eventId);
    if (doneErr) {
      console.error("LASTLINK_EVENT_FINALIZE_ERROR", JSON.stringify({ eventId, msg: doneErr.message }));
      return json({ ok: false, error: "event_finalize_failed" }, 500);
    }

    console.info("LASTLINK_EVENT_DONE", JSON.stringify({ eventId, userId, purchaseId, codes: grantedCodes, grantedCount, isNewUser, accessEmailStatus }));
    return json({ ok: true, eventId, granted: grantedCount });
  } catch (error) {
    console.error("LASTLINK_WEBHOOK_ERROR", error instanceof Error ? error.message : String(error));
    return json({ ok: false, error: "internal_error" }, 500);
  }
});
