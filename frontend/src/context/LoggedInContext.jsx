import { createContext, useEffect, useState } from 'react'
export const LoggedInContext = createContext()

export const LoggedInProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  console.log(loggedIn, loading)

  useEffect(() => {
    const loggedInLocalStorage = JSON.parse(
      localStorage.getItem('loggedIn'),
    )

    if (loggedInLocalStorage) {
      setLoggedIn(loggedInLocalStorage)
    }
    setLoading(false)
  }, [])

  return (
    <LoggedInContext.Provider value={{ loggedIn, setLoggedIn, loading }}>
      {children}
    </LoggedInContext.Provider>
  )
}
