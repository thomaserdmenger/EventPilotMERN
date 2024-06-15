import bcrypt from "bcrypt";
import { User } from "./users.model.js";
import { createSixDigitCode } from "../utils/createSixDigitCode.js";
import { userToView } from "../utils/userToView.js";
import { sendEmail } from "../utils/sendEmail.js";
import { createAccessToken } from "../utils/createAccessToken.js";

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

    const registerdUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: passwordHash,
      verificationCode,
    });

    await sendEmail({
      to: registerdUser.email,
      subject: "Welcome to Event Pilot",
      text: `Hi ${registerdUser.firstname} ${registerdUser.lastname},
        Welcome to Event Pilot.
        Please enter your 6 Digit Code to verify your Email-address: ${registerdUser.verificationCode}`,
    });

    res.json({ user: userToView(registerdUser) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Could not register user." });
  }
};

export const verifyUserEmailCtrl = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json("User not found. Please register.");

    if (user.isVerified) return res.status(400).json("E-Mail already verified.");

    if (user.verificationCode !== verificationCode)
      return res.status(500).json("Wrong Verification Code. Try again.");

    const verifiedUser = await User.findOneAndUpdate(
      { email },
      { $set: { isVerified: true } },
      { new: true }
    );

    res.json({ user: userToView(verifiedUser) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Could not verify user email." });
  }
};

export const loginUserCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json("User not found. Please register.");

    if (!user.isVerified)
      return res.status(400).json("Please verify your Email address to login to your account.");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json("Incorrect password. Please try again.");
    }

    const accessToken = createAccessToken(user);

    res.cookie("accessToken", accessToken, { maxAge: 28 * 24 * 3600 * 1000, httpOnly: true });

    res.json({ user: userToView(user) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Could not login user." });
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
