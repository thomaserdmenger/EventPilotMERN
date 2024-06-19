import HeaderNav from "../components/HeaderNav";
import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../api/api";
import { UserContext } from "../context/UserContext";
import { FaRegEdit } from "react-icons/fa";
import CustomButton from "../components/CustomButton";
import { useLocation, useNavigate } from "react-router-dom";
import EventCardSmall from "../components/EventCardSmall";

const UserProfilePage = () => {
  const { user } = useContext(UserContext);
  const [followers, setFollowers] = useState(0);
  const [toggleAbout, setToggleAbout] = useState(true);
  const [toggleEvents, setToggleEvents] = useState(false);
  const [toggleBookmarks, setToggleBookmarks] = useState(false);
  const navigate = useNavigate();
  const [usersEvents, setUsersEvents] = useState({});
  const userId = user?.user?._id;
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${backendUrl}/api/v1/followers/followed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId: user?.user?._id }),
      });
      const data = await res.json();
      setFollowers(data?.followers?.length);

      const usersEventsRes = await fetch(`${backendUrl}/api/v1/users/${userId}`, {
        credentials: "include",
      });

      const userEventsData = await usersEventsRes.json();
      setUsersEvents(userEventsData?.createdEvents);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-svh pb-36">
      <HeaderNav pathname={pathname} user={user} />
      <section>
        <article className=" flex justify-center mb-[40px] mt-2">
          {user?.user?.profileImage?.public_id ? (
            <img
              className="rounded-full max-h-40"
              src={user?.user?.profileImage?.secure_url}
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
            onClick={() => navigate("/userprofileedit")}
          />
        </article>
        <section>
          <nav className="flex justify-between font-roboto-regular mb-4 uppercase px-8">
            <p
              className={`${toggleAbout && "text-purple-1 border-b-2 border-purple-1"} pb-1`}
              onClick={() => {
                setToggleAbout(true);
                setToggleEvents(false);
                setToggleBookmarks(false);
              }}>
              About
            </p>
            <p
              className={`${toggleEvents && "text-purple-1 border-b-2 border-purple-1"} pb-1`}
              onClick={() => {
                setToggleEvents(true);
                setToggleAbout(false);
                setToggleBookmarks(false);
              }}>
              My Events
            </p>
            <p
              className={`${toggleBookmarks && "text-purple-1 border-b-2 border-purple-1"} pb-1`}
              onClick={() => {
                setToggleBookmarks(true);
                setToggleAbout(false);
                setToggleEvents(false);
              }}>
              Bookmarks
            </p>
          </nav>
          <div>
            {toggleAbout && (
              <>
                <article className="px-8 mb-9">
                  <h2 className="text-[18px] mb-[10px] font-roboto-medium">
                    Hi, I am{" "}
                    <span className="text-purple-1">
                      {user?.user?.firstname} {user?.user?.lastname}
                    </span>
                  </h2>
                  <p className="text-grey-2 font-roboto-thin break-words overflow-hidden">
                    {user?.user?.bio}
                  </p>
                </article>
                <article>
                  {user?.user?.interests?.length > 0 && (
                    <article className="px-8">
                      <h2 className="text-[18px] mb-[10px] font-roboto-medium">Interest</h2>
                      <div className="flex gap-2 flex-wrap">
                        {user?.user?.interests?.sort().map((item, index) => {
                          return (
                            <p
                              key={index}
                              className="bg-purple-1 text-white rounded-md px-3 py-1 text-[13px] font-roboto-regular">
                              {item}
                            </p>
                          );
                        })}
                      </div>
                    </article>
                  )}
                </article>
              </>
            )}
            {toggleEvents && (
              <div className="px-8">
                {usersEvents
                  ?.sort((a, b) => a.startDate - b.startDate)
                  .map((event) => (
                    <EventCardSmall key={event?._id} event={event} />
                  ))}
              </div>
            )}
            {toggleEvents && usersEvents?.length === 0 && (
              <p className="px-8 font-roboto-regular">No created events</p>
            )}
          </div>
        </section>
      </section>
    </div>
  );
};

export default UserProfilePage;
