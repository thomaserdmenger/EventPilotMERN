import EventForm from "../components/EventForm.jsx";
import HeaderNav from "../components/HeaderNav.jsx";

const AddEventPage = () => {
  return (
    <div className="min-h-svh flex flex-col px-5 pb-12 pt-4">
      <HeaderNav pathname={`/events/add`} />
      <div className="pt-10">
        <EventForm />
      </div>
    </div>
  );
};

export default AddEventPage;
