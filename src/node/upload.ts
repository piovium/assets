import { s3 } from "bun";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { publicDir } from "./config";
import "./generate_thumbs";

const entries = await readdir(publicDir, {
  recursive: true,
  withFileTypes: true,
});
const filenames = entries
  .filter((entry) => entry.isFile())
  .map((entry) => path.join(path.relative(publicDir, entry.path), entry.name));
for (const filename of filenames) {
  console.log(`Uploading ${filename}...`);
  await s3.file(filename).write(Bun.file(path.join(publicDir, filename)));
  console.log(`Uploaded ${filename}`);
}
