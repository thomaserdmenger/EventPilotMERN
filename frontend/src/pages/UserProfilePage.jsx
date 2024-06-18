import HeaderNav from "../components/HeaderNav";
import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../api/api";
import { UserContext } from "../context/UserContext";

const UserProfilePage = () => {
  const { user } = useContext(UserContext);
  const [followers, setFollowers] = useState(0);

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

  return (
    <>
      <HeaderNav />
      <div>
        <p>UserImage</p>
        <article className="flex gap-6 justify-center items-center">
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
      </div>
    </>
  );
};

export default UserProfilePage;
