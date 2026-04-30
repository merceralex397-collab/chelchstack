import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(here, "../..");

export function resolveRepoPath(inputPath = ".") {
  if (typeof inputPath !== "string" || !inputPath.trim()) {
    throw new Error("Path must be a non-empty string");
  }

  const candidate = path.resolve(repoRoot, inputPath);
  const relative = path.relative(repoRoot, candidate);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error("Path outside repo root");
  }

  return candidate;
}

export async function statOrNull(targetPath) {
  try {
    return await fs.stat(targetPath);
  } catch {
    return null;
  }
}

export async function listFiles(dir = ".") {
  const resolved = resolveRepoPath(dir);
  const entries = await fs.readdir(resolved, { withFileTypes: true });
  return {
    dir: path.relative(repoRoot, resolved) || ".",
    entries: entries
      .map((entry) => ({
        name: entry.name,
        type: entry.isDirectory() ? "dir" : entry.isSymbolicLink() ? "symlink" : "file",
      }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  };
}

export async function readTextFile(filePath) {
  const resolved = resolveRepoPath(filePath);
  const stat = await fs.stat(resolved);
  if (!stat.isFile()) throw new Error("Target is not a file");
  return fs.readFile(resolved, "utf8");
}

export async function ensureDirForFile(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}
