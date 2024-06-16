import { Router } from "express";
import { doUserAuth } from "../middleware/doUserAuth.js";
import {
  deleteUnregisterFromAnEventCtrl,
  postRegisterForAnEventCtrl,
} from "./eventRegistration.controller.js";

export const participantRouter = Router()
  .post("/", doUserAuth, postRegisterForAnEventCtrl)
  .delete("/", doUserAuth, deleteUnregisterFromAnEventCtrl);
