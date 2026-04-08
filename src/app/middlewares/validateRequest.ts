import type { Request, Response, NextFunction } from "express";
import type { ZodTypeAny } from "zod";

export const validateRequest =
  (zodSchema: ZodTypeAny) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await zodSchema.parseAsync(req.body);

      next();
    } catch (error) {
      next(error);
    }
  };
