import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { useAuth } from "@/lib/auth";
import { useProfile } from "@/lib/profile";

export const Route = createFileRoute("/perfil/dados")({
  head: () => ({ meta: [{ title: "Dados pessoais — VITTALLE" }, { name: "description", content: "Atualize suas informações." }] }),
  component: Dados,
});

function Dados() {
  const { user } = useAuth();
  const { profile, loading: profileLoading, updateProfile } = useProfile();
  const [form, setForm] = useState({ name: "", whatsapp: "" });
  const [photo, setPhoto] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Preenche o formulário assim que o profile real chega do Supabase (nunca com dado fictício).
  useEffect(() => {
    if (profileLoading) return;
    setForm({ name: profile?.name ?? "", whatsapp: profile?.whatsapp ?? "" });
  }, [profile, profileLoading]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    const { error } = await updateProfile({ name: form.name, whatsapp: form.whatsapp });
    setSaving(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Alterações salvas");
  };

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(String(reader.result));
    reader.readAsDataURL(file);
  };

  const avatarLetter = (form.name || user?.email || "").slice(0, 1).toUpperCase();

  return (
    <AppShell title="Dados pessoais" back="/perfil" hideMiniPlayer>
      <form onSubmit={save} className="grid gap-3 rounded-2xl border border-border bg-surface p-5">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-warm text-lg font-semibold text-primary-dark">
            {photo ? <img src={photo} alt="" className="h-full w-full object-cover" /> : avatarLetter}
          </div>
          <label className="inline-flex min-h-10 cursor-pointer items-center rounded-xl border border-border bg-surface px-3 text-xs font-medium hover:bg-surface-2">
            Alterar foto
            <input type="file" accept="image/*" className="hidden" onChange={onPhoto} />
          </label>
        </div>
        <Field label="Nome"><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" /></Field>
        <Field label="E-mail">
          <input type="email" value={user?.email ?? ""} disabled readOnly className="input opacity-70" />
          <span className="mt-1 block text-[11px] text-text-muted">E-mail da sua conta — não pode ser alterado aqui.</span>
        </Field>
        <Field label="WhatsApp"><input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="(00) 00000-0000" className="input" /></Field>
        <div className="mt-2 flex gap-2">
          <button type="submit" disabled={saving} className="min-h-12 flex-1 rounded-xl bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-60">
            {saving ? "Salvando…" : "Salvar alterações"}
          </button>
          <button type="button" onClick={() => history.back()} className="min-h-12 rounded-xl border border-border px-4 text-sm">Cancelar</button>
        </div>
      </form>
      <style>{`.input{width:100%;border:1px solid var(--color-border);background:var(--color-surface);border-radius:12px;padding:10px 12px;font-size:14px;outline:none}.input:focus{border-color:var(--color-primary)}`}</style>
    </AppShell>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="grid gap-1 text-xs text-text-secondary"><span>{label}</span>{children}</label>;
}
