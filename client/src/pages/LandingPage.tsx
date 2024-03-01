import { ContactShadows, Environment, Float, PresentationControls, useGLTF } from '@react-three/drei';
import Button from '../components/common/Button';
import Navbar from '../components/common/Navbar';
import { Canvas } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';

function LandingPage()
{

  const char1 = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bookcase-wide/model.gltf');
  const char2 = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf');
  const navigate  = useNavigate();
  function getStarted(){
    navigate('/signup')
  }
  function learnMore(){
    const section:any = document.getElementById('target');
    section.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <Navbar/>
      <div className="md:container md:mx-auto bg-light">
        <main>
          <section className="flex mt-8 flex-wrap md:flex-nowrap">
            <div className="w-full p-8 lg:p-16">
              {/* <h1 className="text-4xl md:text-6xl font-medium"><span className="gradient-text">SPARK</span></h1> */}
              <h1 className="text-1xl md:text-7xl font-medium"><span className="gradient-text">SPARK</span></h1>
              <h1 className="text-4xl md:text-4xl font-medium">Special People Achieving <br /> Remarkable Knowledge</h1>
              {/* <p className="mt-8 text-md md:text-xl">
                Lorem ipsum dolor sit, amet consectetur adipisicing?
                <br />
                Elit. Nostrum qui nihil inventore atque reprehenderit corrupti.
              </p> */}
              <div className="mt-8 flex gap-4">
                <Button onClick={getStarted} type="filled">Get Started</Button>
                <Button onClick={learnMore} type="outline">Learn More</Button>
              </div>
            </div>
            <div className="w-full">
              <Canvas camera={{ fov: 20, position: [4, 1, 6] }}>
                <PresentationControls global rotation={[0,.3,0]} polar={[0,0]} azimuth={[-2,2]} config={{mass:2,tension:400}} snap={{mass:4,tension:400}}>
                  <hemisphereLight groundColor={0x6457c7} color={0xffffff} intensity={2.5}/>
                  <Environment preset="city" />
                  <Float speed={2} rotationIntensity={2} >
                    <primitive object={char1.scene} scale={.8} position-y={-.5}/>
                  </Float>
                </PresentationControls>
                <ContactShadows opacity={.4} scale={5} blur={2.4} position-y={-.75}/>
              </Canvas>
            </div>
          </section>
          <section className="flex mt-48 flex-wrap flex-row-reverse md:flex-nowrap">
            <div className="w-full p-8 lg:p-16 flex flex-col gap-48">
              <div id='target'>
                <h1 className="text-3xl md:text-5xl font-medium">Why <span className="gradient-text">Spark?</span></h1>
                <p className="mt-8 text-md md:text-xl">
                Project Spark offers curated training and experience along with metaverse social interactions based on comprehensive monitoring, evaluation and progress tracking through EEG and cognitive drill analysis
                </p>
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-medium">Our <span className="gradient-text">Objective.</span></h1>
                <p className="mt-8 text-md md:text-xl">
                  The objective of Project Spark is to empower individuals with cognitive disabilities by providing personalised training in order for them to live and thrive in society.
                </p>
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-medium">Our <span className="gradient-text">Solution.</span></h1>
                <p className="mt-8 text-md md:text-xl">
                Our project is an EdTech platform that assesses cognitive disabilities and offers personalized training modules for children. It provides caregivers, educators, and therapists with accessible tools to support cognitive development and track progress effectively.
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="h-96 sticky top-1/4">
                <Canvas camera={{ fov: 20, position: [4, 1, 6] }}>
                  <PresentationControls global rotation={[0,.3,0]} polar={[0,0]} azimuth={[-2,2]} config={{mass:2,tension:400}} snap={{mass:4,tension:400}}>
                    <hemisphereLight groundColor={0x6457c7} color={0xffffff} intensity={2.5}/>
                    <Environment preset="city" />
                    <Float speed={2} rotationIntensity={1.5} >
                      <primitive object={char2.scene} scale={1} position-y={-.75}/>
                    </Float>
                  </PresentationControls>
                  <ContactShadows opacity={.4} scale={5} blur={2.4} position-y={-0.9}/>
                </Canvas>
              </div>
            </div>
          </section>
          <section className="py-48">
            <div className="flex flex-wrap gap-4 p-4">
              <div className="bg-accent shadow-accent/30 text-light grow hover:grow-[15] transition-all duration-500 shadow-lg p-16 rounded-lg flex flex-col items-center justify-center">
                <h1 className="text-4xl md:text-7xl font-bold">1 in 1000</h1>
                <h1>Children are diagnosed with down syndrome</h1>
              </div>
              <div className="bg-primary shadow-primary/30 text-light grow hover:grow-[15] transition-all duration-500 shadow-lg p-16 rounded-lg flex flex-col items-center justify-center">
                <h1 className="text-4xl md:text-7xl font-bold">1 in 100</h1>
                <p>Children are diagnosed with autism</p>
              </div>
              <div className="bg-secondary shadow-secondary/30 grow hover:grow-[15] transition-all duration-500 shadow-lg p-16 rounded-lg flex flex-col items-center justify-cente">
                <h1 className="text-4xl md:text-7xl font-bold">2 in 1000</h1>
                <p>Children are diagnosed with parkinson's disease</p>
              </div>
              <div className="bg-accent shadow-accent/30 text-light grow-[5] hover:grow-[15] transition-all duration-500 shadow-lg p-16 rounded-lg flex flex-col items-center justify-center">
                <h1 className="text-4xl md:text-7xl font-bold">9 in 100</h1>
                <p>Children are diagnosed with ADHD</p>
              </div>
              {/* <div className="bg-primary shadow-primary/30 text-light grow-[10] hover:grow-[15] transition-all duration-500 shadow-lg p-16 rounded-lg flex flex-col items-center justify-center">
                <h1 className="text-4xl md:text-7xl font-bold">1 in 1000</h1>
                <p>Children are diagnosed with down syndrome</p>
              </div>
              <div className="bg-secondary shadow-secondary/30 grow hover:grow-[15] transition-all duration-500 shadow-lg p-16 rounded-lg flex flex-col items-center justify-cente">
                <h1 className="text-4xl md:text-7xl font-bold">1 in 1000</h1>
                <p>Children are diagnosed with down syndrome</p>
              </div> */}
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default LandingPage;