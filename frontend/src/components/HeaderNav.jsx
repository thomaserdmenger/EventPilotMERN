import { useNavigate } from "react-router-dom";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

const HeaderNav = ({ pathname, user, host }) => {
  const navigate = useNavigate();

  return (
    <header className="relative flex justify-center items-center py-6">
      {/* Arrow Circle Left abhängig vom Pfad => ERGÄNZEN bzw. ANPASSEN */}
      <div className="absolute top-6 left-4 cursor-pointer">
        {pathname === "/userprofileedit" && (
          <ArrowCircleDownIcon
            sx={{ transform: "rotate(90deg)", fontSize: "2rem" }}
            onClick={() => navigate("/userprofile")}
          />
        )}
      </div>

      <div className="absolute top-6 left-4 cursor-pointer">
        {pathname === `/hostprofile/${host?.user?._id}` && (
          <ArrowCircleDownIcon
            sx={{ transform: "rotate(90deg)", fontSize: "2rem" }}
            onClick={() => navigate(-1)}
          />
        )}
      </div>

      {(pathname === "/userprofileedit" || pathname === "/userprofile") && (
        <p className="text-[24px] px-4 text-center break-words overflow-hidden">
          {user?.user?.username
            ? user?.user?.username
            : user?.user?.firstname + " " + user?.user?.lastname}
        </p>
      )}
      {pathname === `/hostprofile/${host?.user?._id}` && (
        <p className="text-[24px] px-4 text-center break-words overflow-hidden">
          {host?.user?.username
            ? host?.user?.username
            : host?.user?.firstname + " " + host?.user?.lastname}
        </p>
      )}
    </header>
  );
};

export default HeaderNav;
