import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";

// Reads a File into a data URL so it can be stored in localStorage (there's
// no backend/file storage yet — see src/services/*.js for where this will
// eventually be swapped for a real upload call).
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ImageUploadBox({ value, onChange, label = "Main Image", hint = "Recommended size 1200x800px" }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const dataUrl = await fileToDataUrl(file);
    onChange(dataUrl);
  };

  return (
    <div>
      {label && <label className="block text-mist-300 font-body text-sm mb-2">{label}</label>}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        onClick={() => inputRef.current?.click()}
        className={`relative rounded-xl border-2 border-dashed cursor-pointer overflow-hidden flex flex-col items-center justify-center text-center py-8 px-4 transition-colors ${
          dragging ? "border-moss-400 bg-moss-500/5" : "border-white/10 bg-ink-800 hover:border-white/20"
        }`}
      >
        {value ? (
          <>
            <img src={value} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-ink-950/50" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="absolute top-2 right-2 h-7 w-7 rounded-full bg-ink-950/80 text-mist-100 flex items-center justify-center z-10"
              aria-label="Remove image"
            >
              <X size={14} />
            </button>
            <span className="relative z-[1] text-mist-100 text-xs font-body font-semibold bg-ink-950/70 px-3 py-1.5 rounded-full">
              Click to change
            </span>
          </>
        ) : (
          <>
            <ImagePlus size={22} className="text-mist-400 mb-2" />
            <p className="text-mist-300 text-sm font-body">Click to upload or drag and drop</p>
            {hint && <p className="text-mist-400 text-xs font-body mt-1">({hint})</p>}
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}
