import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const types = {
  ".css": "text/css",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".html": "text/html",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".json": "application/json"
};

createServer(async (request, response) => {
  const rawPath = request.url === "/" ? "/index.html" : request.url?.split("?")[0] || "/index.html";
  const decodedPath = decodeURIComponent(rawPath);
  const filePath = normalize(join(root, decodedPath));
  if (!filePath.startsWith(root)) return response.writeHead(403).end("Forbidden");
  try {
    const file = await readFile(filePath);
    const info = await stat(filePath);
    if (!info.isFile()) throw new Error("Not a file");
    response.writeHead(200, { "Content-Type": types[extname(filePath)] || "application/octet-stream", "Cache-Control": "no-store" });
    response.end(file);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Not found");
  }
}).listen(port, "0.0.0.0", () => console.log(`Portfolio available at http://localhost:${port}`));
