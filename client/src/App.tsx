import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import { useAuth } from "./context/AuthContext";
import ThreeDText from "./pages/training/ThreeDText";
import Detection from "./pages/training/Detection";
import ReactionTime from "./pages/training/ReactionTime";
import AnalysisPage from "./pages/AnalysisPage";
import ResultPage from "./pages/ResultPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ModalProvier } from "./context/ModalContext";
import AgeScalesPage from "./pages/training/AgeScalesPage";
import ISAAScalesPage from "./pages/training/ISAAScalesPage copy";
import ColorMatch from "./pages/training/ColorMatch";
import MemoryGame from "./pages/training/MemoryGame";
import FaceExpressionDetection from "./pages/training/FaceExpressionDetection";
import ShapeDetection from "./pages/training/ShapeDetection";
function App() {
  const auth = useAuth();
  return (
    <>
      <ModalProvier>
        <ToastContainer />
        {
          auth?.isAuthorized ? (
            <Routes>
              <Route path="/*" element={<LandingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/analysis" element={<AnalysisPage />} />
              <Route path="/results" element={<ResultPage />} />
              <Route path="/evaluation/agescale" element={<AgeScalesPage />} />
              <Route path="/evaluation/isaascale" element={<ISAAScalesPage />} />
              <Route path="/evaluation/reactiontime" element={<ReactionTime />} />
              <Route path="/training/3dtext" element={<ThreeDText />} />
              <Route path="/training/detection" element={<Detection />} />
              <Route path="/training/ColorMatch" element={<ColorMatch />} />
              <Route path="/training/memorygame" element={<MemoryGame/>} />
              <Route path="/training/shapedetection" element={<ShapeDetection/>} />
              <Route path="/training/faceexpressiondetection" element={<FaceExpressionDetection/>} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/*" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          )
        }
      </ModalProvier>
    </>
  )
}

export default App
