export const userToView = (user) => {
  return {
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    isVerified: user.isVerified,
    profileImg: user.profileImg,
    bio: user.bio,
    interests: user.interests,
  };
};