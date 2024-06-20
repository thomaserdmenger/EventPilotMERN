import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../api/api";
import EventForm from "../components/EventForm.jsx";
import HeaderNav from "../components/HeaderNav.jsx";
import { UserContext } from "../context/UserContext.jsx";
import DeleteButton from "../components/DeleteButton.jsx";
import CustomButton from "../components/CustomButton";
import DeleteIcon from "@mui/icons-material/Delete";

const EditEventPage = () => {
  const { user } = useContext(UserContext);
  const { eventId } = useParams();
  const [eventToEdit, setEventToEdit] = useState();
  const [toggleDeletePopup, setToggleDeletePopup] = useState(false);

  const authUser = eventToEdit?.userId?._id === user?.user?._id;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${backendUrl}/api/v1/events/${eventId}`);

      const data = await res.json();
      setEventToEdit(data.event);
    };
    fetchData();
  }, [eventId]);

  return (
    <>
      {!toggleDeletePopup && (
        <div className="min-h-svh flex flex-col px-5 pb-12 pt-4">
          {authUser ? (
            <div>
              <HeaderNav
                pathname={`/events/edit/${eventId}`}
                eventDetails={eventToEdit}
              />
              <div className="pt-20">
                <EventForm eventToEdit={eventToEdit} />
              </div>
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
            </div>
          ) : (
            <div>
              <HeaderNav
                pathname={`/events/edit/${eventId}`}
                eventDetails={eventToEdit}
              />
              <p className="text-red-500 text-center mt-32">
                You are not authorized to edit this event.
              </p>
            </div>
          )}
        </div>
      )}

      {toggleDeletePopup && (
        <DeleteButton
          eventId={eventId}
          setToggleDeletePopup={setToggleDeletePopup}
        />
      )}
    </>
  );
};

export default EditEventPage;
