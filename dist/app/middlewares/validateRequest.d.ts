import type { Request, Response, NextFunction } from "express";
import type { ZodTypeAny } from "zod";
export declare const validateRequest: (zodSchema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=validateRequest.d.ts.map