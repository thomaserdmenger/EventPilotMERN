import { Link } from "react-router-dom";

const ProfileImage = ({ src, className, to }) => {
  return (
    <>
      <Link to={to}>
        {src ? (
          <img src={src} className={className} alt="User Image" />
        ) : (
          <img
            className={className}
            src="/images/avatar_default.png"
            alt="User Image"
          />
        )}
      </Link>
    </>
  );
};

export default ProfileImage;
