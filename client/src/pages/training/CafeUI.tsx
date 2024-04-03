import { Canvas } from '@react-three/fiber'
import Cafe from '../../components/Metaverses/Cafe'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function CafeUI()
{
  const [micActive, setMicActive] = useState(false);
  return (
    <>
      <div className="h-screen w-screen absolute -z-10">
          <Canvas
          camera={{ fov: 25, aspect: 1 }}
          shadows
          >
            <Cafe micActive={micActive}/>
          </Canvas>
      </div>
      <div className="h-screen">
          <div className="flex gap-4 justify-center items-end p-8 h-full">
              <Link to={'/dashboard'} className={`h-24 w-24 text-white bg-primary rounded-full shadow grid place-items-center duration-200 hover:scale-105 active:scale-95`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
              </Link>
              <div onClick={()=>setMicActive(prev=>!prev)} className={`h-24 w-24 ${micActive?"bg-primary":"bg-gray-800"} rounded-full shadow grid place-items-center duration-200 hover:scale-105 active:scale-95`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                </svg>
              </div>
          </div>
      </div>
    </>
  )
}

export default CafeUI