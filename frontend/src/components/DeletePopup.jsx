import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import CustomButton from "./CustomButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import { backendUrl } from "../api/api";
import { useNavigate } from "react-router-dom";
import { LoggedInContext } from "../context/LoggedInContext";

const DeletePopup = ({ eventId, setToggleDeletePopup }) => {
  const { setUser } = useContext(UserContext);
  const { setLoggedIn } = useContext(LoggedInContext);

  const [showErrorMessage, setShowErrorMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    setToggleDeletePopup(true);

    const res = await fetch(`${backendUrl}/api/v1/users`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();
    if (data.errorMessage) return setShowErrorMessage(data.errorMessage);

    setUser({});
    setLoggedIn(false);

    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");

    setShowErrorMessage("");
    setShowSuccessMessage(data.message);

    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate("/signup");
    }, 1000);
  };

  const handleDeleteEvent = async () => {
    setToggleDeletePopup(true);

    const res = await fetch(`${backendUrl}/api/v1/events/${eventId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (data.errorMessage) return setShowErrorMessage(data.errorMessage);

    setShowErrorMessage("");
    setShowSuccessMessage(data.message);

    setTimeout(() => {
      setShowSuccessMessage("");
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <div className="flex flex-col items-center pt-56 gap-4 h-svh w-full absolute top-0 left-0 bg-white z-20 px-8 text-center">
        <p className="font-roboto-medium text-lg mb-4 px-4 text-purple-2">
          <span className=" text-green-1">Attention:</span> With one click your{" "}
          {eventId ? "event" : "account"} will be deleted. This cannot be
          undone.
        </p>
        <CustomButton
          fontSize={"16px"}
          width={"100%"}
          borderRadius={"15px"}
          color={"#f87171"}
          bgcolor={"#fff"}
          border={"1px solid #f87171"}
          boxShadow={0}
          bgcolorHover={"#fff"}
          padding={"16px"}
          text={eventId ? "Delete Event" : "Delete User"}
          endIcon={<DeleteIcon />}
          onClick={eventId ? handleDeleteEvent : handleDeleteUser}
        />
        <CustomButton
          fontSize={"16px"}
          width={"100%"}
          borderRadius={"15px"}
          bgcolor={"#7254EE"}
          bgcolorHover={"#7254EE"}
          padding={"16px"}
          text={"Cancel"}
          endIcon={<CancelIcon />}
          onClick={() => setToggleDeletePopup(false)}
        />
        {showErrorMessage && <p className="text-red-500">{showErrorMessage}</p>}
        {showSuccessMessage && (
          <p className="text-[#00ECAA]">{showSuccessMessage}</p>
        )}
      </div>
    </>
  );
};

export default DeletePopup;
