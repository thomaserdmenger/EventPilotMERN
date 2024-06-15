import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import AddEventPage from "./pages/AddEventPage";
import SignIn from "./pages/SignInPage";

const App = () => {
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 3000);
  }, []);

  return (
    <div className="w-[24.375rem] mx-auto relative font-inter-medium">
      {splash ? (
        <SplashScreen />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/events/add" element={<AddEventPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
