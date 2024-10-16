import { Router } from "express";
import { rateLimit } from "express-rate-limit";

import { avatarConfig } from "../constants/image.constants";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { fileMiddleware } from "../middlewares/file.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();
// router.use(rateLimit({ windowMs: 2 * 60 * 1000, limit: 5 }));

router.get(
  "/",
  commonMiddleware.isQueryValid(UserValidator.listQuery),
  userController.getList,
);

router.get(
  "/me",
  rateLimit({ windowMs: 2 * 60 * 1000, limit: 5 }),
  authMiddleware.checkAccessToken,
  userController.getMe,
);
router.put(
  "/me",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(UserValidator.update),
  userController.updateMe,
);
router.delete("/me", authMiddleware.checkAccessToken, userController.deleteMe);
router.post(
  "/me/avatar",
  authMiddleware.checkAccessToken,
  fileMiddleware.isFileValid("avatar", avatarConfig),
  userController.uploadAvatar,
);
router.delete(
  "/me/avatar",
  authMiddleware.checkAccessToken,
  userController.deleteAvatar,
);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getById,
);

export const userRouter = router;
