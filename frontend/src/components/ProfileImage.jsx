const ProfileImage = ({ src, className }) => {
  return (
    <>
      {src ? (
        <img src={src} className={className} alt="User Image" />
      ) : (
        <img
          className={className}
          src="/images/avatar_default.png"
          alt="User Image"
        />
      )}
    </>
  );
};

export default ProfileImage;
