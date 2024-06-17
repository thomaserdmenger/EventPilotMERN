import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { UserContext } from "../context/UserContext";

const HeaderNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  console.log(user);

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
    </header>
  );
};

export default HeaderNav;
