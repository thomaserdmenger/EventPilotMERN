import { Router } from "express";
import multer from "multer";
import {
  loginUserCtrl,
  patchUserCtrl,
  registerUserCtrl,
  verifyUserEmailCtrl,
} from "./users.controller.js";

const upload = multer({ storage: multer.memoryStorage() });

export const userRouter = Router()
  .post("/register", registerUserCtrl)
  .post("/verify-email", verifyUserEmailCtrl)
  .post("/login", loginUserCtrl)
  .patch("/:userId", upload.single("profileImage"), patchUserCtrl);
