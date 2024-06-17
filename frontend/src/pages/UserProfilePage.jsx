import { useNavigate } from "react-router-dom";
import HeaderNav from "../components/HeaderNav";
import { useEffect, useState } from "react";
import { backendUrl } from "../api/api";

const UserProfilePage = () => {
  const [followedUsers, setFollowedUser] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${backendUrl}/api/v1/followers`, { credentials: "include" });
      const data = await res.json();
      // console.log({ data });
    };

    // fetchData();
  }, []);

  return (
    <>
      <HeaderNav />
      <div>
        <p>UserImage</p>
        <div className="flex gap-6">
          <div>
            <p>{followedUsers}</p>
            <p>Following</p>
          </div>
          <div>
            <p>Zahl</p>
            <p>Following</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
