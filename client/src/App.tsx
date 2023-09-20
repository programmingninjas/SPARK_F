import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import { useAuth } from "./context/AuthContext";
import ScalesPage from "./pages/training/ScalesPage";
import ThreeDText from "./pages/training/ThreeDText";
import Detection from "./pages/training/Detection";
import ReactionTime from "./pages/training/ReactionTime";

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
            <Route path="/reactiontime" element={<ReactionTime/>} />
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
