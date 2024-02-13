import { useEffect, useState } from 'react';
import Navbar from '../../components/common/Navbar'
import * as tmImage from '@teachablemachine/image';
import { confetti } from 'tsparticles-confetti';
import '../../detection.css';

function Detection() {

  const URL = "https://teachablemachine.withgoogle.com/models/BxTGo760W/";

    let tasks = ["A for ?","B for ?","C for ?","D for ?","E for ?","G for ?","H for ?","K for ?","L for ?","M for ?","O for ?","P for ?","S for ?","T for ?","W for ?","Z for ?"];

    const [task,setTask] = useState("");
    const [alphabet, setAlphabet] = useState('');
    const [progressValue, setProgressValue] = useState(0);

    
    useEffect(() => {
      if (!task){
      setTask(() => {
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        setAlphabet(randomTask[0]);
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
    // Load the image model and setup the webcam
    async function init() {
        document.querySelector('.card')?.classList.add("hidden");
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
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
            const classPrediction =
                prediction[i].className + ": " + 100*prediction[i].probability.toFixed(2)+"%";
                if (prediction[i].className[0] == alphabet){
                    labelContainer.innerHTML = classPrediction;
                    setProgressValue(100 * prediction[i].probability.toFixed(2));
                }
        }
        const arr = ["A","B","C","D","E","G","H","K","L","M","O","P","S","T","W","Z"];
        for(let index = 0 ; index < arr.length ; index++)
        {
            if(alphabet == arr[index] && prediction[index+1].probability.toFixed(2) == 1.00)
            {
                new Audio('win.mp3').play();
                run();
                loop = ()=>{webcam.stop()}
                setTask('');
                document.querySelector('.card')?.classList.remove("hidden");
            }
        }
}

  return (
    <div className='flex flex-col h-screen'>
      {/* <script src="https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.9.3/tsparticles.confetti.bundle.min.js"></script> */}
      {/* <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"></script> */}
      {/* <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js"></script> */}
      <Navbar/>
      <div className='grow flex justify-center items-center'>
        <div className="detection-card bg-white">
          <div className="task">{task}</div>
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