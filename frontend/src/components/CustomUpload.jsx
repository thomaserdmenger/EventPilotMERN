import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CustomInput from './CustomInput'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'

const CustomUpload = ({ value }) => {
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  })
  return (
    <div className="flex items-center">
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        sx={{
          bgcolor: '#7254EE',
          color: '#FFFFFF',
          ':hover': { bgcolor: '#5D3EDE' },
          padding: '16px',
          borderRadius: '15px',
          width: '100%',
          textTransform: 'none',
        }}
        startIcon={<CloudUploadIcon />}>
        Upload file
        <VisuallyHiddenInput type="file" />
      </Button>
      <CustomInput
        disable={true}
        type="text"
        label="Image"
        icon={<InsertPhotoIcon sx={{ color: '#00ECAA' }} />}
        value={value}
      />
    </div>
  )
}

export default CustomUpload
