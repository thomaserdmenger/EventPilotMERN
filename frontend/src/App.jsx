import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SplashScreen from './components/SplashScreen'
import SignIn from './pages/SignInPage'
import { useEffect, useState } from 'react'

const App = () => {
  const [splash, setSplash] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setSplash(false)
    }, 3000)
  }, [])

  return (
    <div className="w-[24.375rem] mx-auto relative font-inter-medium">
      {splash ?
        <SplashScreen />
      : <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      }
    </div>
  )
}

export default App
