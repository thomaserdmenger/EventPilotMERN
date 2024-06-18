import HeaderNav from "../components/HeaderNav";
import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../api/api";
import { UserContext } from "../context/UserContext";

const UserProfilePage = () => {
  const { user } = useContext(UserContext);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
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
        <div className="flex gap-6">
          <div>
            <p>{user?.followedUsers?.length}</p>
            <p>Following</p>
          </div>
          <div>
            <p>{followers}</p>
            <p>Followers</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
