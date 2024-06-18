import { Button } from '@mui/material'

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
}) => {
  return (
    <Button
      variant="contained"
      endIcon={endIcon}
      onClick={onClick}
      sx={{
        bgcolor: bgcolor,
        color: color,
        ':hover': { bgcolor: bgcolorHover },
        padding: padding,
        borderRadius: borderRadius,
        width: width,
        fontSize: fontSize,
        textTransform: 'none',
        border: border,
        height: height,
        paddingX: paddingX,
        paddingY: paddingY,
      }}>
      {text}
    </Button>
  )
}

export default CustomButton
