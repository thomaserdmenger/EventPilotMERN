import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export const userRouter = Router().patch(
  "/:userId",
  upload.single("profileImage"),
  registerUserCtrl
);
