import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";
import { addMeasurement, completeOnboardingStep, hasInitialMeasurement, removeMeasurement, useAppState } from "@/lib/store";

export const Route = createFileRoute("/medidas")({
  head: () => ({ meta: [{ title: "Medidas — VITTALLE" }, { name: "description", content: "Acompanhe sua evolução com medidas opcionais." }] }),
  component: Medidas,
});

function Medidas() {
  const [state] = useAppState();
  const [form, setForm] = useState({ date: new Date().toISOString().slice(0, 10), waist: "", abdomen: "", weight: "", energy: "3", bloating: "3", notes: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const isFirstMeasurement = !hasInitialMeasurement(state);
    addMeasurement({
      date: form.date,
      waist: form.waist ? Number(form.waist) : undefined,
      abdomen: form.abdomen ? Number(form.abdomen) : undefined,
      weight: form.weight ? Number(form.weight) : undefined,
      energy: Number(form.energy),
      bloating: Number(form.bloating),
      notes: form.notes || undefined,
      initial: isFirstMeasurement || undefined,
    });
    if (isFirstMeasurement) {
      completeOnboardingStep("medicaoInicial", true);
      completeOnboardingStep("orientacaoMedicao", true);
    }
    setForm({ ...form, waist: "", abdomen: "", weight: "", notes: "" });
    toast.success(isFirstMeasurement ? "Medição inicial registrada" : "Medida registrada");
  };


  const del = (id: string) => {
    if (confirm("Deseja excluir esta medida?")) {
      removeMeasurement(id);
      toast.success("Medida removida");
    }
  };

  return (
    <AppShell title="Medidas" subtitle="Opcional e no seu ritmo" back="/progresso">
      <p className="mb-4 text-xs text-text-secondary">Essas informações são pessoais e servem apenas para acompanhar sua evolução.</p>

      <form onSubmit={submit} className="grid gap-3 rounded-2xl border border-border bg-surface p-5">
        <Field label="Data"><input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Cintura (cm)"><input type="number" value={form.waist} onChange={(e) => setForm({ ...form, waist: e.target.value })} className="input" placeholder="Ex.: 82" /></Field>
          <Field label="Abdômen (cm)"><input type="number" value={form.abdomen} onChange={(e) => setForm({ ...form, abdomen: e.target.value })} className="input" placeholder="Ex.: 88" /></Field>
        </div>
        <Field label="Peso (kg)"><input type="number" step="0.1" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} className="input" placeholder="Ex.: 68.5" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-1 text-xs text-text-secondary">
            <span>Energia (1 a 5): <b className="text-text-primary">{form.energy}</b></span>
            <input type="range" min={1} max={5} value={form.energy} onChange={(e) => setForm({ ...form, energy: e.target.value })} />
            <div className="flex justify-between text-[10px] text-text-muted">
              <span>1 = muito baixa</span>
              <span>5 = muito alta</span>
            </div>
          </label>
          <label className="grid gap-1 text-xs text-text-secondary">
            <span>Inchaço (1 a 5): <b className="text-text-primary">{form.bloating}</b></span>
            <input type="range" min={1} max={5} value={form.bloating} onChange={(e) => setForm({ ...form, bloating: e.target.value })} />
            <div className="flex justify-between text-[10px] text-text-muted">
              <span>1 = nenhum</span>
              <span>5 = muito</span>
            </div>
          </label>
        </div>
        <Field label="Observações"><textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input" placeholder="Como você se sentiu?" /></Field>
        <button type="submit" className="mt-2 inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground">
          Salvar medida
        </button>
      </form>

      <h3 className="mb-3 mt-8 text-sm font-semibold text-text-secondary">Histórico</h3>
      {state.measurements.length ? (
        <ul className="grid gap-2">
          {state.measurements.map((m) => (
            <li key={m.id} className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{new Date(m.date).toLocaleDateString("pt-BR")}</p>
                <p className="text-xs text-text-secondary">
                  {m.waist ? `Cintura ${m.waist} cm · ` : ""}{m.abdomen ? `Abdômen ${m.abdomen} cm · ` : ""}{m.weight ? `Peso ${m.weight} kg` : ""}
                </p>
                {m.notes ? <p className="mt-1 text-xs text-text-secondary">{m.notes}</p> : null}
              </div>
              <button type="button" onClick={() => del(m.id)} aria-label="Excluir" className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface-2">
                <Trash2 size={16} aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title="Você ainda não registrou medidas." description="Registrar é opcional e serve apenas para você acompanhar sua evolução." />
      )}

      <style>{`.input{width:100%;border:1px solid var(--color-border);background:var(--color-surface);border-radius:12px;padding:10px 12px;font-size:14px;outline:none}.input:focus{border-color:var(--color-primary)}`}</style>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1 text-xs text-text-secondary">
      <span>{label}</span>
      {children}
    </label>
  );
}
