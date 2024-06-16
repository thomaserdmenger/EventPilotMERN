import { Link } from 'react-router-dom'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import { useState } from 'react'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

const SignInPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen flex flex-col justify-between px-5 pb-12 pt-8">
      <div>
        <img
          src="../../public/svg/splashLoginLogo.svg"
          alt="Logo"
          className="w-1/2 mx-auto mb-4"
        />
        <h1 className="text-center mb-6 text-purple-1 text-xl">Sign In</h1>
        <form className="flex flex-col gap-6">
          <CustomInput
            type="text"
            label="Email"
            icon={<EmailIcon sx={{ color: '#00ECAA' }} />}
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <CustomInput
            type="password"
            label="Password"
            icon={<LockIcon sx={{ color: '#00ECAA' }} />}
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </form>
      </div>
      <div className="flex flex-col gap-4 items-center pt-6">
        <CustomButton
          fontSize="16px"
          width="100%"
          borderRadius="15px"
          bgcolor="#7254EE"
          bgcolorHover="#5D3EDE"
          padding="15px"
          text="Sign In"
          endIcon={<ArrowCircleRightIcon />}
        />
        <p className="text-sm text-green-1">
          Don’t have an account?{' '}
          <Link
            to="/signup"
            className="font-roboto-bold text-purple-2 hover:text-purple-1 underline underline-offset-4">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignInPage
