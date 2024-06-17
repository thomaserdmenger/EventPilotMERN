import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoggedInProvider } from "./context/LoggedInContext";
import { UserProvider } from "./context/UserContext";
import SplashScreen from "./components/SplashScreen";
import AddEventPage from "./pages/AddEventPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import EditEventPage from "./pages/EditEventPage";
import UserProfilePage from "./pages/UserProfilePage";
import HostProfilePage from "./pages/HostProfilePage";

const App = () => {
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 2000);
  }, []);

  return (
    <div className="max-w-[30rem] mx-auto relative font-roboto-medium bg-white ">
      {splash ? (
        <SplashScreen />
      ) : (
        <LoggedInProvider>
          <UserProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={"Home"} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/verifyemail" element={<VerifyEmailPage />} />
                <Route path="/events/add" element={<AddEventPage />} />
                <Route path="/events/edit" element={<EditEventPage />} />
                <Route path="/userprofile" element={<UserProfilePage />} />
                <Route
                  path="/hostprofile/:userId"
                  element={<HostProfilePage />}
                />
              </Routes>
            </BrowserRouter>
          </UserProvider>
        </LoggedInProvider>
      )}
    </div>
  );
};

export default App;
