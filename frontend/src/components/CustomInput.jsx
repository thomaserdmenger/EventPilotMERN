import { FormControl, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'
import { InputLabel, OutlinedInput, styled } from '@mui/material'

const StyledOutlinedInput = styled(OutlinedInput)({
  color: '#7254EE',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#7254EE',
    borderRadius: '16px',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#5D3EDE',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#00ECAA',
  },
})
const StyledInputLabel = styled(InputLabel)({
  color: '#5D3EDE',
  '&.Mui-focused': {
    color: '#5D3EDE',
  },
})

const CustomInput = ({ label, type, icon, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(prev => !prev)
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <FormControl variant="outlined">
      <StyledInputLabel htmlFor={label}>{label}</StyledInputLabel>
      <StyledOutlinedInput
        onChange={onChange}
        value={value}
        id={label}
        type={
          type === 'password' ?
            showPassword ?
              'text'
            : 'password'
          : 'text'
        }
        startAdornment={
          <InputAdornment position="start">{icon}</InputAdornment>
        }
        endAdornment={
          type === 'password' && (
            <InputAdornment position="start">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end">
                {showPassword ?
                  <VisibilityOff sx={{ color: '#5D3EDE' }} />
                : <Visibility sx={{ color: '#5D3EDE' }} />}
              </IconButton>
            </InputAdornment>
          )
        }
        label={label}
      />
    </FormControl>
  )
}

export default CustomInput
