import { useNavigate } from "react-router-dom";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

const HeaderNav = ({ pathname, user, host }) => {
  const navigate = useNavigate();

  return (
    <header className="relative flex justify-center pt-6">
      {/* Arrow Circle Left abhängig vom Pfad => ERGÄNZEN bzw. ANPASSEN */}
      <div className="absolute top-4 left-4 cursor-pointer">
        {pathname === "/userprofileedit" && (
          <ArrowCircleDownIcon
            sx={{ transform: "rotate(90deg)", fontSize: "2rem" }}
            onClick={() => navigate("/userprofile")}
          />
        )}
      </div>
      {(pathname === "/userprofileedit" || pathname === "/userprofile") && (
        <p>
          {user?.user?.username
            ? user?.user?.username
            : user?.user?.firstname + " " + user?.user?.lastname}
        </p>
      )}
      {pathname === `/hostprofile/${host?.user?._id}` && <p>Host Gobal fetchen</p>}
    </header>
  );
};

export default HeaderNav;
