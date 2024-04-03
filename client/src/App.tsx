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
// import FaceExpressionDetection from "./pages/training/crocodile";
// import ShapeDetection from "./pages/training/aquarium";
import MovementSequence from "./pages/training/MovementSequence";
import Chatbot from "./components/Chatbot";
import CafeUI from "./pages/training/CafeUI";
import IQTest from "./pages/training/IQTest";
import ADHDTest from "./pages/training/ADHDTest";
import AllTrainings from "./pages/training/AllTrainings";
import ARTraining from "./pages/training/ARTraining";
import CognitiveTraning from "./pages/training/CognitiveTraning";
import SocialTraining from "./pages/SocialTraining";
import CrockieCrocodile from "./pages/training/CrockieCrocodile";
import SequenceGame from "./pages/training/SequenceGame";
import DogUI from "./pages/training/DogUI";
import Metaverse from "./pages/training/Metaverse";

function App()
{
  const auth = useAuth();
  return (
    <>
      <ModalProvier>
        <ToastContainer />
        <Chatbot />
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
              {/* <Route path="/training/aquarium" element={<ShapeDetection/>} /> */}
              {/* <Route path="/training/crocodile" element={<FaceExpressionDetection/>} /> */}
              <Route path="/evaluation/movementsequence" element={<MovementSequence/>} />
              <Route path="/metaverse" element={<Metaverse />} />
              <Route path="/metaverse/cafe" element={<CafeUI />} />
              <Route path="/metaverse/dog" element={<DogUI />} />
              <Route path='/evaluation/iqtest' element={<IQTest />} />
              <Route path='/evaluation/adhdtest' element={<ADHDTest />} />
              <Route path='/menu' element={<AllTrainings />} />
              <Route path="/menu/ar" element={<ARTraining />} />
              <Route path="/menu/cognitive" element={<CognitiveTraning />} />
              <Route path="/menu/social" element={<SocialTraining />} />
              <Route path="/training/crocodile" element={<CrockieCrocodile/>} />
              <Route path="/training/aquarium" element={<SequenceGame/>} />
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
