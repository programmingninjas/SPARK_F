import { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import { confetti } from 'tsparticles-confetti';

// Define types for Fish images
type Fish = {
    id: number;
    name: string;
    imageUrl: string;
};

export default function SequenceGame() {
    const [count,setCount] = useState(3);
    const data:Fish[] = [
        {
            id: 1,
            name: 'fish1',
            imageUrl: '../sea/1.png'
        },
        {
            id: 2,
            name: 'fish2',
            imageUrl: '../sea/2.png'
        },
        {
            id: 3,
            name: 'fish3',
            imageUrl: '../sea/3.png'
        },
        {
            id: 4,
            name: 'fish4',
            imageUrl: '../sea/4.png'
        },
        {
            id: 5,
            name: 'fish5',
            imageUrl: '../sea/5.png'
        },
        {
            id: 6,
            name: 'fish6',
            imageUrl: '../sea/6.png'
        },
        {
            id: 7,
            name: 'fish7',
            imageUrl: '../sea/7.png'
        },
        {
            id: 8,
            name: 'fish8',
            imageUrl: '../sea/8.png'
        },
        {
            id: 9,
            name: 'fish9',
            imageUrl: '../sea/9.png'
        },
        {
            id: 10,
            name: 'fish10',
            imageUrl: '../sea/10.png'
        },
        {
            id: 11,
            name: 'fish11',
            imageUrl: '../sea/11.png'
        },
        {
            id: 12,
            name: 'fish12',
            imageUrl: '../sea/12.png'
        },
        {
            id: 13,
            name: 'fish13',
            imageUrl: '../sea/13.png'
        },
        {
            id: 14,
            name: 'fish14',
            imageUrl: '../sea/14.png'
        },
        {
            id: 15,
            name: 'fish15',
            imageUrl: '../sea/15.png'
        },
        {
            id: 16,
            name: 'fish16',
            imageUrl: '../sea/16.png'
        }
    ];
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
    const [gameState, setGameState] = useState(0);// 0: not started, 1: seq, 2: select, 3: result
   
    
    const [fishes, setFishes] = useState<Fish[]>([]);
    const [fish, setFish] = useState<Fish | null>(null);
    const [selectedFishes, setSelectedFishes] = useState<Fish[]>([]);
    const [orignalFishes, setOrignalFishes] = useState<Fish[]>([]);

    const [endMessage, setEndMessage] = useState<string>('');

    useEffect(() => {
        if (gameState === 1)
        {
            //set fish state to random fish images from data every second n number of times
            let i = 0;
            const interval = setInterval(() => {
                if (i < count)
                {
                    let random = Math.floor(Math.random() * data.length);
                    setFish(data[random]);
                    setFishes(prev=>[...prev, data[random]]);
                    setOrignalFishes(prev=>[...prev, data[random]]);
                    i++;
                }
                else
                {
                    setFishes(prev=>prev.sort(() => Math.random() - 0.5));
                    clearInterval(interval);
                    setGameState(2);
                }
            }, 2000);
            
        }
        if(gameState === 3)
        {
            console.log(selectedFishes, fishes)
            if(selectedFishes.length === orignalFishes.length)
            {
                if(selectedFishes.every((f, i) => f.id === orignalFishes[i].id))
                {
                    setEndMessage('You Won');
                    run(); // Confetti
                    new Audio('../win.mp3').play(); // Play win sound
                    setCount(prev=>prev+1);
                }
                else
                {
                    setEndMessage('You Lost');
                }
                setFish(null);
                setFishes([]);
                setSelectedFishes([]);
                setOrignalFishes([]);
            }
        }
    }, [gameState]);

    return (
        <div className="relative w-full h-screen flex justify-center items-center">
            <img className='fixed top-0 left-0 -z-10 h-screen w-screen object-cover' src="../bg.jpeg" alt="" />
            {
                [
                    <Button onClick={() => setGameState(1)} type={'filled'} >Start</Button>,
                    <>
                        {fish && <img className='w-96' src={fish.imageUrl} alt={fish.name} />}
                    </>,
                    <>
                        {
                            fishes.map((f, i) => (
                            <img
                                onClick={() => {
                                    setSelectedFishes(prev => {
                                        if(prev.length == fishes.length - 1)
                                        {
                                            setGameState(3);
                                        }
                                        return [...prev, f];
                                    });
                                }}
                                key={i}
                                className='w-96 duration-200 hover:scale-110 cursor-pointer'
                                src={f.imageUrl}
                                alt={f.name}
                            />
                        ))}
                    </>,
                    <>
                        <div className="flex flex-col gap-16">
                            <h1 className='text-7xl text-light font-bold'>{endMessage}</h1>
                            <Button onClick={() => setGameState(0)} type={'filled'} >Play Again</Button>
                        </div>
                    </>
                ][gameState]
            }
        </div>
    );
};