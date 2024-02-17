import { useEffect, useState } from 'react';
import Navbar from '../../components/common/Navbar'
import * as tmImage from '@teachablemachine/image';
import { confetti } from 'tsparticles-confetti';
import '../../detection.css';

function Detection() {

  const URL = "https://teachablemachine.withgoogle.com/models/Tr-aGSBGG/";

    let tasks = ["Angry","Happy","Sad","Surprised","Neutral"];

    const [task,setTask] = useState("");
    // const [alphabet, setAlphabet] = useState('');
    const [progressValue, setProgressValue] = useState(0);

    
    useEffect(() => {
      if (!task){
      setTask(() => {
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        return randomTask;
      });}
    }, [tasks]);

    //confetti
    const run =  ()=>{
        const end = Date.now() + 2000;
        const colors = ["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4b0082", "#ee82ee"];

        (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
        });

        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
        })();
    }

    let model:any, webcam:any, labelContainer:any, maxPredictions:any;

    async function init() {
        // document.querySelector('.card')?.classList.add("hidden");
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        webcam = new tmImage.Webcam(200, 200); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);
        
        const container = document.getElementById("webcam-container");
        if(!container)return;
        // append elements to the DOM
        container.innerHTML = "";
        container.appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    let loop:any = async ()=> {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
          if(task==prediction[i].className){
            // const classPrediction =
            // prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            let value=100 * prediction[i].probability.toFixed(2);
            setProgressValue(value);
            
            // console.log("yy",classPrediction)    
            if(value>=97){
              setProgressValue(100);
              run();
              loop = ()=>{webcam.stop()}
              setTask("");
            }
            console.log("pp is",value)
          }
                // if (prediction[i].className[0] == alphabet){
                //     labelContainer.innerHTML = classPrediction;
                //     setProgressValue(100 * prediction[i].probability.toFixed(2));
                // }
        }
        // const arr = ["A","B","C","D","E","G","H","K","L","M","O","P","S","T","W","Z"];
        // for(let index = 0 ; index < arr.length ; index++)
        // {
        //     if(alphabet == arr[index] && prediction[index+1].probability.toFixed(2) == 1.00)
        //     {
        //         new Audio('win.mp3').play();
        //         run();
        //         loop = ()=>{webcam.stop()}
        //         setTask('');
        //         document.querySelector('.card')?.classList.remove("hidden");
        //     }
        // }
}

  return (
    <div className='flex flex-col h-screen'>
      {/* <script src="https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.9.3/tsparticles.confetti.bundle.min.js"></script> */}
      {/* <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"></script> */}
      {/* <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js"></script> */}
      <Navbar/>
      <div className='grow flex justify-center items-center'>
        <div className="detection-card bg-white">
          <div className="task">Make a {task} face</div>
          <button type="button" onClick={init}>START</button>
          <div id="webcam-container">
              <div>
                  
              </div>
          </div>
          <div id="label-container"></div>
          <progress id="prog" max="100" value={progressValue}></progress>
        </div>
      </div>
    </div>
  )
}

export default Detection

// import * as faceapi from "face-api.js";
// import React, { useRef, useState, useEffect } from "react";

// function FaceExpressionDetection() {
//   const [modelsLoaded, setModelsLoaded] = React.useState(false);
//   const [captureVideo, setCaptureVideo] = React.useState(false);

//   const videoRef:any = React.useRef();
//   const videoHeight = 480;
//   const videoWidth = 640;

//   React.useEffect(() => {
//     const loadModels = async () => {
//       const MODEL_URL = '/models';
    
//       try {
//         await Promise.all([
//           faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//           faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//           faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
//           faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
//         ]);
//         setModelsLoaded(true);
//       } catch (error) {
//         console.error('Error loading models:', error);
//       }
//     };

//     loadModels()
//   }, []);

//   const startVideo = () => {
//     setCaptureVideo(true);
//     navigator.mediaDevices
//       .getUserMedia({ video: { width: 300 } })
//       .then(stream => {
//         let video = videoRef.current;
//         video.srcObject = stream;
//         video.play();
//       })
//       .catch(err => {
//         console.error("error:", err);
//       });
//   }

//   const handleVideoOnPlay = () => {
//     setInterval(async () => {
//       try{
// console.log("vid ",videoRef.current)
// let dd=new faceapi.TinyFaceDetectorOptions()
// console.log("face is ",dd)
//         const detections:any = faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
//         if (detections && detections.length > 0 && detections[0].expressions) {
//           console.log(detections[0].expressions);
//         }
//         console.log("pp")
//       }
//       catch(e){
//         console.log("fff ",e)
//       }
//     }, 1000)
//   }

//   const closeWebcam = () => {
//     videoRef.current.pause();
//     videoRef.current.srcObject.getTracks()[0].stop();
//     setCaptureVideo(false);
//   }

//   return (
//     <div>
//       <div style={{ textAlign: 'center', padding: '10px' }}>
//         {captureVideo && modelsLoaded ? (
//           <button onClick={closeWebcam} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
//             Close Webcam
//           </button>
//         ) : (
//           <button onClick={startVideo} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
//             Open Webcam
//           </button>
//         )}
//       </div>
//       {captureVideo ? (
//         modelsLoaded ? (
//           <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
//             <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px' }} />
//           </div>
//         ) : (
//           <div>loading...</div>
//         )
//       ) : null}
//     </div>
//   );
// }

// export default FaceExpressionDetection;
