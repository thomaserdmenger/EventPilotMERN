import { Link, useNavigate } from 'react-router-dom'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { useState } from 'react'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import PasswordIcon from '@mui/icons-material/Password'
import LogoCanvas from '../components/LogoCanvas'

const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstname, setfirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')

  const navigate = useNavigate()

  const signup = e => {
    e.preventDefault()
    navigate('/verify')
  }

  return (
    <div className="min-h-svh flex flex-col justify-between px-5 pb-12  pt-4">
      <div>
        <LogoCanvas scale={0.3} />
        <h1 className="text-center mb-6 text-purple-1 font-roboto-bold text-xl">
          Sign Up
        </h1>
        <form className="flex flex-col gap-6">
          <CustomInput
            type={'text'}
            label={'Firstname'}
            icon={<AccountCircleIcon sx={{ color: '#00ECAA' }} />}
            onChange={e => setfirstname(e.target.value)}
            value={firstname}
          />
          <CustomInput
            type={'text'}
            label={'Lastname'}
            icon={<AccountCircleIcon sx={{ color: '#00ECAA' }} />}
            onChange={e => setLastname(e.target.value)}
            value={lastname}
          />
          <CustomInput
            type={'text'}
            label={'Username'}
            icon={<AccountCircleOutlinedIcon sx={{ color: '#00ECAA' }} />}
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
          <CustomInput
            type={'text'}
            label={'Email'}
            icon={<EmailIcon sx={{ color: '#00ECAA' }} />}
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <CustomInput
            type={'password'}
            label={'Password'}
            icon={<PasswordIcon sx={{ color: '#00ECAA' }} />}
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <CustomInput
            type={'password'}
            label={'Confirm Password'}
            icon={<PasswordIcon sx={{ color: '#00ECAA' }} />}
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </form>
      </div>
      <div className="flex flex-col gap-4 items-center pt-6">
        <CustomButton
          fontSize={'16px'}
          width={'100%'}
          borderRadius={'15px'}
          bgcolor={'#7254EE'}
          bgcolorHover={'#5D3EDE'}
          padding={'15px'}
          text={'Sign Up'}
          endIcon={<ArrowCircleRightIcon />}
          onClick={signup}
        />
        <p className="text-sm text-green-1">
          Don’t have an account?{' '}
          <Link
            to="/signin"
            className="font-roboto-bold text-purple-2 hover:text-purple-1 underline underline-offset-4">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUpPage
