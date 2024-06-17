import { Button } from '@mui/material'

const CustomButton = ({
  bgcolor,
  bgcolorHover,
  padding,
  borderRadius,
  width,
  fontSize,
  text,
  endIcon,
  onClick,
  border,
}) => {
  return (
    <Button
      variant="contained"
      endIcon={endIcon}
      onClick={onClick}
      sx={{
        bgcolor: bgcolor,
        ':hover': { bgcolor: bgcolorHover },
        padding: padding,
        borderRadius: borderRadius,
        width: width,
        fontSize: fontSize,
        textTransform: 'none',
        border: border,
      }}>
      {text}
    </Button>
  )
}

export default CustomButton
