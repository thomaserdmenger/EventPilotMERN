import { User } from "../users/users.model.js";
import { Review } from "./reviews.model.js";

export const postAddReviewCtrl = async (req, res) => {
  try {
    const userId = req.authenticatedUser._id;
    const { reviewedUserId, stars, text } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ errorMessage: "User not found. Please register." });

    const reviewedUser = await User.findById(reviewedUserId);
    if (!reviewedUser)
      return res.status(400).json({ errorMessage: "Could not review user. User does not exist." });

    if (userId === reviewedUserId)
      return res.status(400).json({ errorMessage: "You could not review yourself" });

    if (text?.length > 140)
      return res
        .status(400)
        .json({ errorMessage: "The review text may contain a maximum of 140 characters." });

    const alreadyReviewed = await Review.findOne({ reviewedUserId, "reviews.userId": userId });

    if (alreadyReviewed)
      return res.status(400).json({ errorMessage: "You already reviewed this user." });

    await Review.create({ reviewedUserId, reviews: { userId, stars, text } });
    res.json({ reviewedUserId, reviews: { userId, stars, text } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Cannot review user." });
  }
};

export const patchUpdateReviewCtrl = async (req, res) => {
  try {
    const userId = req.authenticatedUser._id;
    const { reviewedUserId, stars, text } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json("User not found. Please register.");

    const reviewedUser = await User.findById(reviewedUserId);
    if (!reviewedUser) return res.status(400).json("Could not review user. User does not exist.");

    if (userId === reviewedUserId) return res.status(400).json("You could not review yourself");

    if (text?.length > 140)
      return res.status(400).json("The review text may contain a maximum of 140 characters.");

    const updatedReview = await Review.findOneAndUpdate(
      { reviewedUserId, "reviews.userId": userId },
      {
        reviewedUserId,
        reviews: { userId, stars, text },
      },
      { new: true }
    );

    res.json({
      reviewedUserId,
      reviews: { userId, stars: updatedReview.reviews.stars, text: updatedReview.reviews.text },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Cannot update review." });
  }
};

export const deleteReviewCtrl = async (req, res) => {
  try {
    const userId = req.authenticatedUser._id;
    const { reviewedUserId } = req.body;

    console.log({ userId, reviewedUserId });

    const user = await User.findById(userId);
    if (!user) return res.status(400).json("User not found. Please register.");

    const reviewedUser = await User.findById(reviewedUserId);
    if (!reviewedUser) return res.status(400).json("Could not review user. User does not exist.");

    const review = await Review.findOne({ reviewedUserId, "reviews.userId": userId });
    if (!review) return res.status(400).json("Cannot delete review. Review does not exist.");

    await Review.deleteOne({ reviewedUserId, "reviews.userId": userId });

    res.json({ message: "Review successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Cannot delete review." });
  }
};
