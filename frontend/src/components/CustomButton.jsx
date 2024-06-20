import { Button } from "@mui/material";

const CustomButton = ({
  bgcolor,
  color,
  bgcolorHover,
  padding,
  borderRadius,
  width,
  fontSize,
  text,
  endIcon,
  onClick,
  border,
  height,
  paddingX,
  paddingY,
  type,
  minWidth,
  minHeight,
}) => {
  return (
    <Button
      variant="contained"
      endIcon={endIcon}
      type={type}
      onClick={onClick}
      sx={{
        bgcolor: bgcolor,
        color: color,
        ":hover": { bgcolor: bgcolorHover },
        padding: padding,
        borderRadius: borderRadius,
        width: width,
        fontSize: fontSize,
        textTransform: "none",
        border: border,
        height: height,
        paddingX: paddingX,
        paddingY: paddingY,
        minWidth: minWidth,
        minHeight: minHeight,
      }}>
      {text}
    </Button>
  );
};

export default CustomButton;
