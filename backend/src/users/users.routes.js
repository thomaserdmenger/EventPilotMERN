import multer from "multer";
import { patchUserCtrl } from "./users.controller";

const upload = multer({ storage: multer.memoryStorage() });

export const userRouter = Router().patch(
  "/:userId",
  upload.single("profileImage"),
  patchUserCtrl
);
