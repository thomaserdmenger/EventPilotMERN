import { Button, CircularProgress } from '@mui/material'
import { useState } from 'react'

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
  boxShadow,
  loading,
}) => {
  return (
    <Button
      variant="contained"
      endIcon={!loading && endIcon}
      type={type}
      onClick={onClick}
      sx={{
        bgcolor: bgcolor,
        color: color,
        ':hover': {
          bgcolor: bgcolorHover,
          boxShadow: boxShadow, // Remove box shadow on hover
        },
        '&:focus': {
          boxShadow: boxShadow, // Remove box shadow on focus
        },
        padding: padding,
        borderRadius: borderRadius,
        width: width,
        fontSize: fontSize,
        textTransform: 'none',
        border: border,
        height: height,
        paddingX: paddingX,
        paddingY: paddingY,
        minWidth: minWidth,
        minHeight: minHeight,
        boxShadow: boxShadow, // Remove default box shadow
      }}
      disabled={loading}>
      {loading ?
        <CircularProgress size={24} color="inherit" />
      : text}
    </Button>
  )
}

export default CustomButton
