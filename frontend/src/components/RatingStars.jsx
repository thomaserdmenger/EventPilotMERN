import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

const RatingStars = ({ rating, setRating, name, readOnlyBolean, fontSize }) => {
  return (
    <Box
      sx={{
        "& .MuiRating-iconEmpty": {
          color: "#00ECAA",
        },
        "& .MuiRating-iconFilled": {
          color: "#00ECAA",
          fontSize: `${fontSize}`,
        },
        "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
          fontSize: `${fontSize}`,
        },
      }}>
      <Rating
        name={name}
        onChange={(e) => setRating(Number(e.target.value))}
        value={rating}
        readOnly={readOnlyBolean}
      />
    </Box>
  );
};

export default RatingStars;
