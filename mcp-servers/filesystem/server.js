import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import {
  ensureDirForFile,
  listFiles,
  readTextFile,
  resolveRepoPath,
  repoRoot,
} from "./fs-root.js";
import { writeMarkdownNote } from "./fs-markdown.js";

const port = Number(process.env.PORT || 8787);
const mcpPath = "/mcp";

function asTextContent(text) {
  return [{ type: "text", text }];
}

function toolResponse({ text, structuredContent, meta }) {
  return {
    content: text ? asTextContent(text) : [],
    structuredContent,
    _meta: meta ?? {},
  };
}

function createServer() {
  const server = new McpServer({ name: "chelchstack-filesystem", version: "0.1.0" });

  server.registerTool(
    "list_files",
    {
      title: "List files",
      description: "Use this when you need to inspect repo structure.",
      inputSchema: {
        dir: z.string().default(".").describe("Directory relative to repo root"),
      },
      annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false, idempotentHint: true },
    },
    async ({ dir }) => toolResponse({ structuredContent: await listFiles(dir) })
  );

  server.registerTool(
    "read_file",
    {
      title: "Read file",
      description: "Use this when you need file contents from this repo.",
      inputSchema: {
        path: z.string().describe("File path relative to repo root"),
      },
      annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false, idempotentHint: true },
    },
    async ({ path: filePath }) => {
      const content = await readTextFile(filePath);
      const absPath = resolveRepoPath(filePath);
      return toolResponse({
        text: `Read ${path.relative(repoRoot, absPath)}.`,
        structuredContent: { path: path.relative(repoRoot, absPath), content },
      });
    }
  );

  server.registerTool(
    "write_file",
    {
      title: "Write file",
      description: "Use this when you need to create or replace a file in the repo.",
      inputSchema: {
        path: z.string(),
        content: z.string(),
      },
      annotations: { readOnlyHint: false, openWorldHint: false, destructiveHint: false },
    },
    async ({ path: filePath, content }) => {
      const absPath = resolveRepoPath(filePath);
      await ensureDirForFile(absPath);
      await fs.writeFile(absPath, content, "utf8");
      return toolResponse({
        text: `Wrote ${path.relative(repoRoot, absPath)}.`,
        structuredContent: { path: path.relative(repoRoot, absPath), bytes: Buffer.byteLength(content, "utf8") },
      });
    }
  );

  server.registerTool(
    "move_path",
    {
      title: "Move path",
      description: "Use this when you need to rename or move a file or folder inside the repo.",
      inputSchema: {
        from: z.string(),
        to: z.string(),
      },
      annotations: { readOnlyHint: false, openWorldHint: false, destructiveHint: true },
    },
    async ({ from, to }) => {
      const src = resolveRepoPath(from);
      const dst = resolveRepoPath(to);
      await ensureDirForFile(dst);
      await fs.rename(src, dst);
      return toolResponse({
        text: `Moved ${path.relative(repoRoot, src)} to ${path.relative(repoRoot, dst)}.`,
        structuredContent: { from: path.relative(repoRoot, src), to: path.relative(repoRoot, dst) },
      });
    }
  );

  server.registerTool(
    "delete_path",
    {
      title: "Delete path",
      description: "Use this when you need to remove a file or folder from the repo.",
      inputSchema: {
        path: z.string(),
      },
      annotations: { readOnlyHint: false, openWorldHint: false, destructiveHint: true },
    },
    async ({ path: targetPath }) => {
      const absPath = resolveRepoPath(targetPath);
      await fs.rm(absPath, { recursive: true, force: true });
      return toolResponse({
        text: `Deleted ${path.relative(repoRoot, absPath)}.`,
        structuredContent: { path: path.relative(repoRoot, absPath) },
      });
    }
  );

  server.registerTool(
    "save_markdown_note",
    {
      title: "Save markdown note",
      description: "Use this when ChatGPT should save user input as a markdown note in the repo.",
      inputSchema: {
        title: z.string(),
        body: z.string(),
        folder: z.string().default("docs/inbox"),
      },
      annotations: { readOnlyHint: false, openWorldHint: false, destructiveHint: false, idempotentHint: false },
    },
    async ({ title, body, folder }) => {
      const note = await writeMarkdownNote(folder, title, body);
      return toolResponse({
        text: `Saved markdown note to ${path.relative(repoRoot, note.path)}.`,
        structuredContent: {
          path: path.relative(repoRoot, note.path),
          title,
          folder,
        },
      });
    }
  );

  return server;
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : undefined;
}

const httpServer = http.createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400).end("Missing URL");
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "content-type": "text/plain; charset=utf-8" }).end("chelchstack filesystem MCP server");
    return;
  }

  if (url.pathname === mcpPath) {
    try {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id");
      if (req.method === "OPTIONS") {
        res.writeHead(204, {
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "content-type, mcp-session-id",
        });
        res.end();
        return;
      }

      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
        enableJsonResponse: true,
      });
      const body = req.method === "POST" ? await readJsonBody(req) : undefined;

      res.on("close", () => transport.close());
      const server = createServer();
      await server.connect(transport);
      await transport.handleRequest(req, res, body);
    } catch (error) {
      console.error("MCP request failed:", error);
      if (!res.headersSent) {
        res.writeHead(500, { "content-type": "application/json; charset=utf-8" });
      }
      if (!res.writableEnded) {
        res.end(JSON.stringify({
          jsonrpc: "2.0",
          error: { code: -32603, message: "Internal server error" },
          id: null,
        }));
      }
    }
    return;
  }

  res.writeHead(404).end("Not Found");
});

httpServer.listen(port, () => {
  console.log(`Filesystem MCP server listening on http://localhost:${port}${mcpPath}`);
});
