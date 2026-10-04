import { useId } from "react";

// Labelled form controls for the public site (Contact, Plan My Trip,
// Share Your Travel Photo). Each control gets a real <label for>.
const control =
  "w-full rounded-xl bg-ink-900/70 border border-white/10 px-4 py-3 text-mist-100 font-body text-sm placeholder:text-mist-400 outline-none transition-colors focus:border-moss-500/60 focus:bg-ink-900";

function Label({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor} className="block text-mist-300 font-body text-sm mb-2">
      {children}
      {required && <span className="text-gold-400 ml-0.5" aria-hidden="true">*</span>}
    </label>
  );
}

export function InputField({ label, required, className = "", ...props }) {
  const id = useId();
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>{label}</Label>
      <input id={id} required={required} {...props} className={control} />
    </div>
  );
}

export function TextAreaField({ label, required, rows = 4, className = "", ...props }) {
  const id = useId();
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>{label}</Label>
      <textarea id={id} required={required} rows={rows} {...props} className={`${control} resize-y`} />
    </div>
  );
}

export function SelectField({ label, required, options, placeholder, className = "", ...props }) {
  const id = useId();
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>{label}</Label>
      <select id={id} required={required} {...props} className={control}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => {
          const value = typeof o === "string" ? o : o.value;
          const text = typeof o === "string" ? o : o.label;
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </select>
    </div>
  );
}
