import SplashScreen from "./components/SplashScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import AddEventPage from "./pages/AddEventPage";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="w-[24.375rem] my-auto bg-slate-300">
        <SplashScreen />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<p className="h-svh">Hello World</p>} />
            <Route path="/events/add" element={<AddEventPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </LocalizationProvider>
  );
};

export default App;
