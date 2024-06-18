import HeaderNav from "../components/HeaderNav";
import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../api/api";
import { UserContext } from "../context/UserContext";
import { FaRegEdit } from "react-icons/fa";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { categories } from "../constants/categories.js";

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
      <section>
        <div className=" flex justify-center mb-[40px] mt-6">
          <p>UserImage</p>
        </div>
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
        <article className="flex justify-center mb-9">
          <CustomButton
            fontSize={"16px"}
            color={"#7254EE"}
            width={"40%"}
            borderRadius={"15px"}
            bgcolor={"#ffffff"}
            bgcolorHover={"#ffffff"}
            padding={"14px"}
            text={"Edit Profile"}
            border={"1px solid #7254EE"}
            endIcon={<FaRegEdit />}
            onClick={editProfile}
          />
        </article>
        <article className="px-8 mb-9">
          <h2 className="text-[18px] mb-[10px] font-roboto-medium">About me</h2>
          <p className="text-grey-2 font-roboto-thin">{user?.user?.bio}</p>
        </article>
        <article className="px-8 mb-9">
          <h2 className="text-[18px] mb-[10px] font-roboto-medium">Interest</h2>
          <div className="flex gap-2 flex-wrap">
            {user?.user?.interests?.sort().map((item, index) => {
              return (
                <p key={index} className="bg-purple-1 text-white rounded-md px-3 py-1 text-[13px]">
                  {item}
                </p>
              );
            })}
          </div>
        </article>
      </section>
    </>
  );
};

export default UserProfilePage;
