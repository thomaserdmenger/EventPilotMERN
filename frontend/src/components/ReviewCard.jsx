import { useState } from "react";
import RatingStars from "./RatingStars";
import ProfileImage from "./ProfileImage";

const ReviewCard = ({ review }) => {
  const [rating, setRating] = useState(review?.reviews?.stars);

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];

    const formattedDate = `${day} ${month}`;

    return formattedDate;
  };

  return (
    <>
      <article className="grid grid-cols-7 gap-2 mb-2 rounded-[15px] overflow-hidden p-2 shadow">
        <div className="col-span-1 rounded-[15px] w-full h-full object-cover object-center">
          {review?.reviews?.userId?.profileImage?.public_id ? (
            <ProfileImage
              src={review?.reviews?.userId?.profileImage?.secure_url}
              className={"rounded-full max-h-10 mt-[2px]"}
              to={`/hostprofile/${review?.reviews?.userId?._id}`}
            />
          ) : (
            <img
              className="rounded-full max-h-10 mt-[2px]"
              src="/images/avatar_default.png"
              alt="User Image"
            />
          )}
        </div>
        <div className="col-span-6 p-2 flex flex-col justify-start">
          <div className="flex justify-between items-center font-roboto-regular">
            <h2 className="text-[16px] text-purple-2">
              {review?.reviews?.userId?.firstname
                ? review?.reviews?.userId?.firstname
                : "Deleted User"}{" "}
              {review?.reviews?.userId?.lastname
                ? review?.reviews?.userId?.lastname
                : ""}
            </h2>
            <p className="text-[12px] font-roboto-thin">
              {formatDate(review?.createdAt)}
            </p>
          </div>
          <div>
            <RatingStars
              fontSize={"1.3rem"}
              rating={rating}
              setRating={setRating}
              name="read-only"
              readOnlyBolean={true}
            />
          </div>
          <p className="text-[14px] font-roboto-regular">
            {review?.reviews?.text}
          </p>
        </div>
      </article>
    </>
  );
};

export default ReviewCard;
