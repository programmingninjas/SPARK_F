import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import { AuthProvier, useAuth } from "./context/AuthContext";
import ScalesPage from "./pages/ScalesPage";

function App()
{
  const auth = useAuth();
  return (
    <>
      {
        auth?.isAuthorized?(
          <Routes>
            <Route path="/*" element={<LandingPage/>}/>
            <Route path="/dashboard" element={<DashboardPage/>} />
            <Route path="/scales" element={<ScalesPage/>} />
          </Routes>
        ):(
          <Routes>
            <Route path="/*" element={<LandingPage/>}/>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>}/>
          </Routes>
        )
      }
    </>
  )
}

export default App