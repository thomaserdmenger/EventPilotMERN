import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { backendUrl } from "../api/api";
import EventCardSmall from "../components/EventCardSmall";
import HeaderNav from "../components/HeaderNav";

const HostProfilePage = () => {
  const { userId } = useParams();
  const [host, setHost] = useState({});
  const [userFollows, setUserFollows] = useState(0);
  const [userFollowers, setUserFollowers] = useState(0);
  const [toggleAbout, setToggleAbout] = useState(true);
  const [toggleEvents, setToggleEvents] = useState(false);
  const [toggleReviews, setToggleReviews] = useState(false);
  const [hostEvents, setHostEvents] = useState({});
  const { pathname } = useLocation();

  // console.log(host?.receivedReviews);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Host Data (user information + reviews)
      const resHost = await fetch(`${backendUrl}/api/v1/users/${userId}`, {
        credentials: "include",
      });

      const hostData = await resHost.json();
      setHost(hostData);

      // Fetch Users which this user follows
      const resUserFollows = await fetch(`${backendUrl}/api/v1/followers/following`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId }),
      });

      const userFollowsData = await resUserFollows.json();
      setUserFollows(userFollowsData?.followedUsers?.length);

      // Fetch Users which follow this user
      const resUserFollowers = await fetch(`${backendUrl}/api/v1/followers/followed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId }),
      });

      const userFollowersData = await resUserFollowers.json();
      setUserFollowers(userFollowersData?.followers?.length);

      const hostEventsRes = await fetch(`${backendUrl}/api/v1/users/${userId}`, {
        credentials: "include",
      });

      const hostEventsData = await hostEventsRes.json();
      setHostEvents(hostEventsData?.createdEvents);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-svh pb-8">
      <HeaderNav pathname={pathname} host={host} />
      <section className="px-8">
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
        <article className="flex gap-6 justify-center items-center mb-9">
          <div className="flex flex-col items-center text-center">
            <p>{userFollows}</p>
            <p className="text-grey-2 font-roboto-thin text-[14px]">Following</p>
          </div>
          <div className="border-[0.5px] min-h-8"></div>
          <div className="flex flex-col items-center text-center">
            <p>{userFollowers}</p>
            <p className="text-grey-2 font-roboto-thin text-[14px]">Followers</p>
          </div>
        </article>
        <article className="flex justify-center gap-2 mb-9">
          <p>FollowButton</p>
          <p>RewiewButton</p>
        </article>
        <article>
          <nav className="flex justify-between font-roboto-regular mb-4 uppercase">
            <p
              className={`${toggleAbout && "text-purple-1 border-b-2 border-purple-1"} pb-1`}
              onClick={() => {
                setToggleAbout(true);
                setToggleEvents(false);
                setToggleReviews(false);
              }}>
              About
            </p>
            <p
              className={`${toggleEvents && "text-purple-1 border-b-2 border-purple-1"} pb-1`}
              onClick={() => {
                setToggleEvents(true);
                setToggleAbout(false);
                setToggleReviews(false);
              }}>
              Events
            </p>
            <p
              className={`${toggleReviews && "text-purple-1 border-b-2 border-purple-1"} pb-1`}
              onClick={() => {
                setToggleReviews(true);
                setToggleAbout(false);
                setToggleEvents(false);
              }}>
              Reviews
            </p>
          </nav>
          <div>
            {toggleAbout && (
              <p className="font-roboto-thin break-words overflow-hidden">{host?.user?.bio}</p>
            )}
            {toggleEvents &&
              hostEvents
                ?.sort((a, b) => a.startDate - b.startDate)
                .map((event) => <EventCardSmall key={event?._id} event={event} />)}
          </div>
        </article>
      </section>
    </div>
  );
};

export default HostProfilePage;
