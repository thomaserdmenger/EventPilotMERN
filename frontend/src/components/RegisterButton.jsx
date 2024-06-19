import CustomButton from "../components/CustomButton";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { backendUrl } from "../api/api";

const RegisterButton = ({ eventId }) => {
  const { user, setUser } = useContext(UserContext);

  // check if event is already registered (filter for eventId and userId)
  const alreadyRegistered = user?.registeredEvents?.some(
    (obj) => obj.userId === user?.user?._id && obj.eventId === eventId
  );

  // if false: fetch to add bookmark
  const addRegistration = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/eventRegistration`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ eventId }),
    });

    const data = await res.json();
    setUser({
      ...user,
      registeredEvents: [...user.registeredEvents, data.participations],
    });
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        registeredEvents: [...user.registeredEvents, data.participations],
      })
    );
  };

  // if true: fetch to delete bookmark
  const deleteRegistration = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/eventRegistration`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ eventId }),
    });

    const data = await res.json();
    const updatedRegistrations = user.registeredEvents.filter(
      (obj) => obj.eventId !== eventId
    );

    setUser({
      ...user,
      registeredEvents: updatedRegistrations,
    });
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        registeredEvents: updatedRegistrations,
      })
    );
  };

  return (
    <>
      {alreadyRegistered ? (
        <CustomButton
          fontSize={"16px"}
          width={"100%"}
          borderRadius={"15px"}
          bgcolor={"#7254EE"}
          bgcolorHover={"#5D3EDE"}
          padding={"16px"}
          text={"Unregister"}
          endIcon={<ArrowCircleRightIcon />}
          type="submit"
          onClick={deleteRegistration}
        />
      ) : (
        <CustomButton
          fontSize={"16px"}
          width={"100%"}
          borderRadius={"15px"}
          bgcolor={"#7254EE"}
          bgcolorHover={"#5D3EDE"}
          padding={"16px"}
          text={"Register"}
          endIcon={<ArrowCircleRightIcon />}
          type="submit"
          onClick={addRegistration}
        />
      )}
    </>
  );
};

export default RegisterButton;
