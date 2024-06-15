import { useState } from 'react'

const SignIn = () => {
  const [visible, setVisible] = useState(false)

  const handleChange = () => {
    setVisible(!visible)
  }
  return (
    <div>
      <div>
        <img src="../../public/svg/splashLoginLogo.svg" alt="Logo" />
      </div>
      <div>
        <h1>Sign In</h1>
        <form>
          <div></div>
          <div></div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
