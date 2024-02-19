import Navbar from "../../components/common/Navbar";
import { Canvas } from "@react-three/fiber";
import {
    ContactShadows,
    Environment,
    Float,
    OrbitControls,
} from "@react-three/drei";
import Button from "../../components/common/Button";
import { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import { useAuth } from "../../context/AuthContext";

function ReactionTime() {

    const auth = useAuth();

    const [reactionState,setReactionState] = useState(0);//0 - inactive, 1-active, 2-pressable , 3-results
    const [resultText,setResultText] = useState("");
    const [physicalResult,setPhysicalResult] = useState(0);

    const timeout = useRef<any>(0);
    const pressTime = useRef(0);

    function start()
    {
        setReactionState(1);
        timeout.current = setTimeout(() => {
            pressTime.current = Date.now();
            setReactionState(2);
        }, 2000 + Math.random() * 1000);
    }
    function stop()
    {
        clearTimeout(timeout.current);
        if(reactionState == 1)
        {
            setResultText("You were too early");
        }
        if(reactionState == 2)
        {
            setPhysicalResult(Date.now() - pressTime.current);
            setResultText(`Your Reaction Time was ${Date.now() - pressTime.current}ms`);
        }
        setReactionState(3);
    }

    function reset()
    {
        setReactionState(0);
    }
    async function setPhysicaltime() {
        let response = await auth?.APIFunctions.PostRequest("/physicaltime",{physicalResult},true);
        if(response.status == 200)
        {
            toast.success("Time submitted successfully", {
                position: "bottom-right",
            });
        }
        else{
            toast.error("Something went wrong", {
                position: "bottom-right",
            });
        }
    }
    useEffect(()=>{
        if(!physicalResult)return;
        setPhysicaltime();
    },[physicalResult])
    return (
        <>
            <Navbar />
            <div className="absolute top-0 left-0 h-screen -z-10 w-screen flex justify-center items-end p-16">
                {
                    (reactionState == 0)?(
                        <Button onClick={start} type="filled">Start</Button> 
                        ):
                        (
                            (reactionState == 1)?(
                                <Button onClick={stop} type="outline">Waiting</Button>
                            ):
                            (
                                (reactionState == 2)?(
                                    <Button onClick={stop} type="filled-white" className="">Press Now</Button>
                                ):(
                                    <div onClick={reset} className="card cursor-pointer bg-white">{resultText}</div>
                                )
                            )
                        )
                }
            </div>
            <div className={`absolute top-0 left-0 h-screen -z-20 w-screen`}>
                <Canvas camera={{ fov: 35, position: [4, 4, 6] }}>
                    <OrbitControls />
                    <Environment preset="city" />
                    <Float scale={1.2} rotationIntensity={2}>
                        <mesh>
                            <boxGeometry />
                            <meshStandardMaterial color={(reactionState==2)?0xff0000:0x6457c7} />
                        </mesh>
                    </Float>

                    <ContactShadows
                        opacity={0.4}
                        scale={10}
                        blur={2.4}
                        position-y={-1.8}
                    />
                </Canvas>
            </div>
        </>
    );
}

export default ReactionTime;
