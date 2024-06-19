import React, { useRef, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { IconButton } from '@mui/material'
import { styled } from '@mui/system'

const StyledIconButton = styled(IconButton)({
  position: 'relative',
  width: '150px',
  color: '#7254EE',
  border: '1px solid #7254EE',
  borderRadius: '15px',
  padding: '16px',
  backgroundColor: 'white',
  transition: 'color 0.3s, border-color 0.3s',

  '::after': {
    content: '""',
    position: 'absolute',
    top: '-1px',
    left: '-1px',
    right: '-1px',
    bottom: '-1px',
    borderRadius: 'inherit',
    border: '2px solid transparent',
    transition: 'border-color 0.1s',
  },

  ':hover': {
    color: '#00ECAA',
    border: '1px solid #00ECAA',
    backgroundColor: 'white',
    '::after': {
      borderColor: '#00ECAA',
    },
  },
})

const CustomUpload = ({ name }) => {
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = event => {
    const file = event.target.files[0]
    if (file) {
      setFileName(file.name)
    } else {
      setFileName('')
    }
  }

  return (
    <div className="flex items-center">
      <div className="flex flex-col">
        <label
          htmlFor="button"
          className="text-[0.75rem] text-center w-[5.4rem] font-roboto-regular bg-white text-purple-2 z-10 ml-[0.4rem] mb-[-0.5625rem] mt-[-0.4625remrem] ">
          Upload Image
        </label>
        <StyledIconButton
          id="button"
          aria-label="delete"
          size="large"
          onClick={handleClick}
          fontSize="inherit">
          <CloudUploadIcon fontSize="inherit" />
        </StyledIconButton>
      </div>
      <input
        type="file"
        name={name}
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      {fileName && (
        <p className="ml-4 text-green-1 text-sm font-roboto-thin">
          Image uploaded successfully!
        </p>
      )}
    </div>
  )
}

export default CustomUpload
