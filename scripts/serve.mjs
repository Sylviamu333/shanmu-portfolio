// A small local server for reviewing the production static export.
import { createServer } from "node:http";
import { stat, readFile } from "node:fs/promises";
import { resolve, relative, extname } from "node:path";
const root = resolve(import.meta.dirname, "../out");
const port = Number(process.env.PORT || 3000);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
};
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    let file = resolve(root, "." + pathname);
    if (relative(root, file).startsWith("..")) {
      res.writeHead(403);
      res.end();
      return;
    }
    try {
      if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
      await stat(file);
    } catch {
      file = resolve(root, "404.html");
      res.statusCode = 404;
    }
    const contents = await readFile(file);
    res.setHeader(
      "Content-Type",
      mime[extname(file)] || "application/octet-stream",
    );
    res.end(req.method === "HEAD" ? undefined : contents);
  } catch {
    res.writeHead(400);
    res.end("Unable to serve this request. Run npm run build first.");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Production preview: http://localhost:${port}`),
);
