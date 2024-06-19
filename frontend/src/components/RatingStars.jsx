import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

const RatingStars = ({ rating, setRating, name, readOnlyBolean }) => {
  return (
    <Box
      sx={{
        "& .MuiRating-iconEmpty": {
          color: "#00ECAA",
        },
        "& .MuiRating-iconFilled": {
          color: "#00ECAA",
          fontSize: "1.3rem",
        },
        "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
          fontSize: "1.3rem",
        },
      }}>
      <Rating
        name={name}
        onChange={(e) => setRating(e.target.value)}
        value={rating}
        readOnly={readOnlyBolean}
      />
    </Box>
  );
};

export default RatingStars;
