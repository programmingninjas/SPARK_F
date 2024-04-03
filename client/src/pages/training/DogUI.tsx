import { Canvas } from '@react-three/fiber'
import Dog from '../../components/Metaverses/Dog'
import { Link } from 'react-router-dom'
import { useState } from 'react';

function DogUI()
{
  const [state, setState] = useState(0);
  return (
    <>
      <div className="h-screen w-screen absolute -z-10">
          <Canvas
          camera={{ fov: 25, aspect: 1 }}
          shadows
          >
            <Dog state={state}/>
          </Canvas>
      </div>
      <div className="h-screen">
          <div className="flex gap-4 justify-center items-end p-8 h-full">
              <Link to={'/dashboard'} className={`h-24 w-24 text-white bg-primary rounded-full shadow grid place-items-center duration-200 hover:scale-105 active:scale-95`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
              </Link>
              <div onClick={()=>setState(0)} className={`h-24 w-24 text-light bg-primary rounded-full shadow grid place-items-center duration-200 hover:scale-105 active:scale-95`}>
                1
              </div>
              <div onClick={()=>setState(1)} className={`h-24 w-24 text-light bg-primary rounded-full shadow grid place-items-center duration-200 hover:scale-105 active:scale-95`}>
                2
              </div>
              <div onClick={()=>setState(2)} className={`h-24 w-24 text-light bg-primary rounded-full shadow grid place-items-center duration-200 hover:scale-105 active:scale-95`}>
                3
              </div>
          </div>
      </div>
    </>
  )
}

export default DogUI