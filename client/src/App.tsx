import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import { useAuth } from "./context/AuthContext";
import ScalesPage from "./pages/training/AgeScalesPage";
import ThreeDText from "./pages/training/ThreeDText";
import Detection from "./pages/training/Detection";
import ReactionTime from "./pages/training/ReactionTime";
import AnalysisPage from "./pages/AnalysisPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ModalProvier } from "./context/ModalContext";
import AgeScalesPage from "./pages/training/AgeScalesPage";
function App()
{
  const auth = useAuth();
  return (
    <>
      <ModalProvier>
        <ToastContainer />
        {
          auth?.isAuthorized?(
            <Routes>
              <Route path="/*" element={<LandingPage/>}/>
              <Route path="/dashboard" element={<DashboardPage/>} />
              <Route path="/analysis" element={<AnalysisPage/>} />
              <Route path="/evaluation/agescale" element={<AgeScalesPage/>} />
              <Route path="/evaluation/isaascale" element={<AgeScalesPage/>} />
              <Route path="/evaluation/reactiontime" element={<ReactionTime/>} />
              <Route path="/training/3dtext" element={<ThreeDText/>} />
              <Route path="/training/detection" element={<Detection/>} />
            </Routes>
          ):(
            <Routes>
              <Route path="/*" element={<LandingPage/>}/>
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/signup" element={<SignupPage/>}/>
            </Routes>
          )
        }
      </ModalProvier>
    </>
  )
}

export default App
