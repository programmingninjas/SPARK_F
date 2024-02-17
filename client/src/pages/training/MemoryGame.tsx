// import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import { confetti } from "tsparticles-confetti";
// import Button from './Button';
import Button from "../../components/common/Button";
import apple from "../../assets/apple.jpg";
// import apple from ""
import banana from "../../assets/banana.jpg";
import watermelon from "../../assets/watermelon.jpg";
import mango from "../../assets/mango.jpg";

const MemoryGame = () => {
  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i (inclusive)
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements at indices i and j
    }
  }

  const arr: string[] = ["mango", "apple", "banana", "watermelon"];
  shuffleArray(arr);

  let newArr: string[] = [];

  newArr.push(arr[0]);
  newArr.push(arr[0]);
  newArr.push(arr[1]);
  newArr.push(arr[1]);
  shuffleArray(newArr);
  var id1 = newArr[0];
  // console.log("ppppp ",id1)
  var type1 = newArr[0][0];
  var id2 = newArr[1];
  var type2 = newArr[1][0];
  var id3 = newArr[2];
  var type3 = newArr[2][0];
  var id4 = newArr[3];
  var type4 = newArr[3][0];

  // setId1(newArr[0])
  // setId2(newArr[1])
  // setId3(newArr[2])
  // setId4(newArr[3])
  // setType1((newArr[0])[0])
  // setType2((newArr[1])[0])
  // setType3((newArr[2])[0])
  // setType4((newArr[3])[0])
  let count = 0;

  var img1 = "";
  var prev = "";
  //   const [img2, setImg2] = useState("");

  function picture(val: any) {
    if (val == "apple") {
      return <img className="w-[150px] h-[150px] rounded-lg" src={apple} />;
    }
    if (val == "mango") {
      return <img className="w-[150px] h-[150px] rounded-lg" src={mango} />;
    }
    if (val == "watermelon") {
      return (
        <img className="w-[150px] h-[150px] rounded-lg" src={watermelon} />
      );
    }
    if (val == "banana") {
      return <img className="w-[150px] h-[150px] rounded-lg" src={banana} />;
    }
  }

  function handle(id: any, type: any) {
    // let type = e.target.className[0];
    // let id = e.target.id;
    console.log("id ", id, "clss", type);
    // const element2 = document.getElementById(id)!;
    // element.style.opacity = "0.2";

    if (img1 == "") {
      const element1 = document.getElementById(id)!;
      element1.style.transform = "perspective(1200px) rotateY(180deg)";
      prev = id;
      img1 = type;
    } else if (img1 == type) {
      const element1 = document.getElementById(id)!;
      element1.style.transform = "perspective(1200px) rotateY(180deg)";
      count++;
      if (count == 2) {
        run();
        const btn = document.getElementById("btn")!;
        btn.style.display = "block";
      }
      console.log("yay");
      prev = "";
      img1 = "";
    } else {
      const element2 = document.getElementById(id)!;
      element2.style.transform = "perspective(1200px) rotateY(180deg)";
      setTimeout(() => {
        const element2 = document.getElementById(id)!;
        element2.style.transform = "perspective(1200px) rotateY(0deg)";
        const element = document.getElementById(prev)!;
        element.style.transform = "perspective(1200px) rotateY(0deg)";
        prev = "";
        img1 = "";
      }, 500);
    }
  }

  const run = () => {
    const end = Date.now() + 2000;
    const colors = [
      "#ff0000",
      "#ffa500",
      "#ffff00",
      "#008000",
      "#0000ff",
      "#4b0082",
      "#ee82ee",
    ];

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
  };

  return (
    <div className="grid place-items-center">
      <Navbar />

      <h1 className="text-2xl sm:text-4xl lg:text-6xl mb-8 font-semibold">
        <span className="gradient-text">Find all the pairs of fruits</span>
      </h1>

      <div className="grid grid-cols-2 w-fit">
        <div
          onClick={() => {
            handle("mango1", type1);
          }}
          id="mango1"
          style={{
            transformStyle: "preserve-3d",
            transform: "perspective(1200px) rotateY(0deg)",
            transition: "all linear .3s",
          }}
          className="m w-fit m-4 cursor-pointer"
        >
          <div
            style={{ transform: "translateZ(0px)" }}
            className="w-[150px] h-[150px] absolute"
          >
            {picture(id1)}
          </div>
          <div
            style={{ transform: "translateZ(.1px)" }}
            className="bg-gray-700 w-[150px] h-[150px] rounded-lg"
          ></div>
        </div>

        <div
          onClick={() => {
            handle("mango2", type2);
          }}
          id="mango2"
          style={{
            transformStyle: "preserve-3d",
            transform: "perspective(1200px) rotateY(0deg)",
            transition: "all linear .3s",
          }}
          className="m w-fit  m-4 cursor-pointer"
        >
          <div
            style={{ transform: "translateZ(0px)" }}
            className="w-[150px] h-[150px] absolute"
          >
            {picture(id2)}
            {/* <img
              className="w-[150px] h-[150px] rounded-lg"
              src={apple}
              alt="Image"
            /> */}
          </div>
          <div
            style={{ transform: "translateZ(.1px)" }}
            className="bg-gray-700 w-[150px] h-[150px] rounded-lg"
          ></div>
        </div>

        <div
          onClick={() => {
            handle("apple1", type3);
          }}
          id="apple1"
          style={{
            transformStyle: "preserve-3d",
            transform: "perspective(1200px) rotateY(0deg)",
            transition: "all linear .3s",
          }}
          className="a w-fit  m-4 cursor-pointer"
        >
          <div
            style={{ transform: "translateZ(0px)" }}
            className="w-[150px] h-[150px] absolute"
          >
            {picture(id3)}

            {/* <img
              className="w-[150px] h-[150px] rounded-lg"
              src={apple}
              alt="Image"
            /> */}
          </div>
          <div
            style={{ transform: "translateZ(.1px)" }}
            className="bg-gray-700 w-[150px] h-[150px] rounded-lg"
          ></div>
        </div>

        <div
          onClick={() => {
            handle("apple2", type4);
          }}
          id="apple2"
          style={{
            transformStyle: "preserve-3d",
            transform: "perspective(1200px) rotateY(0deg)",
            transition: "all linear .3s",
          }}
          className="a w-fit m-4 cursor-pointer"
        >
          <div
            style={{ transform: "translateZ(0px)" }}
            className="w-[150px] h-[150px] absolute"
          >
            {picture(id4)}

            {/* <img
              className="w-[150px] h-[150px] rounded-lg"
              src={apple}
              alt="Image"
            /> */}
          </div>
          <div
            style={{ transform: "translateZ(.1px)" }}
            className="bg-gray-700 w-[150px] h-[150px] rounded-lg"
          ></div>
        </div>
      </div>

      <div id="btn" style={{ display: "none" }}>
        <Button
          onClick={() => {
            window.location.reload();
          }}
          type="filled"
        >
          Play Again
        </Button>
      </div>

      {/* <img
          id="mango1"
          onClick={(e) => {
            handle(e);
          }}
          style={{
            opacity: "1",
          }}
          className="m bg-gray-500 z-[100] w-[200px] h-[200px] cursor-pointer"
          src="/public/mango.jpg"
          alt=""
        />
        <img
          id="mango2"
          onClick={(e) => {
            handle(e);
          }}
          style={{
            opacity: "1",
          }}
          className="m bg-gray-500 z-[100] w-[200px] h-[200px] cursor-pointer"
          src="/public/mango.jpg"
          alt=""
        />
        <img
          id="apple1"
          onClick={(e) => {
            handle(e);
          }}
          style={{
            opacity: "1",
          }}
          className="a bg-gray-500 z-[100] w-[200px] h-[200px] cursor-pointer"
          src="/public/apple.jpg"
          alt=""
        />
        <img
          id="apple2"
          onClick={(e) => {
            handle(e);
          }}
          style={{
            opacity: "1",
          }}
          className="a bg-gray-500 z-[100] w-[200px] h-[200px] cursor-pointer"
          src="/public/apple.jpg"
          alt=""
        /> */}
    </div>
  );
};

export default MemoryGame;
