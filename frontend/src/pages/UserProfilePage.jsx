import HeaderNav from "../components/HeaderNav";
import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../api/api";
import { UserContext } from "../context/UserContext";
import Button from "@mui/material/Button";
import { FaRegEdit } from "react-icons/fa";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const { user } = useContext(UserContext);
  const [followers, setFollowers] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Get users, that follow the auth user
    const fetchData = async () => {
      const res = await fetch(`${backendUrl}/api/v1/followers/followed`, {
        credentials: "include",
      });
      const data = await res.json();
      setFollowers(data?.followers?.length);
    };

    fetchData();
  }, []);

  const editProfile = () => {
    navigate("/userprofileedit");
  };

  return (
    <>
      <HeaderNav />
      <div>
        <p>UserImage</p>
        <article className="flex gap-6 justify-center items-center mb-9">
          <div className="flex flex-col items-center text-center">
            <p>{user?.followedUsers?.length}</p>
            <p className="text-grey-2 font-roboto-thin text-[14px]">Following</p>
          </div>
          <div className="border-[0.5px] min-h-8"></div>
          <div className="flex flex-col items-center text-center">
            <p>{followers}</p>
            <p className="text-grey-2 font-roboto-thin text-[14px]">Followers</p>
          </div>
        </article>
        <div className="flex justify-center">
          <CustomButton
            fontSize={"16px"}
            color={"#7254EE"}
            width={"50%"}
            borderRadius={"15px"}
            bgcolor={"#ffffff"}
            bgcolorHover={"#ffffff"}
            padding={"16px"}
            text={"Edit Profile"}
            border={"1px solid #7254EE"}
            endIcon={<FaRegEdit />}
            onClick={editProfile}
          />
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
