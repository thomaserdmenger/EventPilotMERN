import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const createAccessToken = ({ _id }) => {
  const payload = {
    sub: _id,
    type: "access",
  };

  const accessToken = jwt.sign(payload, jwtSecret, { expiresIn: "4w" });

  return accessToken;
};
