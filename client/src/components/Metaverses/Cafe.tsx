import { Environment, useGLTF } from "@react-three/drei";
import { useFrame, RootState } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { AnimationMixer, Object3D } from "three";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useSpeech } from "react-text-to-speech";
import Groq from "groq-sdk";

function Cafe(props:{micActive?:boolean})
{
    const gltf = useGLTF("../models/Cafe.gltf");
    const globalMixer = useRef<AnimationMixer>();
    const NPCMixer = useRef<AnimationMixer>();
    const AnimCamera = useRef<Object3D>();
    const [tts, setTTS] = useState<string>("");

    const NPCClips = ["Armature"]
    const playAnim = useRef(false);

    useFrame((state, delta) => {
        if (!state) return;//IDK WHY TODO CHANGE
        if (!globalMixer.current) CreateGlobalMixer();
        if (!NPCMixer.current) CreateNPCMixer();
        globalMixer.current?.update(delta);

        if(playAnim.current)NPCMixer.current?.update(delta);

        SetCameraPosition(state);
    })

    function CreateGlobalMixer() {
        if (gltf.animations.length) {
            globalMixer.current = new AnimationMixer(gltf.scene);
            gltf.animations.forEach(clip => {
                if (NPCClips.includes(clip.name)) return;
                const action = globalMixer.current?.clipAction(clip)
                action?.play();
            });
        }
    }
    function CreateNPCMixer() {
        if (gltf.animations.length) {
            NPCMixer.current = new AnimationMixer(gltf.scene);
            gltf.animations.forEach(clip => {
                if (!NPCClips.includes(clip.name)) return;
                const action = NPCMixer.current?.clipAction(clip)
                action?.play();
            });
        }
        NPCMixer.current?.update(0.01);
    }

    useEffect(() => {
        console.log(gltf.animations)
        AnimCamera.current = gltf.scene.getObjectByName("Camera");
        PlayAnimation();
    }, [gltf])

    const { transcript,resetTranscript } = useSpeechRecognition();
    const {
        //Text, // Component that returns the modified text property
        //speechStatus, // String that stores current speech status
        //isInQueue, // Boolean that stores whether a speech utterance is either being spoken or present in queue
        start, // Function to start the speech or put it in queue
        //pause, // Function to pause the speech
        //stop, // Function to stop the speech or remove it from queue
      } = useSpeech({ text: tts,lang:"en-IN" });
        const groq = new Groq({ apiKey: "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",dangerouslyAllowBrowser: true });


        useEffect(() => {
            console.log(props.micActive);
            if (props.micActive) {
                // Mic active
                resetTranscript();
                SpeechRecognition.startListening();
            } else {
                PlayAnimation();
                SpeechRecognition.stopListening();
    
                async function GenerateResponse(input: string) {
                    const result = await groq.chat.completions.create({
                        messages: [
                            {
                                role: "system",
                                content: "You are a friendly and patient waiter at a family restaurant. A young child with cognitive disability is sitting at a table. You want to make sure the child feels comfortable and understood, so you use simple language, repeat things if necessary, and give them time to process and respond. Don't include roles, instructions and markdowns. Only include your dialogue and stick to the scene.",

                            },
                            {
                                role: "user",
                                content: input,
                            }
                        ],
                        model: "llama-3.1-70b-versatile",
                    });
    
                    const response = result.choices[0]?.message?.content || "Sorry, I couldn't understand that.";
                    return response;
                }
    
                // PROCESS TRANSCRIPT TODO
                console.log(transcript);
                if (!transcript) return;
                GenerateResponse(transcript).then((response) => {
                    console.log(response);
                    setTTS(response);  // Assuming setTTS is a function used to handle the text-to-speech output
                });
            }
        }, [props.micActive]);

    useEffect(()=>{
        if(tts){
            start();
        }
    },[tts])

    function SetCameraPosition(state: RootState) {
        if (!AnimCamera.current) return;
        AnimCamera.current.getWorldPosition(state.camera.position);
        AnimCamera.current.getWorldQuaternion(state.camera.quaternion);
        state.camera.updateMatrixWorld();
    }

    function PlayAnimation()
    {
        if(playAnim.current === true) return;
        playAnim.current = true;
        setTimeout(() => {
            playAnim.current = false;
        }, 5100);
    }


    return (
        <>
            <Environment files={'../models/comfy_cafe_2k.exr'} background />
            <primitive object={gltf.scene} />
        </>
    )
}

export default Cafe
