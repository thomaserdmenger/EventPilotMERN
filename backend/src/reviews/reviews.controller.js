import { User } from "../users/users.model.js";
import { Review } from "./reviews.model.js";

export const postAddReviewCtrl = async (req, res) => {
  try {
    const userId = req.authenticatedUser._id;
    const { reviewedUserId, stars, text } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json("User not found. Please register.");

    const reviewedUser = await User.findById(reviewedUserId);
    if (!reviewedUser) return res.status(400).json("Could not review user. User does not exist.");

    if (userId === reviewedUserId) return res.status(400).json("You could not review yourself");

    const alreadyReviewed = await Review.findOne({ reviewedUserId, "reviews.userId": userId });

    console.log(alreadyReviewed);

    if (alreadyReviewed) return res.status(400).json("You already reviewed this user.");

    await Review.create({ reviewedUserId, reviews: { userId, stars, text } });
    res.json({ reviewedUserId, reviews: { userId, stars, text } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Cannot review user." });
  }
};
