import { AlertTriangle } from "lucide-react";
import { useSiteSettings } from "../../../services/siteSettings";
import { Field, TextInput, TextArea, Toggle } from "../../components/FormFields";

export default function SystemSettings() {
  const { settings, updateSystemSettings } = useSiteSettings();
  const s = settings.system;

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl text-mist-100 mb-6">System Configuration</h1>

      <div className="rounded-2xl border border-white/5 bg-ink-850 p-5 space-y-5 mb-5">
        <Toggle checked={s.maintenanceMode} onChange={(v) => updateSystemSettings({ maintenanceMode: v })} label="Enable Maintenance Mode" />

        {s.maintenanceMode && (
          <div className="flex items-start gap-2 bg-gold-400/10 border border-gold-400/20 rounded-lg px-3 py-2.5">
            <AlertTriangle size={14} className="text-gold-400 mt-0.5 shrink-0" />
            <p className="text-gold-300 text-xs font-body">
              The public site will show the maintenance page to visitors. You'll still be able to reach /admin as normal.
            </p>
          </div>
        )}

        <Field label="Maintenance Title">
          <TextInput value={s.maintenanceTitle} onChange={(e) => updateSystemSettings({ maintenanceTitle: e.target.value })} />
        </Field>
        <Field label="Maintenance Message">
          <TextArea rows={3} value={s.maintenanceMessage} onChange={(e) => updateSystemSettings({ maintenanceMessage: e.target.value })} />
        </Field>
      </div>

      <div className="rounded-2xl border border-white/5 bg-ink-850 p-5 space-y-4">
        <Toggle checked={s.showContactInfo} onChange={(v) => updateSystemSettings({ showContactInfo: v })} label="Show Contact Information" />
        <Toggle checked={s.showSocialLinks} onChange={(v) => updateSystemSettings({ showSocialLinks: v })} label="Show Social Media Links" />
      </div>
    </div>
  );
}
