import { User } from "../users/users.model.js";
import { Follower } from "./followers.model.js";

// User, die User folgen
export const getUserFollowers = async (req, res) => {
  try {
    const userId = req.authenticatedUser._id;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ errorMessage: "User not found." });

    const followers = await Follower.find({ followedUserId: userId });
    res.json({ userId, followers });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Cannot show the followers of the user.",
    });
  }
};

// User, denen User folgt
export const getFollowedUsers = async (req, res) => {
  try {
    const userId = req.authenticatedUser._id;

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(400)
        .json({ errorMessage: "User not found. Please register." });

    const followedUsers = await Follower.find({ userId });
    res.json({ userId, followedUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Cannot show the users that the user follows.",
    });
  }
};

export const postFollowUserCtrl = async (req, res) => {
  try {
    const userId = req.authenticatedUser._id;
    console.log(userId);
    const { followedUserId } = req.body;
    console.log(followedUserId);

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(400)
        .json({ errorMessage: "User not found. Please register." });

    const followedUser = await User.findById(followedUserId);
    if (!followedUser)
      return res
        .status(400)
        .json({ errorMessage: "Could not follow user. User does not exist." });

    if (userId === followedUserId)
      return res
        .status(400)
        .json({ errorMessage: "You could not follow yourself" });

    const alreadyfollowed = await Follower.findOne({ userId, followedUserId });
    if (alreadyfollowed)
      return res
        .status(400)
        .json({ errorMessage: "You already follow this user." });

    await Follower.create({ userId, followedUserId });
    res.json({ userId, followedUserId });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message || "Could not follow user." });
  }
};

export const deleteUnfollowUserCtrl = async (req, res) => {
  try {
    const userId = req.authenticatedUser._id;
    const { followedUserId } = req.body;

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(400)
        .json({ errorMessage: "User not found. Please register." });

    const followedUser = await User.findById(followedUserId);
    if (!followedUser)
      return res
        .status(400)
        .json({ errorMessage: "Could not follow user. User does not exist." });

    const alreadyfollowed = await Follower.findOne({ userId, followedUserId });
    if (!alreadyfollowed)
      return res
        .status(400)
        .json({ errorMessage: "You do not follow this user." });

    await Follower.deleteOne({ userId, followedUserId });

    res.json({ message: "You successfully unfollow the user" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message || "Could not unfollow user." });
  }
};
