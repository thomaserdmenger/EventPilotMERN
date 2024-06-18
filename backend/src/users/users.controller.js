import bcrypt from "bcrypt";
import { User } from "./users.model.js";
import { createSixDigitCode } from "../utils/createSixDigitCode.js";
import { userToView } from "../utils/userToView.js";
import { sendEmail } from "../utils/sendEmail.js";
import { createAccessToken } from "../utils/createAccessToken.js";
import { trusted } from "mongoose";
import { Bookmark } from "../bookmarks/bookmarks.model.js";
import { Participant } from "../eventRegistration/eventRegistration.model.js";
import { Follower } from "../followers/followers.model.js";
import { Review } from "../reviews/reviews.model.js";
import { deleteImage } from "../utils/deleteImage.js";
import { uploadImage } from "../utils/uploadImage.js";
import { Event } from "../events/events.model.js";

export const registerUserCtrl = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errorMessage: "User with this email exists" });
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

export const resentEmailCtrl = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ errorMessage: "User not found. Please register." });
    if (user.isVerified) return res.status(400).json({ errorMessage: "User is already verified." });

    await sendEmail({
      to: user.email,
      subject: "Welcome to Event Pilot",
      text: `Hi ${user.firstname} ${user.lastname},
        Welcome to Event Pilot.
        Please enter your 6 Digit Code to verify your Email-address: ${user.verificationCode}`,
    });

    res.json({ message: "Email successfully resend" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Could not resend validation code.",
    });
  }
};

export const verifyUserEmailCtrl = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ errorMessage: "User not found. Please register." });

    if (user.isVerified) return res.status(400).json({ errorMessage: "E-Mail already verified." });

    if (user.verificationCode !== verificationCode)
      return res.status(500).json({ errorMessage: "Wrong Verification Code. Try again." });

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

    if (!user) return res.status(400).json({ errorMessage: "User not found. Please register." });

    if (!user.isVerified)
      return res.status(400).json({
        user,
        errorMessage: "Please verify your Email address to login to your account.",
      });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ errorMessage: "Incorrect password. Please try again." });
    }

    const accessToken = createAccessToken(user);

    res.cookie("accessToken", accessToken, {
      maxAge: 28 * 24 * 3600 * 1000,
      httpOnly: true,
    });

    const bookmarks = await Bookmark.find({ userId: user._id });
    const registeredEvents = await Participant.find({ userId: user._id });
    const followedUsers = await Follower.find({ userId: user._id });

    res.json({
      user: userToView(user),
      bookmarks,
      registeredEvents,
      followedUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Could not login user." });
  }
};

export const logoutUserCtrl = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.json({ message: "Logout successful!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Could not logout user." });
  }
};

export const showOneUserCtrl = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ errorMessage: "User not found. Please register." });

    const receivedReviews = await Review.find({
      reviewedUserId: userId,
    }).populate("reviews.userId", "username email");

    res.json({ user: userToView(user), receivedReviews });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Could not show particular user.",
    });
  }
};

export const patchUserCtrl = async (req, res) => {
  try {
    const user = await User.findById(req.authenticatedUser._id);
    if (!user) return res.status(400).json({ errorMessage: "User not found. Please register." });

    const { firstname, lastname, username, bio, interests } = req.body;

    console.log(req.body);

    // if there is a req.file: upload event-image to cloudinary-folder EventPilot/eventImages and delete the old event-image
    // else: take the old event-image infos and save them anew
    const profileImage = req.file ? req.file : null;
    let public_id;
    let secure_url;
    if (profileImage) {
      deleteImage(user.profileImage.public_id);
      const uploadResult = await uploadImage(profileImage.buffer, "profileImages");
      public_id = uploadResult.public_id;
      secure_url = uploadResult.secure_url;
    } else {
      public_id = user.profileImage.public_id;
      secure_url = user.profileImage.secure_url;
    }

    // update authenticated user infos
    const updatedUser = await User.findByIdAndUpdate(
      req.authenticatedUser._id,
      {
        firstname,
        lastname,
        username,
        bio,
        interests: interests.length === 0 ? [] : interests?.split(","),
        "profileImage.public_id": public_id,
        "profileImage.secure_url": secure_url,
      },
      { new: true }
    );

    res.json({ user: userToView(updatedUser) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Could not edit user." });
  }
};

export const deleteOneUserCtrl = async (req, res) => {
  try {
    const authenticatedUserId = req.authenticatedUser._id;
    const [deletedUser, foundEvents] = await Promise.all([
      User.findByIdAndDelete(authenticatedUserId),
      Event.find({ userId: { $in: authenticatedUserId } }), // find events to delete their cloudinary images later
      Event.deleteMany({
        userId: { $in: authenticatedUserId },
      }),
      Review.deleteMany({ reviewedUserId: { $in: authenticatedUserId } }),
      Bookmark.deleteMany({ userId: { $in: authenticatedUserId } }),
      Participant.deleteMany({ userId: { $in: authenticatedUserId } }),
      Follower.deleteMany({
        userId: { $in: authenticatedUserId },
      }),
      Follower.deleteMany({ followedUserId: { $in: authenticatedUserId } }),
    ]);

    if (!deletedUser)
      return res.status(400).json({
        errorMessage: `User with the email ${deletedUser.email} not found. Please register.`,
      });

    // delete cloudinary images of deleted events
    foundEvents.map((singleEvent) => deleteImage(singleEvent.eventImage.public_id));

    res.clearCookie("accessToken");

    res.json({
      user: userToView(deletedUser),
      message: "User successfully deleted.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Could not delete this user.",
    });
  }
};
