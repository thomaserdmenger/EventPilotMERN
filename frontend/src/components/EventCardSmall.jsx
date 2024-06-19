import LocationOnIcon from "@mui/icons-material/LocationOn";

const EventCardSmall = ({ event }) => {
  const timestamp = event?.startDate;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const ordinalSuffix = (day) => {
      if (day > 3 && day < 21) return "TH";
      switch (day % 10) {
        case 1:
          return "ST";
        case 2:
          return "ND";
        case 3:
          return "RD";
        default:
          return "TH";
      }
    };

    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const dayOfWeek = days[date.getDay()];

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${day}${ordinalSuffix(day)} ${month}-${dayOfWeek}-${hours}:${minutes} ${ampm}`;
  };

  return (
    <article>
      <div className="grid grid-cols-7 gap-2 mb-2 rounded-md overflow-hidden p-2 shadow">
        <img
          className="col-span-2 rounded-md w-full h-full object-cover"
          src={event?.eventImage?.secure_url}
          alt="Event Image"
        />
        <div className="col-span-5 p-2 flex flex-col">
          <p className="text-[12px] text-blue-1">{formatDate(timestamp)}</p>
          <h2 className="capitalize mb-3 text-[18px] break-all">{event?.title}</h2>
          <div className="flex items-center ml-[-5px]">
            <LocationOnIcon style={{ width: "15px", color: "#848484", marginTop: "-1px" }} />
            <p className="text-grey-1 font-roboto-thin capitalize text-[13px]">{event?.location}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default EventCardSmall;
