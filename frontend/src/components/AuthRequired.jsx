import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { LoggedInContext } from '../context/LoggedInContext'
import { UserContext } from '../context/UserContext'

const AuthRequired = ({ children }) => {
  const { loggedIn, loading } = useContext(LoggedInContext)
  const { user } = useContext(UserContext)

  if (loading) {
    return null
  }

  if (loggedIn) {
    if (user.user.isVerified) {
      return children
    } else {
      return <Navigate to="/verifyemail" />
    }
  } else {
    return <Navigate to="/signin" />
  }
}

export default AuthRequired
