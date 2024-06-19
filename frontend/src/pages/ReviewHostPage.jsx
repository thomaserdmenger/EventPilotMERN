import { useContext, useEffect, useState } from "react";
import RatingStars from "../components/RatingStars";
import HeaderNav from "../components/HeaderNav";
import { useLocation, useParams } from "react-router-dom";
import { backendUrl } from "../api/api";
import { UserContext } from "../context/UserContext";

const ReviewHostPage = ({}) => {
  const [host, setHost] = useState({});
  const { user } = useContext(UserContext);
  const [userFollows, setUserFollows] = useState(0);
  const [userFollowers, setUserFollowers] = useState(0);
  const [rating, setRating] = useState(3);
  const [text, setText] = useState("");
  const { userId } = useParams();
  const { pathname } = useLocation();

  console.log(text);
  console.log(rating);
  // Ich brauche Id der Person, die reviewed wird
  //  Id des Auth

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
    };
    fetchData();
  }, []);

  return (
    <div>
      <HeaderNav pathname={pathname} host={host} />
      <section className="px-8">
        <div className="flex">
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
        </div>
        <RatingStars
          rating={rating}
          setRating={setRating}
          name="read-only"
          readOnlyBolean={false}
        />
        <textarea
          className="border-blue-1 border w-full"
          name="rating"
          id="rating"
          placeholder="Your review"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}></textarea>
      </section>
    </div>
  );
};

export default ReviewHostPage;
