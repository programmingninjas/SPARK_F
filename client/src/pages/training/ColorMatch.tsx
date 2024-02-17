import { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import "../../colorMatching.css";
import { confetti } from 'tsparticles-confetti';

function ColorMatch() {
    const [quesColor, setColorQues] = useState("");
    const [level, setLevel] = useState(1);
    const [show, setShow] = useState(true)
    const [win, setWin] = useState(false)
    const buttonColors = ["green", "red", "yellow", "blue", "orange", "brown"];

    function getRandom(level: any) {
        let r: any = Math.floor(Math.random() * (level + 1))

        setColorQues(buttonColors[r])
    }
    useEffect(() => {
        getRandom(level)
    }, [])

    const handleButtonClick = (color: string) => {
        if (color == quesColor) {
            setShow(false)
            setWin(true)
            setLevel((e) => e + 1)
            var music = new Audio(`/correct.mp3`);
            music.play();
            run()
        }
        else {
            setShow(false)
            setWin(false)
            var music = new Audio(`/wrong.mp3`);
            music.play();
        }

    };


    const playAgain = () => {
        window.location.reload();
    };

    const nextLevel = () => {
        setShow(true)
        getRandom(level)
    };
    const run = () => {
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
    return (
        <>
            <Navbar />
            <div className="color-matching-container">
                <h1 id="level-title">Color Matching</h1>
                {show == true ? (

                    <h2 className="level game-text">Level : {level}</h2>
                ) : null}

                {(show == false && win == false) || level > 5 ? (<button onClick={playAgain} className="play-again">
                    Play Again
                </button>) : null}
                {(show == false && win == false) ? (<p className="game-end">Wrong <br />Answer</p>) : null}

                {show == false && win == true && level <= 5 ? (<button onClick={nextLevel} className="next-level">
                    Next Level
                </button>) : null}
                {show == false && win == true && level <= 5 ? (<p className="game-end">Correct <br />Answer</p>) : null}

                {show == true ? (
                    <div className="colorContainer">
                        <div className="column">
                            <h2 className="game-text">Question: </h2>
                            <div className={`qcolor ${quesColor}`}></div>



                        </div>
                        <div className="column">
                            <h2 className="game-text">Choose the correct color:</h2>
                            <div className="row">
                                <button
                                    id="green"
                                    className={`btn green level-color`}
                                    onClick={() => handleButtonClick("green")}
                                ></button>
                                <button
                                    id="red"
                                    className={`btn red level-color`}
                                    onClick={() => handleButtonClick("red")}
                                ></button>
                                {level > 1 ? (<button
                                    id="yellow"
                                    className={`btn yellow level-color`}
                                    // className={`btn yellow level-color display-none`}
                                    onClick={() => handleButtonClick("yellow")}
                                ></button>) : null}


                            </div>
                            <div className="row">
                                {level > 2 ? (<button
                                    id="blue"
                                    className={`btn blue level-color display-none`}
                                    onClick={() => handleButtonClick("blue")}
                                ></button>) : null}

                                {level > 3 ? (<button
                                    id="orange"
                                    className={`btn orange level-color display-none`}
                                    onClick={() => handleButtonClick("orange")}
                                ></button>) : null}

                                {level > 4 ? (<button
                                    id="brown"
                                    className={`btn brown level-color display-none`}
                                    onClick={() => handleButtonClick("brown")}
                                ></button>) : null}


                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
}

export default ColorMatch;
