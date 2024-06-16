import { Router } from "express";
import { doUserAuth } from "../middleware/doUserAuth.js";
import { postRegisterForAnEventCtrl } from "./eventRegistration.controller.js";

export const participantRouter = Router().post("/", doUserAuth, postRegisterForAnEventCtrl);
