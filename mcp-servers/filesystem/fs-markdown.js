import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { resolveRepoPath } from "./fs-root.js";

export function slugifyMarkdownTitle(title) {
  return String(title ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "note";
}

export async function writeMarkdownNote(folder, title, body) {
  const targetDir = resolveRepoPath(folder || ".notes");
  await mkdir(targetDir, { recursive: true });
  const baseName = `${new Date().toISOString().slice(0, 10)}-${slugifyMarkdownTitle(title)}.md`;
  const targetPath = path.join(targetDir, baseName);
  const content = `---\ntitle: ${title}\ncreated: ${new Date().toISOString()}\n---\n\n${body}\n`;
  await writeFile(targetPath, content, "utf8");
  return { path: targetPath, content };
}
