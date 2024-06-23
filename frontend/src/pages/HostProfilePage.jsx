import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../api/api";
import EventCardSmall from "../components/EventCardSmall";
import HeaderNav from "../components/HeaderNav";
import ReviewCard from "../components/ReviewCard";
import CustomButton from "../components/CustomButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { UserContext } from "../context/UserContext";
import FollowButton from "../components/FollowButton";
import ProfileImage from "../components/ProfileImage";

const HostProfilePage = () => {
  const [host, setHost] = useState({});
  const { userId } = useParams();
  const [userFollows, setUserFollows] = useState(0);
  const [userFollowers, setUserFollowers] = useState(0);
  const [toggleAbout, setToggleAbout] = useState(true);
  const [toggleEvents, setToggleEvents] = useState(false);
  const [toggleReviews, setToggleReviews] = useState(false);
  const [hostEvents, setHostEvents] = useState({});
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [toggleFollow, setToggleFollow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Host Data (user information + reviews)
      const resHost = await fetch(`${backendUrl}/api/v1/users/${userId}`, {
        credentials: "include",
      });

      const hostData = await resHost.json();
      setHost(hostData);

      // Fetch Users which this user follows
      const resUserFollows = await fetch(
        `${backendUrl}/api/v1/followers/following`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ userId }),
        }
      );

      const userFollowsData = await resUserFollows.json();
      setUserFollows(userFollowsData?.followedUsers?.length);

      // Fetch Users which follow this user
      const resUserFollowers = await fetch(
        `${backendUrl}/api/v1/followers/followed`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ userId }),
        }
      );

      const userFollowersData = await resUserFollowers.json();
      setUserFollowers(userFollowersData?.followers?.length);

      const hostEventsRes = await fetch(
        `${backendUrl}/api/v1/users/${userId}`,
        {
          credentials: "include",
        }
      );

      const hostEventsData = await hostEventsRes.json();
      setHostEvents(hostEventsData?.createdEvents);
    };
    fetchData();
  }, [toggleFollow]);

  const isUserAlreadyReviewed = (host) => {
    return host?.receivedReviews?.some(
      (review) => review?.reviews?.userId?._id === user?.user?._id
    );
  };

  const istHostAlsoAuthUser = (host) => {
    const hostId = host?.user?._id;
    const authId = user?.user?._id;
    return hostId === authId;
  };

  return (
    <div className="min-h-svh pb-8">
      <HeaderNav pathname={pathname} host={host} />
      <section className="px-8">
        <article className=" flex justify-center mb-[40px] mt-2">
          {host?.user?.profileImage?.public_id ? (
            <ProfileImage
              src={host?.user?.profileImage?.secure_url}
              className={"rounded-full h-40 w-40 object-cover"}
            />
          ) : (
            <img
              className="rounded-full h-40 w-40 object-cover"
              src="/images/avatar_default.png"
              alt="User Image"
            />
          )}
        </article>
        <article className="flex gap-6 justify-center items-center mb-9">
          <div className="flex flex-col items-center text-center">
            <p>{userFollows}</p>
            <p className="text-grey-2 font-roboto-thin text-[14px]">
              Following
            </p>
          </div>
          <div className="border-[0.5px] min-h-8"></div>
          <div className="flex flex-col items-center text-center">
            <p>{userFollowers}</p>
            <p className="text-grey-2 font-roboto-thin text-[14px]">
              Followers
            </p>
          </div>
        </article>
        <article className="flex justify-center gap-2 mb-9">
          {!istHostAlsoAuthUser(host) && (
            <div
              className="w-[40%]"
              onClick={() => setToggleFollow(!toggleFollow)}
            >
              <FollowButton
                followedUserId={!istHostAlsoAuthUser(host) && userId}
              />
            </div>
          )}

          {!istHostAlsoAuthUser(host) && (
            <CustomButton
              fontSize={"16px"}
              color={isUserAlreadyReviewed(host) ? "#00ECAA" : "#7254EE"}
              boxShadow={0}
              width={"40%"}
              borderRadius={"15px"}
              bgcolor={"#ffffff"}
              bgcolorHover={"#ffffff"}
              padding="8px 10px"
              text={
                isUserAlreadyReviewed(host) ? (
                  <p className="flex items-center gap-4 font-roboto-thin-regular">
                    Reviewed
                  </p>
                ) : (
                  <p className="flex items-center gap-4 font-roboto-thin-regular">
                    Review
                  </p>
                )
              }
              border={`1px solid ${
                isUserAlreadyReviewed(host) ? "#00ECAA" : "#7254EE"
              }`}
              endIcon={<StarBorderIcon />}
              onClick={() =>
                isUserAlreadyReviewed(host)
                  ? null
                  : navigate(`/hostprofile/rate/${userId}`)
              }
            />
          )}
        </article>
        <article>
          <nav className="flex justify-between font-roboto-regular mb-4 uppercase">
            <p
              className={`${
                toggleAbout && "text-purple-1 border-b-2 border-purple-1"
              } pb-1`}
              onClick={() => {
                setToggleAbout(true);
                setToggleEvents(false);
                setToggleReviews(false);
              }}
            >
              About
            </p>
            <p
              className={`${
                toggleEvents && "text-purple-1 border-b-2 border-purple-1"
              } pb-1`}
              onClick={() => {
                setToggleEvents(true);
                setToggleAbout(false);
                setToggleReviews(false);
              }}
            >
              Events
            </p>
            <p
              className={`${
                toggleReviews && "text-purple-1 border-b-2 border-purple-1"
              } pb-1`}
              onClick={() => {
                setToggleReviews(true);
                setToggleAbout(false);
                setToggleEvents(false);
              }}
            >
              Reviews
            </p>
          </nav>
          <div>
            {toggleAbout && (
              <p className="font-roboto-thin break-words overflow-hidden">
                {host?.user?.bio}
              </p>
            )}
            {toggleEvents &&
              hostEvents
                ?.sort((a, b) => a.startDate - b.startDate)
                ?.map((event) => (
                  <EventCardSmall key={event?._id} event={event} />
                ))}
            {toggleEvents && hostEvents?.length === 0 && (
              <p className="font-roboto-regular">No created events</p>
            )}
            {toggleReviews &&
              host?.receivedReviews
                ?.sort(
                  (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
                )
                ?.map((review) => {
                  return <ReviewCard key={review._id} review={review} />;
                })}
            {toggleReviews && host?.receivedReviews?.length === 0 && (
              <p className="font-roboto-regular">No reviews</p>
            )}
          </div>
        </article>
      </section>
    </div>
  );
};

export default HostProfilePage;
