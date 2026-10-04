import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useSiteSettings } from "../../../services/siteSettings";
import { TextInput, Toggle } from "../../components/FormFields";
import { getSocialIcon } from "../../../utils/socialIcons";

export default function SocialSettings() {
  const { settings, addSocialPlatform, updateSocialPlatform, removeSocialPlatform } = useSiteSettings();
  const [newPlatform, setNewPlatform] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const onAdd = () => {
    if (!newPlatform.trim() || !newUrl.trim()) return;
    addSocialPlatform({ platform: newPlatform.trim(), url: newUrl.trim(), enabled: true });
    setNewPlatform("");
    setNewUrl("");
  };

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl text-mist-100 mb-6">Social Media</h1>

      <div className="rounded-2xl border border-white/5 bg-ink-850 p-5 space-y-3 mb-5">
        {settings.social.map((s) => {
          const Icon = getSocialIcon(s.platform);
          return (
            <div key={s.id} className="rounded-lg bg-ink-800 border border-white/10 p-3.5 flex items-center gap-3">
              <span className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center text-moss-400 shrink-0">
                <Icon size={16} />
              </span>
              <div className="flex-1 min-w-0 space-y-1.5">
                <p className="text-mist-100 font-body text-sm font-semibold">{s.platform}</p>
                <TextInput
                  value={s.url}
                  onChange={(e) => updateSocialPlatform(s.id, { url: e.target.value })}
                  className="!py-1.5 text-xs"
                />
              </div>
              <Toggle checked={s.enabled} onChange={(v) => updateSocialPlatform(s.id, { enabled: v })} />
              <button onClick={() => removeSocialPlatform(s.id)} className="h-8 w-8 rounded-full flex items-center justify-center text-mist-400 hover:text-rose-400 hover:bg-white/5 shrink-0">
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}
        {settings.social.length === 0 && <p className="text-mist-400 text-sm font-body text-center py-6">No platforms added yet.</p>}
      </div>

      <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
        <p className="font-body font-semibold text-mist-100 text-sm mb-3">Add Social Platform</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <TextInput value={newPlatform} onChange={(e) => setNewPlatform(e.target.value)} placeholder="Platform — e.g. LinkedIn" className="sm:flex-1" />
          <TextInput value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="Profile URL" className="sm:flex-1" />
          <button onClick={onAdd} className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-moss-500 text-ink-950 text-sm font-body font-semibold hover:bg-moss-400 shrink-0">
            <Plus size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
