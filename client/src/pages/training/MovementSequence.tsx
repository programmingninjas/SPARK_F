import Navbar from "../../components/common/Navbar";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";
import { toast } from 'react-toastify';

const movementSequence = () => {
  const [reactionState, setReactionState] = useState(0);
  const [physicalResult, setPhysicalResult] = useState(0);
  const auth = useAuth();
  const [time, setTime] = useState(0);
  const pressTime = useRef(0);
  let solved = 0;
  let arr: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  let yellowArr = ["yellow1", "yellow2", "yellow3", "yellow4", "yellow5"];
  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i (inclusive)
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements at indices i and j
    }
  }

  shuffleArray(arr);

  function func() {
    for (let i = 1; i < 6; i++) {
      let doc: any = document.getElementById(`c${arr[i]}`)!;
      doc.id = `yellow${i}`;
      doc.style.backgroundColor = "yellow";
      doc.textContent = i;
      doc.style.fontSize = "2rem";
    }
  }

  useEffect(() => {
    func();
  }, []);

  function handle(val: any) {
    console.log("state is ", reactionState);
    if (reactionState < 3) {
      alert("Pressed too soon");
      window.location.reload();
    } else {
      let id = val.target.id;
      if (id[0] == "y" && id == yellowArr[0]) {
        yellowArr.shift();
        let d = document.getElementById(id)!;
        d.style.backgroundColor = "gray";
        solved++;
        console.log("solved is", solved);
        if (solved == 5) {
          setTime(Date.now() - pressTime.current);
          setPhysicalResult(Date.now() - pressTime.current)
          setReactionState(4);
        }
      }
    }
  }

  useEffect(() => {
    if (reactionState == 1) {
      setTimeout(() => {
        var music = new Audio(`/beep.wav`);
        music.play();
        setReactionState(2);
      }, 1000 + Math.random() * 2000);
    }

    if (reactionState == 2) {
      setTimeout(() => {
        var music = new Audio(`/beep.wav`);
        music.play();
        setReactionState(3);
      }, 1000 + Math.random() * 2000);
    }

    if (reactionState == 3) {
      pressTime.current = Date.now();
    }
  }, [reactionState]);

  async function setPhysicaltime() {
    let response = await auth?.APIFunctions.PostRequest("/physicaltime", { physicalResult }, true);
    if (response.status == 200) {
      toast.success("Time submitted successfully", {
        position: "bottom-right",
      });
    }
    else {
      toast.error("Something went wrong", {
        position: "bottom-right",
      });
    }
  }
  return (
    <>
      <Navbar />
      <div className="grid place-items-center">
        <div id="cont" className="grid grid-cols-4 w-fit mb-20">
          <div
            onClick={(e) => {
              handle(e);
            }}
            id="c1"
            className="grid place-items-center w-[100px] h-[100px] bg-gray-500 rounded-full m-2"
          ></div>
          <div
            onClick={(e) => {
              handle(e);
            }}
            id="c2"
            className="grid place-items-center w-[100px] h-[100px] bg-gray-500 rounded-full m-2"
          ></div>
          <div
            onClick={(e) => {
              handle(e);
            }}
            id="c3"
            className=" grid place-items-center w-[100px] h-[100px] bg-gray-500 rounded-full m-2"
          ></div>
          <div
            onClick={(e) => {
              handle(e);
            }}
            id="c4"
            className="grid place-items-center w-[100px] h-[100px] bg-gray-500 rounded-full m-2"
          ></div>
          <div
            onClick={(e) => {
              handle(e);
            }}
            id="c5"
            className="grid place-items-center w-[100px] h-[100px] bg-gray-500 rounded-full m-2"
          ></div>
          <div
            onClick={(e) => {
              handle(e);
            }}
            id="c6"
            className="grid place-items-center w-[100px] h-[100px] bg-gray-500 rounded-full m-2"
          ></div>
          <div
            onClick={(e) => {
              handle(e);
            }}
            id="c7"
            className="grid place-items-center w-[100px] h-[100px] bg-gray-500 rounded-full m-2"
          ></div>
          <div
            onClick={(e) => {
              handle(e);
            }}
            id="c8"
            className="grid place-items-center w-[100px] h-[100px] bg-gray-500 rounded-full m-2"
          ></div>
          <div
            onClick={(e) => {
              handle(e);
            }}
            id="c9"
            className="grid place-items-center w-[100px] h-[100px] bg-gray-500 rounded-full m-2"
          ></div>
          <div
            onClick={(e) => {
              handle(e);
            }}
            id="c10"
            className="grid place-items-center w-[100px] h-[100px] bg-gray-500 rounded-full m-2"
          ></div>
          <div
            onClick={(e) => {
              handle(e);
            }}
            id="c11"
            className="grid place-items-center w-[100px] h-[100px] bg-gray-500 rounded-full m-2"
          ></div>
          <div
            onClick={(e) => {
              handle(e);
            }}
            id="c12"
            className="grid place-items-center w-[100px] h-[100px] bg-gray-500 rounded-full m-2"
          ></div>
          <div
            onClick={(e) => {
              handle(e);
            }}
            id="c13"
            className="grid place-items-center w-[100px] h-[100px] bg-gray-500 rounded-full m-2"
          ></div>
          <div
            onClick={(e) => {
              handle(e);
            }}
            id="c14"
            className="grid place-items-center w-[100px] h-[100px] bg-gray-500 rounded-full m-2"
          ></div>
          <div
            onClick={(e) => {
              handle(e);
            }}
            id="c15"
            className="grid place-items-center w-[100px] h-[100px] bg-gray-500 rounded-full m-2"
          ></div>
          <div
            onClick={(e) => {
              handle(e);
            }}
            id="c16"
            className="grid place-items-center w-[100px] h-[100px] bg-gray-500 rounded-full m-2"
          ></div>
        </div>

        <div id="btn" style={{ display: reactionState == 0 ? "block" : "none" }}>
          <Button
            onClick={() => {
              setReactionState(1);
            }}
            type="filled"
          >
            Start
          </Button>
        </div>

        <p style={{ display: reactionState == 1 ? "block" : "none" }}>
          Start after the second beep
        </p>
        <p style={{ display: reactionState == 2 ? "block" : "none" }}>
          Get Ready
        </p>
        <p style={{ display: reactionState == 3 ? "block" : "none" }}>Solve</p>
        <div
          id="btn"
          style={{ display: reactionState == 4 ? "block" : "none" }}
          className="grid place-items-center"
        >
          <p>Your reaction time was {time}ms</p>
          <div className="grid place-items-center">
            <Button
              onClick={() => {
                window.location.reload();
              }}
              type="filled"
            >
              Play Again
            </Button>
          </div>
        </div>
        <div className="group my-10">
          <label className="inline-block w-full text-sm mb-2 font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-violet-700">Enter your child's correct attempt</label>
          <div className="relative flex items-center">
            <input type="text" placeholder="0 ms" className="peer relative h-10 w-full rounded-md bg-gray-50 text-violet-800 pl-4 pr-20 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg" />
            <button onClick={setPhysicaltime} className="absolute right-0 h-10 w-16 rounded-r-md bg-violet-200 text-xs font-semibold text-white transition-all duration-200 ease-in-out group-focus-within:bg-violet-700 group-focus-within:hover:bg-violet-800">Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default movementSequence;
