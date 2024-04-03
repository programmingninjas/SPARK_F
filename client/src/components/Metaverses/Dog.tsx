import { Environment, useGLTF } from "@react-three/drei";
import { useFrame, RootState } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { AnimationMixer, Object3D } from "three";

function Cafe(props:{state:number})
{
    const gltf = useGLTF("../dog/dog.glb");
    const AnimCamera = useRef<Object3D>();
    const cameraMixer = useRef<AnimationMixer>();
    const globalMixer = useRef<AnimationMixer>();
    const seekTime = useRef(0);
    const targetTime = useRef(0);

    const [animationState, setAnimationState] = useState(1);

    useEffect(() => {
        seekTime.current = ranges[animationState][0];
        targetTime.current = ranges[animationState][1];
    }, [animationState])

    useEffect(()=>{
        setAnimationState(props.state);
    },[props.state])

    const ranges = [
        [0,1],
        [1,4],
        [4,6.66666]
    ]



    useFrame((state,delta) => {
        if (!globalMixer.current) CreateGlobalMixer();
        SetCameraPosition(state);

        if(seekTime.current < targetTime.current)
        {
            seekTime.current += delta;
        }

        globalMixer.current?.setTime(0);
        globalMixer.current?.update(seekTime.current);

        cameraMixer.current?.update(delta)
    })

    useEffect(() => {
        console.log(gltf.animations)
        AnimCamera.current = gltf.scene.getObjectByName("Camera");
    }, [gltf])

    function SetCameraPosition(state: RootState) {
        if (!AnimCamera.current) return;
        AnimCamera.current.getWorldPosition(state.camera.position);
        AnimCamera.current.getWorldQuaternion(state.camera.quaternion);
        state.camera.updateMatrixWorld();
    }

    function CreateGlobalMixer() {
        if (gltf.animations.length) {
            globalMixer.current = new AnimationMixer(gltf.scene);
            cameraMixer.current = new AnimationMixer(gltf.scene);
            gltf.animations.forEach(clip => {
                if(clip.name === "CameraAction")
                {
                    const action = cameraMixer.current?.clipAction(clip)
                    action?.play();
                }
                else
                {
                    const action = globalMixer.current?.clipAction(clip)
                    action?.play();
                }
            });
        }
    }

    return (
        <>
            <Environment files={'../dog/air_museum_playground_2k.exr'} background />
            <primitive object={gltf.scene} />
        </>
    )
}

export default Cafe