import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import { useNavigate } from 'react-router-dom'
import LockIcon from '@mui/icons-material/Lock'
import { useContext, useState } from 'react'
import LogoCanvas from '../components/LogoCanvas'
import { backendUrl } from '../api/api'
import { UserContext } from '../context/UserContext'
import EmailIcon from '@mui/icons-material/Email'

const VerifyEmailPage = () => {
  const [sixDigitCode, setSixDigitCode] = useState('')
  const [email, setEmail] = useState('')
  const { user, setUser } = useContext(UserContext)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSendEmail = async e => {
    e.preventDefault()

    const res = await fetch(`${backendUrl}/api/v1/users/resent-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
      }),
    })

    const data = await res.json()

    if (data?.errorMessage) {
      setSixDigitCode('')
      return setErrorMessage(data.errorMessage)
    }

    if (data?.message) {
      setSuccessMessage(data.message)
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    }

    setSixDigitCode('')
    setErrorMessage('')
  }

  const handleVerify = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!sixDigitCode) {
        setLoading(false)
        return
      }
      if (!email) {
        setLoading(false)
        return
      }

      const res = await fetch(`${backendUrl}/api/v1/users/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          verificationCode: sixDigitCode,
        }),
      })

      const data = await res.json()

      if (data?.errorMessage) {
        setSixDigitCode('')
        setEmail('')
        setLoading(false)
        return setErrorMessage(data.errorMessage)
      }

      if (data?.message) {
        setSuccessMessage(data.message)
        setTimeout(() => {
          setSuccessMessage('')
        }, 3000)
      }

      setUser(data)

      setSixDigitCode('')
      setEmail('')
      setErrorMessage('')

      navigate('/signin')
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-svh flex flex-col justify-between px-5 pb-12  pt-4">
      <div className="flex flex-col">
        <LogoCanvas scale={0.3} />
        <h1 className="text-center mb-6 text-purple-1 self-center font-roboto-bold text-xl border-b-2 border-green-1">
          Verify Email
        </h1>
        <form className="flex flex-col gap-6" onSubmit={handleVerify}>
          <CustomInput
            type="email"
            label="Email"
            icon={<EmailIcon sx={{ color: '#00ECAA' }} />}
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <CustomInput
            type="text"
            label="Code"
            icon={<LockIcon sx={{ color: '#00ECAA' }} />}
            onChange={e => setSixDigitCode(e.target.value)}
            value={sixDigitCode}
          />
          {errorMessage && (
            <p className=" text-center font-roboto-thin text-red-500 text-sm">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className=" text-center font-roboto-thin text-green-500 text-sm">
              {successMessage}
            </p>
          )}
          <p className="text-sm text-green-1">
            Don’t have a code?{' '}
            <button
              onClick={handleSendEmail}
              className="font-roboto-bold text-purple-2 hover:text-purple-1 underline underline-offset-4">
              Resend code
            </button>
          </p>
          <CustomButton
            type={'submit'}
            fontSize="16px"
            width="100%"
            borderRadius="16px"
            bgcolor="#7254EE"
            bgcolorHover="#5D3EDE"
            padding="15px"
            text="Verify"
            loading={loading}
            endIcon={<VerifiedUserIcon />}
          />
        </form>
      </div>
    </div>
  )
}

export default VerifyEmailPage
