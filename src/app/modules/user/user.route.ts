import { UserControllers } from "./user.controller.js";
import { createUserZodSchema } from "./user.validation.js";
import { validateRequest } from "../../middlewares/validateRequest.js";

import { checkAuth } from "../../middlewares/checkAuth.js";
import { Router } from "express";
import { Role } from "./user.interface.js";
const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),

  UserControllers.createUser,
);
router.get(
  "/all-users",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  UserControllers.getAllUsers,
);

export const UserRoutes = router;
