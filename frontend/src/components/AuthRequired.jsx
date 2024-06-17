import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { LoggedInContext } from '../context/LoggedInContext'

const AuthRequired = ({ children }) => {
  const { loggedIn, loading } = useContext(LoggedInContext)

  if (loading) {
    return null
  }

  return loggedIn ? children : <Navigate to="/signin" />
}

export default AuthRequired
