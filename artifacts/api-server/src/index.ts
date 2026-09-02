import path from "path";
import express from "express";
import app from "./app";
import { logger } from "./lib/logger";

const publicPath = path.join(process.cwd(), "public");
app.use(express.static(publicPath));

app.get("*", (req: any, res: any, next: any) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.join(publicPath, "index.html"), (err) => {
    if (err) {
      res.status(200).send("API server is up and running!");
    }
  });
});

export { app };
export default app;

const rawPort = process.env["PORT"] ?? "3000";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, "0.0.0.0", () => {
  logger.info({ port }, "Server listening");
});
