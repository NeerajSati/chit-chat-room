import LandingPage from "./components/LandingPage/LandingPage";
import Auth from "./components/Auth/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/login" element={<Auth perform="Login"/>} />
        <Route path="/register" element={<Auth perform="Register"/>} />
        <Route path="*" element={<LandingPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
