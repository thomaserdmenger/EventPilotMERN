import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})
  console.log(user)
  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem('user'))

    if (userLocalStorage) {
      setUser(userLocalStorage)
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
