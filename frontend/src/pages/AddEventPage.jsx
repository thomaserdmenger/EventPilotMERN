import EventForm from "../components/EventForm.jsx";

const AddEventPage = () => {
  return (
    <div className="min-h-svh flex flex-col justify-between px-5 pb-12 pt-4">
      <h1 className="text-center mb-6 text-purple-1 self-center font-roboto-bold text-xl">
        Add <span className="text-green-1">Event</span>
      </h1>
      <EventForm />
    </div>
  );
};

export default AddEventPage;
