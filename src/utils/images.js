// Image helpers shared by admin uploads and visitor submissions.

export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Large photos are scaled down (longest side 1600px, JPEG) before being
// stored, because localStorage only holds a few MB in total. SVGs, GIFs and
// small images are kept as-is.
export async function prepareImage(file, maxSide = 1600) {
  const original = await fileToDataUrl(file);
  if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size < 300 * 1024) return original;
  try {
    const img = await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = reject;
      el.src = original;
    });
    const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    const compressed = canvas.toDataURL("image/jpeg", 0.82);
    return compressed.length < original.length ? compressed : original;
  } catch {
    return original;
  }
}

