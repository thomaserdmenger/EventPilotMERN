import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../api/api";
import HeaderNav from "../components/HeaderNav";

const HostProfilePage = () => {
  const { userId } = useParams();
  const [host, setHost] = useState({});
  // console.log(hostId);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Host Data (user information + reviews)
      const resHost = await fetch(`${backendUrl}/api/v1/users/${userId}`, {
        credentials: "include",
      });

      const hostData = await resHost.json();
      setHost(hostData);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-svh">
      <HeaderNav />
      <section>
        <article className=" flex justify-center mb-[40px] mt-2">
          {host?.user?.profileImage?.public_id ? (
            <img
              className="rounded-full max-h-40"
              src={host?.user?.profileImage?.secure_url}
              alt="User Image"
            />
          ) : (
            <img
              className="rounded-full max-h-40"
              src="/images/avatar_default.png"
              alt="User Image"
            />
          )}
        </article>
      </section>
    </div>
  );
};

export default HostProfilePage;
