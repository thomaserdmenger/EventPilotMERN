import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SplashScreen from './components/SplashScreen'
import AddEventPage from './pages/AddEventPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import Verify from './pages/Verify'

const App = () => {
  const [splash, setSplash] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setSplash(false)
    }, 3000)
  }, [])

  return (
    <div className="w-[24.375rem] mx-auto relative font-roboto-medium ">
      {splash ?
        <SplashScreen />
      : <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/events/add" element={<AddEventPage />} />
          </Routes>
        </BrowserRouter>
      }
    </div>
  )
}

export default App
