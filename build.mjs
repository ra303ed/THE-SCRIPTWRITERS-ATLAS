import { cp, copyFile, mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root, "dist");
const requiredFiles = ["index.html", "app.js", "styles.css", "course", "THE SCRIPTWRITERS ATLAS.zip"];

for (const relativePath of requiredFiles) {
  try {
    await stat(path.join(root, relativePath));
  } catch {
    throw new Error(`Build input is missing: ${relativePath}`);
  }
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const filename of ["index.html", "app.js", "styles.css"]) {
  await copyFile(path.join(root, filename), path.join(output, filename));
}

await cp(path.join(root, "course"), path.join(output, "course"), { recursive: true });
await copyFile(path.join(root, "THE SCRIPTWRITERS ATLAS.zip"), path.join(output, "source-atlas.zip"));

async function measure(directory) {
  let bytes = 0;
  let files = 0;
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const itemPath = path.join(directory, item.name);
    if (item.isDirectory()) {
      const result = await measure(itemPath);
      bytes += result.bytes;
      files += result.files;
    } else {
      const info = await stat(itemPath);
      bytes += info.size;
      files += 1;
    }
  }
  return { bytes, files };
}

const totals = await measure(output);
console.log(`Built ${totals.files} files into dist/ (${(totals.bytes / 1024 / 1024).toFixed(2)} MiB).`);
console.log("Included the Markdown course, current audio, application assets, and original source archive.");
