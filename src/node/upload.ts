import { s3 } from "bun";
import { join } from "node:path";
import { publicDir } from "./config";
import "./generate_thumbs";

const glob = new Bun.Glob("**");
for await (const path of glob.scan(publicDir)) {
  const file = Bun.file(join(publicDir, path));
  if (file.type.startsWith("image/")) {
    console.log("Uploading", path);
    await s3.file(path).write(file);
    console.log("Uploaded", path);
  }
}
