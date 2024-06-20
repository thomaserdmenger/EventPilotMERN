import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    position: "relative",
    "& fieldset": {
      borderColor: "#7254EE",
      borderRadius: "16px",
    },
    "&:hover fieldset": {
      borderColor: "#7254EE",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00ECAA",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#7254EE",
    position: "absolute",
    top: theme.spacing(-1),
    left: theme.spacing(1),
    transform: "translate(0, 0) scale(1)",
    pointerEvents: "none",
    backgroundColor: "#FFFFFF",
    padding: "0 6px",
    fontSize: "12px",
  },
  "& .MuiInputBase-input": {
    color: "#7254EE",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#7254EE",
  },
}));

const CustomTextArea = ({ label, onChange, value, name, row }) => {
  return (
    <>
      <StyledTextField
        onChange={onChange}
        value={value}
        id={label}
        multiline
        rows={row}
        label={label}
        name={name}
        InputLabelProps={{ shrink: true }}
        sx={{
          width: "100%",
        }}
      />
    </>
  );
};

export default CustomTextArea;
