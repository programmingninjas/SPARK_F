import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import { AuthProvier, useAuth } from "./context/AuthContext";
import ScalesPage from "./pages/ScalesPage";
import ThreeDText from "./pages/ThreeDText";
import Detection from "./pages/Detection";

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
            <Route path="/3dtext" element={<ThreeDText/>} />
            <Route path="/detection" element={<Detection/>} />
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
