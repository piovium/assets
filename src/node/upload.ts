import { s3 } from "bun";
import { join } from "node:path";
import { publicDir } from "./config";
import "./generate_thumbs";

const uploads = [];
let startAfter = undefined;
while (true) {
  const { isTruncated, contents } = await s3.list({ startAfter });
  if (!isTruncated || !contents) break;
  uploads.push(...contents);
  startAfter = contents.at(-1)?.key;
  if (!startAfter) break;
}
const uploadedPaths = new Set(uploads.map((upload) => upload.key));

const glob = new Bun.Glob("**");
for await (const path of glob.scan(publicDir)) {
  const file = Bun.file(join(publicDir, path));
  if (file.type.startsWith("image/")) {
    console.log("Uploading", path);
    await s3.file(path).write(file);
    uploadedPaths.delete(path);
    console.log("Uploaded", path);
  }
}

for (const path of uploadedPaths) {
  console.log("Deleting", path);
  await s3.file(path).delete();
  console.log("Deleted", path);
}
