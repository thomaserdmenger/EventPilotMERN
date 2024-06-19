import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { backendUrl } from "../api/api";

const BookmarkButton = ({ eventId }) => {
  const { user, setUser } = useContext(UserContext);

  // check if event is already bookmarked (filter for eventId and userId)
  const eventIsBookmarked = user?.bookmarks?.some(
    (obj) => obj.userId === user?.user?._id && obj.eventId === eventId
  );

  // if false: fetch to add bookmark
  const addBookmark = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/bookmarks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ eventId }),
    });

    const data = await res.json();

    setUser({
      ...user,
      bookmarks: [...user.bookmarks, { userId: user.user._id, eventId }],
    });
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        bookmarks: [...user.bookmarks, { userId: user.user._id, eventId }],
      })
    );
  };
  // if true: fetch to delete bookmark
  const deleteBookmark = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/bookmarks`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ eventId }),
    });

    const data = await res.json();

    const updatedBookmarkIds = user.bookmarks.filter((obj) => obj.eventId !== eventId);
    setUser({
      ...user,
      bookmarks: updatedBookmarkIds,
    });
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        bookmarks: updatedBookmarkIds,
      })
    );
  };

  return (
    <>
      {eventIsBookmarked ? (
        <BookmarkIcon
          sx={{
            fontSize: "2rem",
            color: "#00ECAA",
          }}
          onClick={deleteBookmark}
          className="mt-2 mr-4 bg-purple-4 p-1 rounded-md cursor-pointer"
        />
      ) : (
        <BookmarkBorderIcon
          sx={{
            fontSize: "2rem",
            color: "#00ECAA",
          }}
          onClick={addBookmark}
          className="mt-2 mr-4 bg-purple-4 p-1 rounded-md cursor-pointer"
        />
      )}
    </>
  );
};

export default BookmarkButton;
