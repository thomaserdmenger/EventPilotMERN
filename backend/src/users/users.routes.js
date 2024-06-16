import { Router } from "express";
import multer from "multer";
import { doUserAuth } from "../middleware/doUserAuth.js";
import {
  deleteOneUserCtrl,
  loginUserCtrl,
  logoutUserCtrl,
  patchUserCtrl,
  registerUserCtrl,
  resentEmailCtrl,
  showOneUserCtrl,
  verifyUserEmailCtrl,
} from "./users.controller.js";

const upload = multer({ storage: multer.memoryStorage() });

export const userRouter = Router()
  .get("/:userId", doUserAuth, showOneUserCtrl)
  .post("/register", registerUserCtrl)
  .post("/resent-email", resentEmailCtrl)
  .post("/verify-email", verifyUserEmailCtrl)
  .post("/login", loginUserCtrl)
  .post("/logout", doUserAuth, logoutUserCtrl)
  .patch("/", doUserAuth, upload.single("profileImage"), patchUserCtrl)
  .delete("/", doUserAuth, deleteOneUserCtrl);
