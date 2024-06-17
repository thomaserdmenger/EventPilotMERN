import { useNavigate } from "react-router-dom";
import HeaderNav from "../components/HeaderNav";

const UserProfilePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderNav />
    </>
  );
};

export default UserProfilePage;
