import LandingPage from "./components/LandingPage/LandingPage";
import Auth from "./components/Auth/Auth";
import Dashboard from "./components/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer/>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/login" element={<Auth perform="Login"/>} />
          <Route path="/register" element={<Auth perform="Register"/>} />
          <Route path="/chat" element={<Dashboard/>} />
          <Route path="*" element={<LandingPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
