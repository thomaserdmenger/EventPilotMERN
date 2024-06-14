import bcrypt from "bcrypt";
import { User } from "./users.model.js";
import { createSixDigitCode } from "../utils/createSixDigitCode.js";
import { userToView } from "../utils/userToView.js";

export const registerUserCtrl = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User with this email exists" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const verificationCode = createSixDigitCode();

    // await sendEmail()

    const registerdUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: passwordHash,
      verificationCode,
    });

    res.json({ user: userToView(registerdUser) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const patchUserCtrl = async (req, res) => {
  try {
    // req.body => zu ändernde Daten

    const image = req.file;
    // hier Aufruf von uploadImage(image.buffer) in Abhängigkeit davon, ob ein image existiert
    const uploadResult = image ? await uploadProfileImage(image.buffer) : undefined;
    // hier alle weiteren Funktionen, um den User zu speichern
    // und uploadResult.secure_url als imageProfile im user speichern
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Could not edit user." });
  }
};
