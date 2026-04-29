import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  userId?: number;
}

export const check = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
//   const error: any = new Error("Unauthorized or Token is missing");
//   error.status = 401;
//   error.code = "ErROR_UNAUTHORIZED";
//   return next(error);

  req.userId = 12345;
  next();
};
