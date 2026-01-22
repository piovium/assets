import path from "node:path";

export const publicDir = path.join(import.meta.dirname, "../../public");
export const imageDir = path.join(import.meta.dirname, "../../public/assets");
export const thumbImageDir = path.join(imageDir, "thumbs");
export const outputDir = path.join(import.meta.dirname, "../output");