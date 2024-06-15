import { Router } from "express";
import multer from "multer";
import { doUserAuth } from "../middleware/doUserAuth.js";
import {
  deleteOneUserCtrl,
  loginUserCtrl,
  patchUserCtrl,
  registerUserCtrl,
  showOneUserCtrl,
  verifyUserEmailCtrl,
} from "./users.controller.js";

const upload = multer({ storage: multer.memoryStorage() });

export const userRouter = Router()
  .get("/user", doUserAuth, showOneUserCtrl)
  .post("/register", registerUserCtrl)
  .post("/verify-email", verifyUserEmailCtrl)
  .post("/login", loginUserCtrl)
  .patch("/:userId", upload.single("profileImage"), patchUserCtrl)
  .delete("/user", doUserAuth, deleteOneUserCtrl);
