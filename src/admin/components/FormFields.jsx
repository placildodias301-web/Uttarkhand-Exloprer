export function Field({ label, required, hint, children }) {
  return (
    <div>
      {label && (
        <label className="block text-mist-300 font-body text-sm mb-1.5">
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
      )}
      {children}
      {hint && <p className="text-mist-400 text-xs font-body mt-1">{hint}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg bg-ink-800 border border-white/10 px-3.5 py-2.5 text-sm font-body text-mist-100 placeholder:text-mist-400 outline-none focus:border-moss-500/50 transition-colors";

export function TextInput(props) {
  return <input {...props} className={`${inputClass} ${props.className || ""}`} />;
}

export function TextArea(props) {
  return <textarea {...props} className={`${inputClass} resize-y ${props.className || ""}`} />;
}

export function Select({ children, ...props }) {
  return (
    <select {...props} className={`${inputClass} ${props.className || ""}`}>
      {children}
    </select>
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-block h-6 w-11 rounded-full shrink-0 transition-colors duration-200 ${
          checked ? "bg-moss-500" : "bg-ink-600"
        }`}
      >
        {/* The knob is anchored with an explicit left offset. Without one, an
            absolutely-positioned child inside a <button> starts at the
            button's centre, which pushed the knob out of the track. */}
        <span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-[left] duration-200"
          style={{ left: checked ? 22 : 2 }}
        />
      </button>
      {label && (
        <span onClick={() => onChange(!checked)} className="text-mist-200 font-body text-sm cursor-pointer select-none">
          {label}
        </span>
      )}
    </div>
  );
}
