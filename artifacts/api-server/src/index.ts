import path from "path";
import express, { Request, Response, NextFunction } from "express";
import app from "./app";
import { logger } from "./lib/logger";

// Serve static frontend files from public directory if present
const publicPath = path.join(process.cwd(), "public");
app.use(express.static(publicPath));

// Fallback route for static files or API status
app.get("*", (req: Request, res: Response, next: NextFunction) => {
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

app.listen(port, "0.0.0.0", (err?: Error) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
