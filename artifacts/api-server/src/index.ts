import app from "./app";
import { logger } from "./lib/logger";

// Add a root route so hitting '/' returns a 200 OK status instead of 'Cannot GET /'
app.get("/", (req, res) => {
  res.status(200).send("API server is up and running!");
});

export { app };
export default app;

const rawPort = process.env["PORT"] ?? "3000";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// Start the server directly for Render
app.listen(port, "0.0.0.0", (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
