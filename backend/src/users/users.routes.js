import { Router } from "express";
import multer from "multer";
import { doUserAuth } from "../middleware/doUserAuth.js";
import {
  deleteOneUserCtrl,
  loginUserCtrl,
  logoutUserCtrl,
  patchUserCtrl,
  registerUserCtrl,
  showOneUserCtrl,
  verifyUserEmailCtrl,
} from "./users.controller.js";

const upload = multer({ storage: multer.memoryStorage() });

export const userRouter = Router()
  .get("/:userId", doUserAuth, showOneUserCtrl)
  .post("/register", registerUserCtrl)
  .post("/verify-email", verifyUserEmailCtrl)
  .post("/login", loginUserCtrl)
  .post("/logout", doUserAuth, logoutUserCtrl)
  .patch("/:userId", doUserAuth, upload.single("profileImage"), patchUserCtrl)
  .delete("/", doUserAuth, deleteOneUserCtrl);
