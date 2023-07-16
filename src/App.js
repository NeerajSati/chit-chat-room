import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/login" element={<Login perform="Login"/>} />
        <Route path="/register" element={<Login perform="Register"/>} />
        <Route path="*" element={<LandingPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
