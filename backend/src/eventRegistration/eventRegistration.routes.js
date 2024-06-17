import { Router } from "express";
import { doUserAuth } from "../middleware/doUserAuth.js";
import {
  deleteUnregisterFromAnEventCtrl,
  getUserEventRegistrationsCtrl,
  postRegisterForAnEventCtrl,
} from "./eventRegistration.controller.js";

export const participantRouter = Router()
  .get("/", doUserAuth, getUserEventRegistrationsCtrl)
  .post("/", doUserAuth, postRegisterForAnEventCtrl)
  .delete("/", doUserAuth, deleteUnregisterFromAnEventCtrl);
