import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import { Limiter } from "./middlewares/rateLimiter";
import healthRoutes from "./routes/v1/health";

export const app = express();

app
  .use(morgan("dev"))
  .use(Limiter)
  .use(helmet())
  .use(compression({}))
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(cors());

app.use('/api/v1',healthRoutes);

// interface CustomRequest extends Request {
//   userId?: number;
// }

// app.get("/health", check, (req: CustomRequest, res: Response) => {
//   throw new Error("Test error handling");
//   res
//     .status(200)
//     .json({ message: "Server is healthy", userId: req.userId || 7 });
// });

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";
  const errorCode = error.code || "INTERNAL_SERVER_ERROR";
  res.status(status).json({ message, errorCode });
});
