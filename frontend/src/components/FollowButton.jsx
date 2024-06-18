import { useContext } from "react";
import CustomButton from "./CustomButton";
import { backendUrl } from "../api/api";
import { UserContext } from "../context/UserContext";

const FollowButton = ({ followedUserId }) => {
  const { user, setUser } = useContext(UserContext);

  const addFollower = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/followers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ followedUserId }),
    });

    const data = await res.json();
    console.log(data);

    setUser({
      ...user,
      followedUsers: [
        ...user.followedUsers,
        { userId: user.user._id, followedUserId },
      ],
    });
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        followedUsers: [
          ...user.followedUsers,
          { userId: user.user._id, followedUserId },
        ],
      })
    );
  };

  const deleteFollower = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/followers`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ followedUserId }),
    });

    const data = await res.json();
    console.log(data);

    const updatedFollowedIds = user.followedUsers.filter(
      (obj) => obj.followedUserId !== followedUserId
    );
    setUser({
      ...user,
      followedUsers: updatedFollowedIds,
    });
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        followedUsers: updatedFollowedIds,
      })
    );
  };

  return (
    <>
      <CustomButton
        fontSize="12px"
        width="60px"
        height="28px"
        borderRadius="5px"
        bgcolor="#7254EE"
        color="#00ECAA"
        bgcolorHover="#5D3EDE"
        padding="16px"
        text={user?.followedUsers?.length !== 0 ? "Unfollow" : "Follow"}
        type="button"
        onClick={
          user?.followedUsers?.length !== 0 ? deleteFollower : addFollower
        }
      />
    </>
  );
};

export default FollowButton;
