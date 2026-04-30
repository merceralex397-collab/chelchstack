import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { repoRoot, resolveRepoPath } from "./fs-root.js";
import { slugifyMarkdownTitle, writeMarkdownNote } from "./fs-markdown.js";

assert.throws(() => resolveRepoPath(".."), /outside repo root/);
assert.equal(resolveRepoPath("."), repoRoot);
assert.equal(slugifyMarkdownTitle("Hello, World!"), "hello-world");

const tempNoteFolder = path.join("docs", "tmp-notes");
const note = await writeMarkdownNote(tempNoteFolder, "Test Note", "Body");
assert.match(note.path, /tmp-notes[\\/]\d{4}-\d{2}-\d{2}-test-note\.md$/);
const text = await fs.readFile(note.path, "utf8");
assert.match(text, /title: Test Note/);

console.log("filesystem helper tests passed");
