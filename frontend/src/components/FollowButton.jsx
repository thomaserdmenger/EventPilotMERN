import { useState } from "react";
import CustomButton from "./CustomButton";
import { backendUrl } from "../api/api";

const FollowButton = ({ followedUserId }) => {
  console.log({ followedUserId });
  const [errorMessage, setErrorMessage] = useState("");

  const addFollower = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/followers`, {
      method: "POST",
      credentials: "include",
      body: { followedUserId },
    });
    console.log({ "im fetch": followedUserId });

    const data = await res.json();
    console.log(data);

    if (data.errorMessage) return setErrorMessage(data.errorMessage);
    setErrorMessage("");
  };

  return (
    <CustomButton
      fontSize="12px"
      width="60px"
      height="28px"
      borderRadius="5px"
      bgcolor="#7254EE"
      color="#00ECAA"
      bgcolorHover="#5D3EDE"
      padding="16px"
      text="Follow"
      onClick={addFollower}
    />
  );
};

export default FollowButton;
