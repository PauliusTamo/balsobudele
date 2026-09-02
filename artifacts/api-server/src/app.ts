import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes/index";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

if (process.env.NODE_ENV === "production") {
  const apiDir = path.dirname(fileURLToPath(import.meta.url));
  const frontendDistCandidates = [
    path.resolve(apiDir, "../../balso-budele/dist/public"),
    path.resolve(process.cwd(), "artifacts/balso-budele/dist/public"),
    path.resolve(process.cwd(), "../balso-budele/dist/public"),
  ];
  const frontendDistPath = frontendDistCandidates.find((candidate) =>
    existsSync(path.join(candidate, "index.html")),
  );

  if (!frontendDistPath) {
    throw new Error(
      "Frontend build not found. Expected artifacts/balso-budele/dist/public/index.html.",
    );
  }

  app.use(express.static(frontendDistPath));
  app.get(/^(?!\/api(?:\/|$)).*/, (_req, res, next) => {
    res.sendFile(path.join(frontendDistPath, "index.html"), (error) => {
      if (error) {
        next(error);
      }
    });
  });
}

export default app;
