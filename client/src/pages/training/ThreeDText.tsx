import Navbar from "../../components/common/Navbar";
import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    Text3D,
    Float,
    Environment,
    ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";
import { useEffect , useRef, useState } from "react";
const material = new THREE.MeshNormalMaterial();

function ThreeDText()
{
    let speakData = useRef<SpeechSynthesisUtterance>();

    const [text, setText] = useState("Hello");
    const groupRef = useRef<THREE.Group<THREE.Object3DEventMap>>(null);

    useEffect(() => {
        speakData.current = new SpeechSynthesisUtterance();
        speakData.current.volume = 1;
        speakData.current.rate = 1;
        speakData.current.pitch = 2;
        speakData.current.lang = 'en';
        
        document.addEventListener("keypress", onDocumentKeyPress);
        document.addEventListener("keydown", onDocumentKeyDown);

        updateTextPosition();
        
        return ()=>{
            document.removeEventListener("keypress", onDocumentKeyPress);
            document.removeEventListener("keydown", onDocumentKeyDown);
        }
    }, []);
    
    useEffect(()=>{
        updateTextPosition();
    },[text]);
    
    
    function updateTextPosition()
    {
        if(groupRef.current == null)return;
        let size = new THREE.Box3().setFromObject(groupRef.current).getSize(new THREE.Vector3());
        groupRef.current.position.set(-size.x/2,0,0);

        if(speakData.current ==null)return;
        
        speechSynthesis.cancel();
        speakData.current.text = text;
        speechSynthesis.speak(speakData.current);
    }


    function onDocumentKeyDown(event:any) {
        const keyCode = event.keyCode;
        // backspace

        if (keyCode == 8) {
            event.preventDefault();

            setText(prev=>prev.substring(0, prev.length - 1))

            return false;
        }
    }

    function onDocumentKeyPress(event:any) {
        const keyCode = event.which;
        // backspace

        if (keyCode == 8) {
            event.preventDefault();
        } else {
            const ch = String.fromCharCode(keyCode);
            setText(prev=>prev+ch);
        }
    }

    return (
        <>
            <Navbar />
            <div className="absolute top-0 left-0 h-screen -z-10 w-screen">
                <Canvas>
                    <OrbitControls />
                    <Environment preset="city" />
                    <Float scale={1.2} rotationIntensity={0.4}>
                        <group ref={groupRef}>
                            <Text3D material={material} font='/fonts/helvetiker_regular.typeface.json' size={0.75} height={0.2} curveSegments={12} bevelEnabled bevelThickness={0.02} bevelSize={0.02} bevelOffset={0} bevelSegments={5}>
                                {text}
                            </Text3D>
                        </group>
                    </Float>

                    <ContactShadows
                        opacity={0.4}
                        scale={10}
                        blur={2.4}
                        position-y={-2.4}
                    />
                </Canvas>
            </div>
        </>
    );
}

export default ThreeDText;
