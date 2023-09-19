import React, { useEffect } from "react";
import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";

function ThreeDText() {
    useEffect(() => {
        // create a SpeechSynthesisUtterance to configure the how text to be spoken
        let speakData = new SpeechSynthesisUtterance();

        /**
         * Base
         */
        // Debug

        // Canvas
        const canvas = document.querySelector("canvas.webgl");

        // Scene
        const scene = new THREE.Scene();

        /**
         * Fonts
         */
        const fontLoader = new THREE.FontLoader();

        fontLoader.load(
            "https://cdn.skypack.dev/three@0.132.2/examples/fonts/helvetiker_bold.typeface.json",
            (font:any) => {
                fontLoader.load(
                    "https://cdn.skypack.dev/three@0.132.2/examples/fonts/helvetiker_bold.typeface.json",
                    (font:any) => {
                        // Material
                        const material = new THREE.MeshNormalMaterial();

                        let firstLetter = true;
                        let text = "HELLO";
                        let textMesh1:any;
                        refreshText();
                        document.addEventListener(
                            "keypress",
                            onDocumentKeyPress
                        );
                        document.addEventListener("keydown", onDocumentKeyDown);

                        function onDocumentKeyDown(event:any) {
                            if (firstLetter) {
                                firstLetter = false;
                                text = "";
                            }

                            const keyCode = event.keyCode;

                            // backspace

                            if (keyCode == 8) {
                                event.preventDefault();

                                text = text.substring(0, text.length - 1);
                                refreshText();

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
                                text += ch;

                                refreshText();
                            }
                        }

                        // Text
                        function createText() {
                            const textGeometry = new THREE.TextBufferGeometry(
                                text,
                                {
                                    font: font,
                                    size: 0.5,
                                    height: 0.2,
                                    curveSegments: 12,
                                    bevelEnabled: true,
                                    bevelThickness: 0.03,
                                    bevelSize: 0.02,
                                    bevelOffset: 0,
                                    bevelSegments: 5,
                                }
                            );
                            textGeometry.center();

                            textMesh1 = new THREE.Mesh(textGeometry, material);
                            scene.add(textMesh1);
                        }

                        function refreshText() {
                            scene.remove(textMesh1);

                            function speak(text:any, rate:any, pitch:any, volume:any) {
                                speakData.volume = volume; // From 0 to 1
                                speakData.rate = rate; // From 0.1 to 10
                                speakData.pitch = pitch; // From 0 to 2
                                speakData.text = text;
                                speakData.lang = "en";
                                // pass the SpeechSynthesisUtterance to speechSynthesis.speak to start speaking
                                speechSynthesis.cancel();
                                speechSynthesis.speak(speakData);
                            }

                            if ("speechSynthesis" in window) {
                                let rate = 1,
                                    pitch = 2,
                                    volume = 1;
                                speak(text, rate, pitch, volume);
                            } else {
                                console.log(" Speech Synthesis Not Supported");
                            }

                            if (!text) return;

                            createText();
                        }
                    }
                );
            }
        );

        /**
         * Sizes
         */
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        window.addEventListener("resize", () => {
            // Update sizes
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            // Update camera
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            // Update renderer
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });

        /**
         * Camera
         */
        // Base camera
        const camera = new THREE.PerspectiveCamera(
            75,
            sizes.width / sizes.height,
            0.1,
            100
        );
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 3;
        scene.add(camera);

        // Controls
        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;

        /**
         * Renderer
         */
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const tick = () => {
            // Update controls
            controls.update();

            // Render
            renderer.render(scene, camera);

            // Call tick again on the next frame
            window.requestAnimationFrame(tick);
        };

        tick();
        
        
    }, []);

    return <>
        <canvas className="webgl w-screen h-screen"></canvas>
    </>;
}

export default ThreeDText;
