import React from "react";
import { useLocation } from "react-router-dom";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

const HeaderNav = () => {
  const { pathname } = useLocation();

  return (
    <header>
      <div>
        {/* Arrow Circle Left abhängig vom Pfad => ERGÄNZEN bzw. ANPASSEN */}
        {pathname === "/userprofile" && (
          <ArrowCircleDownIcon sx={{ transform: "rotate(90deg)", fontSize: "2rem" }} />
        )}
      </div>
    </header>
  );
};

export default HeaderNav;
