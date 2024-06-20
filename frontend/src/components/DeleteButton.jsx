import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import CustomButton from "../components/CustomButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import { backendUrl } from "../api/api";
import { useNavigate } from "react-router-dom";

const DeleteButton = ({ eventId }) => {
  const { user, setUser } = useContext(UserContext);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [toggleDeletePopup, setToggleDeletePopup] = useState(false);
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    setToggleDeletePopup(true);

    const res = await fetch(`${backendUrl}/api/v1/users`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = res.json();

    setUser({});
    setLoggedIn(false);

    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");

    setShowSuccessMessage(true);

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
    console.log(data);

    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <div className="px-8 mt-4">
        <CustomButton
          fontSize={"16px"}
          width={"100%"}
          borderRadius={"15px"}
          bgcolor={"#f87171"}
          bgcolorHover={"#ef4444"}
          padding={"16px"}
          text={eventId ? "Delete Event" : "Delete User"}
          endIcon={<DeleteIcon />}
          onClick={() => setToggleDeletePopup(true)}
        />
      </div>
      {toggleDeletePopup && (
        <div className="flex flex-col items-center pt-56 gap-4 pb-[30rem] w-full absolute top-0 left-0 bg-white z-20 px-8 text-center">
          <p className="font-roboto-medium text-lg mb-4 px-4">
            Attention: With one click your {eventId ? "event" : "account"} will
            be deleted. This cannot be undone.
          </p>
          <CustomButton
            fontSize={"16px"}
            width={"100%"}
            borderRadius={"15px"}
            bgcolor={"#f87171"}
            bgcolorHover={"#ef4444"}
            padding={"16px"}
            text={eventId ? "Delete Event" : "Delete User"}
            endIcon={<DeleteIcon />}
            onClick={eventId ? handleDeleteEvent : handleDeleteUser}
          />
          <CustomButton
            fontSize={"16px"}
            width={"100%"}
            borderRadius={"15px"}
            bgcolor={"#4ade80"}
            bgcolorHover={"#16a34a"}
            padding={"16px"}
            text={"Cancel"}
            endIcon={<CancelIcon />}
            onClick={() => setToggleDeletePopup(false)}
          />
          {showSuccessMessage && (
            <p className="text-[#4ade80]">
              {eventId ? "Event" : "User"} successfully deleted
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default DeleteButton;
