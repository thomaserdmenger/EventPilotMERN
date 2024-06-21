import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LoggedInProvider } from './context/LoggedInContext'
import { UserProvider } from './context/UserContext'
import SplashScreen from './components/SplashScreen'
import AddEventPage from './pages/AddEventPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import EditEventPage from './pages/EditEventPage'
import UserProfilePage from './pages/UserProfilePage'
import HostProfilePage from './pages/HostProfilePage'
import AuthRequired from './components/AuthRequired'
import UserProfilePageEdit from './pages/UserProfilePageEdit'
import ExplorePage from './pages/ExplorePage'
import Navbar from './components/Navbar'
import EventDetailPage from './pages/EventDetailPage'
import EventsPage from './pages/EventsPage'
import SearchPage from './pages/SearchPage'
import ReviewHostPage from './pages/ReviewHostPage'

const App = () => {
  const [splash, setSplash] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setSplash(false)
    }, 2000)
  }, [])

  return (
    <div className="max-w-[30rem] mx-auto relative h-svh font-roboto-regular bg-white ">
      <LoggedInProvider>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <AuthRequired>
                    <ExplorePage />
                    <Navbar />
                  </AuthRequired>
                }
              />
              <Route
                path="/signin"
                element={splash ? <SplashScreen /> : <SignInPage />}
              />
              <Route
                path="/signup"
                element={splash ? <SplashScreen /> : <SignUpPage />}
              />
              <Route path="/verifyemail" element={<VerifyEmailPage />} />
              <Route
                path="/events/add"
                element={
                  <AuthRequired>
                    <AddEventPage />
                  </AuthRequired>
                }
              />
              <Route
                path="/events/edit/:eventId"
                element={<EditEventPage />}
              />
              <Route
                path="/events"
                element={
                  <AuthRequired>
                    <EventsPage />
                    <Navbar />
                  </AuthRequired>
                }
              />
              <Route
                path="/search"
                element={
                  <AuthRequired>
                    <SearchPage />
                    <Navbar />
                  </AuthRequired>
                }
              />
              <Route
                path="/events/:eventId"
                element={<EventDetailPage />}
              />
              <Route
                path="/userprofile"
                element={
                  <AuthRequired>
                    <UserProfilePage />
                    <Navbar />
                  </AuthRequired>
                }
              />
              <Route
                path="/userprofileedit"
                element={<UserProfilePageEdit />}
              />
              <Route
                path="/hostprofile/rate/:userId"
                element={<ReviewHostPage />}
              />
              <Route
                path="/hostprofile/:userId"
                element={<HostProfilePage />}
              />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </LoggedInProvider>
    </div>
  )
}

export default App
