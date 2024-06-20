import { Link, useLocation } from "react-router-dom";

const ProfileImage = ({ src, className, to }) => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname === "/" ? (
        <div>
          {src ? (
            <img src={src} className={className} alt="User Image" />
          ) : (
            <img
              className={className}
              src="/images/avatar_default.png"
              alt="User Image"
            />
          )}
        </div>
      ) : (
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
      )}
    </>
  );
};

export default ProfileImage;
