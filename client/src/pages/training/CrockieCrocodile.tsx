import { useEffect, useState } from 'react'
import Navbar from '../../components/common/Navbar';
import { confetti } from 'tsparticles-confetti';

function CrockieCrocodile()
{
    const [number1, setNumber1] = useState<number>(0);
    const [number2, setNumber2] = useState<number>(0);
    const [crockState, setCrockState] = useState<number>(0);//0 default, 1 happy, 2 sad

    useEffect(()=>{
       generateNumbers(); 
    },[])

    // Function to generate two random numbers
    const generateNumbers = (): void => {
        const num1: number = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
        const num2: number = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
        setNumber1(num1);
        setNumber2(num2);
    };

    // Function to handle selection of number to feed Crockie
    const feedCrockie = (selectedNumber: number): void => {
        if(selectedNumber == Math.max(number1, number2)) {
            run(); // Confetti
            new Audio('../win.mp3').play(); // Play win sound
            setCrockState(1); // Happy
        } else {
            setCrockState(2); // Sad
        }
        generateNumbers(); // Generate new numbers for the next round
    };

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

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-5xl font-bold mb-4">Feed Crockie</h1>
                <div className="text-center mb-8">
                    <p className="mb-2">Crockie the Crocodile likes to eat large numbers!</p>
                    <p className="mb-2">Which number do you want to feed Crockie?</p>
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <div onClick={()=>feedCrockie(number1)} className="duration-100 hover:scale-105 active:scale-95 cursor-pointer w-24 h-24 bg-primary rounded-full text-white grid place-items-center text-4xl">{number1}</div>
                        <img className='w-128' src={
                            ["../7.png", "../5.png", "../6.png"][crockState]
                        } alt="" />
                        <div onClick={()=>feedCrockie(number2)} className="duration-100 hover:scale-105 active:scale-95 cursor-pointer w-24 h-24 bg-primary rounded-full text-white grid place-items-center text-4xl">{number2}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CrockieCrocodile