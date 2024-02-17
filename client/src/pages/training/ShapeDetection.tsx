import React, { useRef } from "react";
import { confetti } from "tsparticles-confetti";
import Navbar from "../../components/common/Navbar";

// useRef
const ShapeDetection = () => {
  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i (inclusive)
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements at indices i and j
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

  const array = ["sq", "rec", "circle"];

  const draggableRef: any = useRef(null);

  const handleDragStart = (e: any) => {
    // console.log("pop", draggableRef.current.id);
    e.dataTransfer.setData("text", e.target.id);
    // e.dataTransfer.setData("text", draggableRef.current.id);
    // e.dataTransfer.setData("text", draggableRef2.current.id);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const realId = e.target.id;
    const id = e.dataTransfer.getData("text");
    //   console.log("ooo",e.target.id ," and ",id)
    if (realId[0] == id) {
      const draggableElement = document.getElementById(id);
      e.target.appendChild(draggableElement);
    }

  };
  return (
    <div className="grid place-items-center">
      <Navbar />

      <h1 className="text-2xl sm:text-4xl lg:text-6xl mb-8 font-semibold">
        <span className="gradient-text">Place all the shapes correctly</span>
      </h1>

      <div className="mb-32" style={{ display: "flex" }}>
        <div
          id="sCont"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "gray",
            margin:'30px'
            // border: "5px solid black",
          }}
        ></div>
        <div
          id="rCont"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            width: "150px",
            height: "80px",
            backgroundColor: "gray",
            margin:'30px'

            // border: "5px solid black",
          }}
        ></div>
        <div
          id="cCont"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "gray",
            margin:'30px',
            // border: "5px solid black",
            borderRadius:"100%"
          }}
        ></div>
      </div>

      <div style={{ display: "flex" }}>
        <div
        className="mr-12"
          id="s"
          draggable
          onDragStart={handleDragStart}
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "red",
          }}
        ></div>
        <div
        className="mr-12"
          id="r"
          draggable
          onDragStart={handleDragStart}
          style={{
            width: "150px",
            height: "80px",
            backgroundColor: "green",
          }}
        ></div>
        <div
        className="mr-12"
          id="c"
          draggable
          onDragStart={handleDragStart}
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "yellow",
            borderRadius:"100%"
          }}
        ></div>
      </div>
    </div>
  );
};

export default ShapeDetection;
