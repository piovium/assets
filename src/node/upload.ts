import { s3 } from "bun";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { publicDir } from "./config";
import "./generate_thumbs";

const filenames = await readdir(publicDir, { recursive: true });
for (const filename of filenames) {
  console.log(`Uploading ${filename}...`);
  await s3.file(filename).write(Bun.file(path.join(publicDir, filename)));
  console.log(`Uploaded ${filename}`);
}
