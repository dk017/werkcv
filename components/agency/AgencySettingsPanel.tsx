"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Template = {
  id: string;
  name: string;
  templateId: string;
  colorThemeId: string;
  companyName: string | null;
  website: string | null;
  headerText: string | null;
  footerText: string | null;
  isDefault: boolean;
};

type TeamMember = {
  id: string;
  email: string;
  role: string;
  status: string;
  invitedAt: string;
  acceptedAt: string | null;
};

type AgencySettingsPanelProps = {
  owner: boolean;
  canImport: boolean;
  role: string;
};

type RetentionState = {
  options: number[];
  retentionDays: number;
  policySetAt: string | null;
  needsAcknowledgement: boolean;
  preview?: { packsAffected?: number; packsShortened?: number; earliestExpiry?: string | null };
};

type RetentionPreview = {
  retentionDays: number;
  packsAffected: number;
  packsShortened: number;
  earliestExpiry: string | null;
  previewAt: string;
  previewToken: string;
  requiresConfirmation: boolean;
};

const inputClass = "w-full border-2 border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-500";

async function readResponse(response: Response): Promise<{ data?: Record<string, unknown>; error?: string; code?: string }> {
  const data = await response.json().catch(() => ({})) as Record<string, unknown>;
  if (!response.ok) return { error: typeof data.error === "string" ? data.error : "Er ging iets mis.", code: typeof data.code === "string" ? data.code : undefined, data };
  return { data };
}

export default function AgencySettingsPanel({ owner, canImport, role }: AgencySettingsPanelProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [retention, setRetention] = useState<RetentionState | null>(null);
  const [retentionChoice, setRetentionChoice] = useState("90");
  const [pendingRetention, setPendingRetention] = useState<RetentionPreview | null>(null);
  const [retentionConfirmation, setRetentionConfirmation] = useState("");
  const [pendingMemberRemoval, setPendingMemberRemoval] = useState<string | null>(null);
  const [showDeleteAgency, setShowDeleteAgency] = useState(false);
  const [deleteAgencyConfirmation, setDeleteAgencyConfirmation] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [templateForm, setTemplateForm] = useState({
    name: "Mijn bureaustijl",
    templateId: "professional",
    colorThemeId: "classic-blue",
    companyName: "",
    website: "",
    headerText: "",
    footerText: "",
    isDefault: true,
  });
  const [memberForm, setMemberForm] = useState({ email: "", role: "editor" });
  const importRef = useRef<HTMLInputElement | null>(null);

  const load = async () => {
    const [templateResponse, teamResponse, retentionResponse] = await Promise.all([
      fetch("/api/agency/templates", { cache: "no-store" }),
      fetch("/api/agency/team", { cache: "no-store" }),
      fetch("/api/agency/retention", { cache: "no-store" }),
    ]);
    const templateResult = await readResponse(templateResponse);
    const teamResult = await readResponse(teamResponse);
    if (templateResult.data && Array.isArray(templateResult.data.templates)) setTemplates(templateResult.data.templates as Template[]);
    if (teamResult.data && Array.isArray(teamResult.data.members)) setMembers(teamResult.data.members as TeamMember[]);
    const retentionResult = await readResponse(retentionResponse);
    if (retentionResult.data && typeof retentionResult.data.retentionDays === "number") {
      const loaded = retentionResult.data as unknown as RetentionState;
      setRetention(loaded);
      setRetentionChoice(String(loaded.retentionDays));
    }
    if (templateResult.error && teamResult.error) setError(templateResult.error);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const saveTemplate = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true); setError(null); setNotice(null);
    const response = await fetch("/api/agency/templates", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(templateForm) });
    const result = await readResponse(response);
    setBusy(false);
    if (result.error) { setError(result.error); return; }
    setNotice("Template opgeslagen. Nieuwe MatchPacks gebruiken de standaardstijl.");
    await load();
  };

  const addMember = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true); setError(null); setNotice(null);
    const response = await fetch("/api/agency/team", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(memberForm) });
    const result = await readResponse(response);
    setBusy(false);
    if (result.error) { setError(result.error); return; }
    setMemberForm({ email: "", role: "editor" });
    setNotice("Teamlid toegevoegd. Als die persoon inlogt met dit e-mailadres, verschijnt de workspace automatisch.");
    await load();
  };

  const removeMember = async (id: string) => {
    setBusy(true); setError(null);
    const response = await fetch("/api/agency/team", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    const result = await readResponse(response);
    setBusy(false);
    if (result.error) { setError(result.error); return; }
    setMembers((current) => current.filter((member) => member.id !== id));
    setPendingMemberRemoval(null);
  };

  const importCsv = async () => {
    const file = importRef.current?.files?.[0];
    if (!file) { setError("Kies eerst een CSV-bestand."); return; }
    setBusy(true); setError(null); setNotice(null);
    const form = new FormData();
    form.append("file", file);
    const response = await fetch("/api/agency/csv/import", { method: "POST", body: form });
    const result = await readResponse(response);
    setBusy(false);
    if (result.error) { setError(result.error); return; }
    const count = typeof result.data?.createdCount === "number" ? result.data.createdCount : 0;
    const errors = Array.isArray(result.data?.errors) ? result.data.errors.length : 0;
    setNotice(`${count} CV${count === 1 ? " is" : "'s zijn"} geïmporteerd${errors ? `; ${errors} rij(en) niet verwerkt` : ""}.`);
    if (importRef.current) importRef.current.value = "";
  };

  const previewRetention = async () => {
    const retentionDays = Number(retentionChoice);
    if (!Number.isFinite(retentionDays)) return;
    setBusy(true); setError(null); setNotice(null);
    const previewResponse = await fetch("/api/agency/retention", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ retentionDays, preview: true }),
    });
    const previewResult = await readResponse(previewResponse);
    if (previewResult.error) { setBusy(false); setError(previewResult.error); return; }
    const preview = (previewResult.data?.preview || {}) as { packsAffected?: number; packsShortened?: number; earliestExpiry?: string | null; previewAt?: string; previewToken?: string };
    const previewAt = typeof preview.previewAt === "string" ? preview.previewAt : "";
    const previewToken = typeof preview.previewToken === "string" ? preview.previewToken : "";
    if (!previewAt || !previewToken) { setBusy(false); setError("De retentiepreview is onvolledig. Probeer opnieuw."); return; }
    setPendingRetention({
      retentionDays,
      packsAffected: Number(preview.packsAffected || 0),
      packsShortened: Number(preview.packsShortened || 0),
      earliestExpiry: typeof preview.earliestExpiry === "string" ? preview.earliestExpiry : null,
      previewAt,
      previewToken,
      requiresConfirmation: previewResult.data?.requiresConfirmation === true,
    });
    setRetentionConfirmation("");
    setBusy(false);
  };

  const applyRetention = async () => {
    if (!pendingRetention) return;
    setBusy(true); setError(null); setNotice(null);
    const response = await fetch("/api/agency/retention", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        retentionDays: pendingRetention.retentionDays,
        previewAt: pendingRetention.previewAt,
        previewToken: pendingRetention.previewToken,
        confirmation: pendingRetention.requiresConfirmation ? retentionConfirmation : undefined,
      }),
    });
    const result = await readResponse(response);
    setBusy(false);
    if (result.error) { setError(result.error); return; }
    setPendingRetention(null);
    setRetentionConfirmation("");
    setNotice("Retentiebeleid opgeslagen. MatchPack-inhoud wordt automatisch verwijderd na de gekozen termijn.");
    await load();
  };

  const deleteAgencyData = async () => {
    if (deleteAgencyConfirmation !== "DELETE AGENCY DATA") return;
    setBusy(true); setError(null); setNotice(null);
    const response = await fetch("/api/agency/data", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ confirmation: deleteAgencyConfirmation }) });
    const result = await readResponse(response);
    setBusy(false);
    if (result.error) { setError(result.error); return; }
    setTemplates([]); setMembers([]);
    setShowDeleteAgency(false); setDeleteAgencyConfirmation("");
    setNotice("Agency-data verwijderd. Je abonnement en factuurhistorie zijn behouden.");
  };

  return (
    <div className="mt-8 space-y-8">
      {notice ? <div className="border-2 border-emerald-600 bg-emerald-50 p-4 text-sm font-semibold text-emerald-900">{notice}</div> : null}
      {error ? <div className="border-2 border-rose-600 bg-rose-50 p-4 text-sm font-semibold text-rose-900">{error}</div> : null}

      <section id="retention" className="border-2 border-slate-900 bg-emerald-50 p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Bewaren en verwijderen</p>
        <h2 className="mt-1 text-2xl font-black">Automatische MatchPack-retentie</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-700">Kies hoe lang kandidaat-CV&apos;s, vacaturetekst, bewijsregels, revisies en afgeleide CV&apos;s in MatchPack blijven staan. Facturen, abonnement en verbruikte slots blijven behouden.</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="text-xs font-black uppercase tracking-wide text-slate-600">Bewaartermijn<select className={inputClass} value={retentionChoice} onChange={(event) => setRetentionChoice(event.target.value)} disabled={!owner || busy}>
            {(retention?.options || [30, 90, 180, 365]).map((days) => <option key={days} value={days}>{days} dagen</option>)}
          </select></label>
          <button type="button" disabled={!owner || busy} onClick={() => void previewRetention()} className="border-2 border-slate-900 bg-emerald-400 px-4 py-3 text-sm font-black disabled:opacity-50">Gevolgen bekijken</button>
        </div>
        {pendingRetention ? <div className="mt-5 border-2 border-slate-900 bg-white p-4" role="region" aria-label="Retentiebevestiging">
          <p className="font-black">Controleer vóór toepassen</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">Bewaartermijn: {pendingRetention.retentionDays} dagen · {pendingRetention.packsAffected} MatchPack(s) geraakt · {pendingRetention.packsShortened} krijgt/krijgen een eerdere vervaldatum.</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">Vroegste geplande verwijdering: {pendingRetention.earliestExpiry ? new Intl.DateTimeFormat("nl-NL", { dateStyle: "long" }).format(new Date(pendingRetention.earliestExpiry)) : "geen"}.</p>
          {pendingRetention.requiresConfirmation ? <label className="mt-4 block text-xs font-black uppercase tracking-wide text-slate-600">Typ APPLY RETENTION POLICY<input className={`${inputClass} mt-2`} value={retentionConfirmation} onChange={(event) => setRetentionConfirmation(event.target.value)} autoComplete="off" /></label> : null}
          <div className="mt-4 flex flex-wrap gap-2"><button type="button" disabled={busy || (pendingRetention.requiresConfirmation && retentionConfirmation !== "APPLY RETENTION POLICY")} onClick={() => void applyRetention()} className="border-2 border-slate-900 bg-emerald-400 px-4 py-2 text-sm font-black disabled:opacity-50">Beleid definitief toepassen</button><button type="button" disabled={busy} onClick={() => { setPendingRetention(null); setRetentionConfirmation(""); }} className="border-2 border-slate-300 bg-white px-4 py-2 text-sm font-black">Annuleren</button></div>
        </div> : null}
        <p className="mt-3 text-xs font-semibold text-slate-600">{retention?.needsAcknowledgement ? "Kies en bevestig een beleid om bestaande inhoud te activeren." : "Beleid actief; de exacte vervaldatum staat op elk MatchPack."}</p>
      </section>

      <section id="templates" className="border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Bureaustijl</p><h2 className="mt-1 text-2xl font-black">Herbruikbare MatchPack-templates</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">Kies de CV-opmaak, kleur en vaste koptekst voor nieuwe klantvoorstellen. Je kunt meerdere stijlen bewaren; de standaard wordt automatisch toegepast.</p></div>
          <span className="border border-slate-300 px-3 py-2 text-xs font-black uppercase tracking-wide text-slate-600">Rol: {role}</span>
        </div>
        <form onSubmit={saveTemplate} className="mt-6 grid gap-3 md:grid-cols-2">
          <label className="text-xs font-black uppercase tracking-wide text-slate-600">Naam<input className={inputClass} value={templateForm.name} onChange={(event) => setTemplateForm({ ...templateForm, name: event.target.value })} /></label>
          <label className="text-xs font-black uppercase tracking-wide text-slate-600">CV-layout<select className={inputClass} value={templateForm.templateId} onChange={(event) => setTemplateForm({ ...templateForm, templateId: event.target.value })}><option value="professional">Professional</option><option value="formal">Formal</option><option value="modern">Modern</option><option value="simple">Simple</option></select></label>
          <label className="text-xs font-black uppercase tracking-wide text-slate-600">Kleur<select className={inputClass} value={templateForm.colorThemeId} onChange={(event) => setTemplateForm({ ...templateForm, colorThemeId: event.target.value })}><option value="classic-blue">Classic blue</option><option value="modern-teal">Modern teal</option><option value="elegant-navy">Elegant navy</option><option value="charcoal">Charcoal</option></select></label>
          <label className="text-xs font-black uppercase tracking-wide text-slate-600">Bedrijfsnaam<input className={inputClass} value={templateForm.companyName} onChange={(event) => setTemplateForm({ ...templateForm, companyName: event.target.value })} /></label>
          <label className="text-xs font-black uppercase tracking-wide text-slate-600 md:col-span-2">Website<input className={inputClass} value={templateForm.website} onChange={(event) => setTemplateForm({ ...templateForm, website: event.target.value })} /></label>
          <label className="text-xs font-black uppercase tracking-wide text-slate-600">Vaste koptekst<textarea className={inputClass} rows={2} value={templateForm.headerText} onChange={(event) => setTemplateForm({ ...templateForm, headerText: event.target.value })} /></label>
          <label className="text-xs font-black uppercase tracking-wide text-slate-600">Vaste voettekst<textarea className={inputClass} rows={2} value={templateForm.footerText} onChange={(event) => setTemplateForm({ ...templateForm, footerText: event.target.value })} /></label>
          <label className="flex items-center gap-2 text-sm font-bold md:col-span-2"><input type="checkbox" checked={templateForm.isDefault} onChange={(event) => setTemplateForm({ ...templateForm, isDefault: event.target.checked })} /> Gebruik voor nieuwe MatchPacks</label>
          <button disabled={!owner || busy} className="border-2 border-slate-900 bg-emerald-400 px-4 py-3 text-sm font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] disabled:cursor-not-allowed disabled:opacity-50 md:w-fit">Template opslaan</button>
        </form>
        {templates.length ? <div className="mt-6 divide-y border-2 border-slate-200">{templates.map((template) => <div key={template.id} className="flex flex-wrap items-center justify-between gap-3 px-3 py-3 text-sm"><span className="font-black">{template.name}{template.isDefault ? <span className="ml-2 text-xs font-bold text-emerald-700">Standaard</span> : null}</span><span className="text-xs font-semibold text-slate-500">{template.templateId} · {template.colorThemeId}</span></div>)}</div> : <p className="mt-5 text-sm font-semibold text-slate-500">Nog geen eigen template opgeslagen.</p>}
      </section>

      <section className="border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Toegang</p><h2 className="mt-1 text-2xl font-black">Teamrollen</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">Nodig collega&apos;s uit via hun login-e-mailadres. Er wordt geen wachtwoord gedeeld. Rollen bepalen wie kan bewerken, beoordelen of alleen lezen.</p>
        <form onSubmit={addMember} className="mt-5 flex flex-col gap-3 sm:flex-row"><input className={`${inputClass} sm:max-w-sm`} type="email" placeholder="collega@bureau.nl" value={memberForm.email} onChange={(event) => setMemberForm({ ...memberForm, email: event.target.value })} /><select className={`${inputClass} sm:max-w-xs`} value={memberForm.role} onChange={(event) => setMemberForm({ ...memberForm, role: event.target.value })}><option value="editor">Editor · maken en wijzigen</option><option value="reviewer">Reviewer · controleren en goedkeuren</option><option value="viewer">Viewer · alleen lezen</option></select><button disabled={!owner || busy} className="border-2 border-slate-900 bg-yellow-300 px-4 py-3 text-sm font-black disabled:opacity-50">Teamlid toevoegen</button></form>
        {members.length ? <div className="mt-5 divide-y border-2 border-slate-200">{members.map((member) => <div key={member.id} className="px-3 py-3 text-sm"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-black">{member.email}</p><p className="text-xs font-semibold text-slate-500">{member.role} · {member.status === "active" ? "actief" : "uitgenodigd"}</p></div><button type="button" disabled={!owner || busy} onClick={() => setPendingMemberRemoval(member.id)} className="border border-rose-300 px-3 py-2 text-xs font-black text-rose-700 disabled:opacity-50">Verwijderen</button></div>{pendingMemberRemoval === member.id ? <div className="mt-3 border-2 border-rose-200 bg-rose-50 p-3"><p className="text-xs font-bold text-rose-900">Bevestig dat je {member.email} uit deze workspace wilt verwijderen.</p><div className="mt-2 flex gap-2"><button type="button" disabled={busy} onClick={() => void removeMember(member.id)} className="border-2 border-rose-700 bg-white px-3 py-2 text-xs font-black text-rose-800">Ja, verwijder toegang</button><button type="button" disabled={busy} onClick={() => setPendingMemberRemoval(null)} className="border-2 border-slate-300 bg-white px-3 py-2 text-xs font-black">Annuleren</button></div></div> : null}</div>)}</div> : <p className="mt-5 text-sm font-semibold text-slate-500">Nog geen extra teamleden.</p>}
      </section>

      <section className="border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Gegevens uitwisselen</p><h2 className="mt-1 text-2xl font-black">CSV import en export</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">Importeer een CV-register met de kolommen <code>title,name,professionalTitle,email,phone,location,summary,skills</code>. De import maakt losse CV-documenten en gebruikt je maandlimiet. Export bevat je MatchPack-overzicht.</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center"><input ref={importRef} type="file" accept=".csv,text/csv" disabled={!canImport || busy} className="block w-full border-2 border-slate-300 bg-white px-3 py-2 text-sm font-semibold sm:max-w-md" /><button type="button" disabled={!canImport || busy} onClick={() => void importCsv()} className="border-2 border-slate-900 bg-emerald-400 px-4 py-3 text-sm font-black disabled:opacity-50">CV-register importeren</button><a href="/api/agency/csv/export" className="border-2 border-slate-900 bg-white px-4 py-3 text-center text-sm font-black">MatchPacks exporteren</a></div>
      </section>

      <section className="border-2 border-rose-400 bg-rose-50 p-6">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-rose-700">Verwijderen</p><h2 className="mt-1 text-2xl font-black text-rose-950">Agency-data verwijderen</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-rose-950">Verwijdert MatchPacks, CV&apos;s die via de agency-route zijn gemaakt, revisies, templates en teamtoegang. Abonnement en factuurhistorie blijven behouden. Deze actie is niet terug te draaien.</p>{!showDeleteAgency ? <button type="button" disabled={!owner || busy} onClick={() => setShowDeleteAgency(true)} className="mt-5 border-2 border-rose-700 bg-white px-4 py-3 text-sm font-black text-rose-800 disabled:opacity-50">Agency-data verwijderen</button> : <div className="mt-5 border-2 border-rose-700 bg-white p-4"><label className="block text-xs font-black uppercase tracking-wide text-rose-800">Typ DELETE AGENCY DATA<input className={`${inputClass} mt-2`} value={deleteAgencyConfirmation} onChange={(event) => setDeleteAgencyConfirmation(event.target.value)} autoComplete="off" /></label><div className="mt-3 flex flex-wrap gap-2"><button type="button" disabled={busy || deleteAgencyConfirmation !== "DELETE AGENCY DATA"} onClick={() => void deleteAgencyData()} className="border-2 border-rose-700 bg-rose-100 px-4 py-3 text-sm font-black text-rose-900 disabled:opacity-50">Definitief verwijderen</button><button type="button" disabled={busy} onClick={() => { setShowDeleteAgency(false); setDeleteAgencyConfirmation(""); }} className="border-2 border-slate-300 bg-white px-4 py-3 text-sm font-black">Annuleren</button></div></div>}</section>
    </div>
  );
}
