
import SplashScreen from "./components/SplashScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import AddEventPage from "./pages/AddEventPage";

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
   <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="w-[24.375rem] mx-auto relative font-inter-medium">
      {splash ?
        <SplashScreen />
      : <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/events/add" element={<AddEventPage />} />

          </Routes>
        </BrowserRouter>
      }
    </div>
    </LocalizationProvider>
  )
}

export default App;
