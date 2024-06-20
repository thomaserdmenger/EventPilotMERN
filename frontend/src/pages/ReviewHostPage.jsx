import { useContext, useEffect, useState } from "react";
import RatingStars from "../components/RatingStars";
import HeaderNav from "../components/HeaderNav";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../api/api";
import { UserContext } from "../context/UserContext";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CustomButton from "../components/CustomButton";

const ReviewHostPage = ({}) => {
  const [host, setHost] = useState({});
  // const { user } = useContext(UserContext);
  const [userFollows, setUserFollows] = useState(0);
  const [userFollowers, setUserFollowers] = useState(0);
  const [rating, setRating] = useState(3);
  const [text, setText] = useState("");
  const { userId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // console.log(text);
  // console.log(typeof rating);
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

  const handleSubmit = async () => {
    if (!text || !rating) return; // Message einfügen

    // Post Review
    const resReview = await fetch(`${backendUrl}/api/v1/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ reviewedUserId: host?.user?._id, stars: rating, text }),
    });

    const reviewData = await resReview.json();

    // Message, dass erfolgreich geriviewed

    setTimeout(() => {
      navigate(`/hostprofile/${host?.user?._id}`);
    }, 1000);

    // Verhindern, dass man sich selbst bewertet => mit error Message aus Backend abgleichen
    // setText("");
  };

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
        <CustomButton
          fontSize={"16px"}
          width={"100%"}
          borderRadius={"15px"}
          bgcolor={"#7254EE"}
          bgcolorHover={"#5D3EDE"}
          padding={"16px"}
          text={"Submit Edit"}
          endIcon={<ArrowCircleRightIcon />}
          type="submit"
          onClick={handleSubmit}
        />
      </section>
    </div>
  );
};

export default ReviewHostPage;
