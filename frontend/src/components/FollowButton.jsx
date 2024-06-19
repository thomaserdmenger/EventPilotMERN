import { useContext } from "react";
import CustomButton from "./CustomButton";
import { backendUrl } from "../api/api";
import { UserContext } from "../context/UserContext";

const FollowButton = ({ followedUserId }) => {
  const { user, setUser } = useContext(UserContext);

  const userIsFollowing = user?.followedUsers?.some(
    (obj) =>
      obj.userId === user?.user?._id && obj.followedUserId === followedUserId
  );

  const addFollower = async (e) => {
    e.preventDefault();

    if (user?.user?._id === followedUserId) return;

    const res = await fetch(`${backendUrl}/api/v1/followers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ followedUserId }),
    });

    const data = await res.json();

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
      {userIsFollowing ? (
        // unfollow Button
        <CustomButton
          fontSize="12px"
          border="#5D3EDE"
          width="100px"
          height="28px"
          borderRadius="5px"
          color="#1F1F1F"
          bgcolor="#00ECAA"
          bgcolorHover="#5D3EDE"
          padding="16px"
          text={
            <p className="flex items-center gap-4 font-roboto-thin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <path
                  d="M1 17V14C1 12.3431 2.34315 11 4 11H12C13.6569 11 15 12.3431 15 14V17"
                  stroke="#1F1F1F"
                  strokeWidth="1.5"
                />
                <circle
                  cx="8"
                  cy="4"
                  r="3.25"
                  stroke="#1F1F1F"
                  strokeWidth="1.5"
                />
              </svg>
              Following
            </p>
          }
          type="button"
          onClick={deleteFollower}
        />
      ) : (
        // follow Button
        <CustomButton
          fontSize="12px"
          //   border="1px solid #5D3EDE"
          width="100px"
          height="28px"
          borderRadius="5px"
          color="#5D3EDE"
          bgcolor="white"
          bgcolorHover="#00ECAA"
          padding="16px"
          text={
            <p className="flex items-center gap-4 font-roboto-thin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
              >
                <path
                  d="M2 20V17C2 15.3431 3.34315 14 5 14H13C14.6569 14 16 15.3431 16 17V20"
                  stroke="#5D3EDE"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.5 4V9"
                  stroke="#5D3EDE"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 6.5H15"
                  stroke="#5D3EDE"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="9"
                  cy="7"
                  r="3.25"
                  stroke="#5D3EDE"
                  strokeWidth="1.5"
                />
              </svg>
              Follow
            </p>
          }
          type="button"
          onClick={addFollower}
        />
      )}
    </>
  );
};

export default FollowButton;
