import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import { AuthProvier } from "./context/AuthContext";

function App()
{

  return (
    <>
      <AuthProvier>
        <Routes>
          <Route path="/*" element={<LandingPage/>}/>
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>}/>
        </Routes>
      </AuthProvier>
    </>
  )
}

export default App
