import { s3 } from "bun";
import { publicDir } from "./config";
import "./generate_thumbs";

const glob = new Bun.Glob("**");
for await (const path of glob.scan(publicDir)) {
  const file = Bun.file(path);
  if (file.type.startsWith("image/")) {
    console.log("Uploading", path);
    await s3.file(path).write(file);
    console.log("Uploaded", path);
  }
}
