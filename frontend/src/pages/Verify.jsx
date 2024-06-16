import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import EmailIcon from '@mui/icons-material/Email'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import { useState } from 'react'

const Verify = () => {
  const [code, setCode] = useState('')

  return (
    <div className="min-h-screen flex flex-col justify-between px-5 pb-12 pt-8">
      <div>
        <img
          src="../../public/svg/splashLoginLogo.svg"
          alt="Logo"
          className="w-1/2 mx-auto mb-4"
        />
        <h1 className="text-center mb-6 text-purple-1 text-xl">Verify</h1>
        <form className="flex flex-col gap-6">
          <CustomInput
            type="text"
            label="Code"
            icon={<VerifiedUserIcon sx={{ color: '#00ECAA' }} />}
            onChange={e => setCode(e.target.value)}
            value={code}
          />
          <p className="text-sm text-green-1">
            Don’t have a code?{' '}
            <button className="font-roboto-bold text-purple-2 hover:text-purple-1 underline underline-offset-4">
              Resend code
            </button>
          </p>
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
          text="Sign Up"
          endIcon={<ArrowCircleRightIcon />}
        />
      </div>
    </div>
  )
}

export default Verify
