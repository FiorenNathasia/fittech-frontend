import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Homepage from "./Homepage/Homepage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
