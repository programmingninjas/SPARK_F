import Navbar from '../../components/common/Navbar'
import { Link } from 'react-router-dom'

function ARTraining() {
  return (
    <>
    <Navbar/>
    <section className='container p-4 lg:px-64 mx-auto'>
        <div className="flex gap-4 h-screen">
          <video src="../videos/ar1.mp4" controls className='w-full h-full object-cover'/>
          <div className="flex gap-4 flex-wrap">
                <Link to={'https://www.instagram.com/ar/1539027936944787/?ch=ZGQ2YWRiNTk0OTEzNGIwN2FiMmU2NTI1ODdiZWMxNGU%3D'} className='shadow-xl bg-white flex gap-4 flex-col items-center justify-between h-96 w-full md:w-1/3 grow p-4 rounded-xl'>
                    <div className='w-full grow rounded-lg overflow-clip'>
                        <img src="../thumbnails/meditation.jpg" className='w-full h-full' alt="" />
                    </div>
                    <h2 className='text-2xl font-bold'>Meditation</h2>
                </Link>
                <Link to={'https://www.instagram.com/ar/102665482894424/'} className='shadow-xl bg-white flex gap-4 flex-col items-center justify-between h-96 w-full md:w-1/3 grow p-4 rounded-xl'>
                    <div className='w-full grow rounded-lg overflow-clip'>
                        <img src="../thumbnails/ramayan.jpg" className='w-full h-full' alt="" />
                    </div>
                    <h2 className='text-2xl font-bold'>Ramayan Quiz</h2>
                </Link>
                <Link to={'https://www.instagram.com/ar/782490540274499/'} className='shadow-xl bg-white flex gap-4 flex-col items-center justify-between h-96 w-full md:w-1/3 grow p-4 rounded-xl'>
                    <div className='w-full grow rounded-lg overflow-clip'>
                        <img src="../thumbnails/nose.jpg" className='w-full h-full' alt="" />
                    </div>
                    <h2 className='text-2xl font-bold'>Draw with Nose</h2>
                </Link>
                <Link to={'https://www.instagram.com/ar/1304699136832450/'} className='shadow-xl bg-white flex gap-4 flex-col items-center justify-between h-96 w-full md:w-1/3 grow p-4 rounded-xl'>
                    <div className='w-full grow rounded-lg overflow-clip'>
                        <img src="../thumbnails/sing.jpg" className='w-full h-full' alt="" />
                    </div>
                    <h2 className='text-2xl font-bold'>Sing with BTS</h2>
                </Link>
            </div>
        </div>
    </section>
</>
  )
}

export default ARTraining