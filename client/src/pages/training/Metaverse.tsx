import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'

function Metaverse() {
  return (
    <>
        <Navbar/>
        <section className='container p-4 lg:px-64 mx-auto'>
            <div className="flex gap-4 flex-wrap">
                <Link to={'/metaverse/cafe'} className='shadow-xl bg-white flex gap-4 flex-col items-center justify-between h-96 w-full md:w-1/3 grow p-4 rounded-xl'>
                    <div className='w-full grow rounded-lg overflow-clip'>
                        <img src="congnitive.jpeg" className='w-full h-full object-cover' alt="" />
                    </div>
                    <h2 className='text-2xl font-bold'>CAFE NPC</h2>
                </Link>
                <Link to={'/metaverse/dog'} className='shadow-xl bg-white flex gap-4 flex-col items-center justify-between h-96 w-full md:w-1/3 grow p-4 rounded-xl'>
                    <div className='w-full grow rounded-lg overflow-clip'>
                        <img src="metaverse.jpeg" className='w-full h-full object-cover' alt="" />
                    </div>
                    <h2 className='text-2xl font-bold'>Training Pets</h2>
                </Link>
            </div>
        </section>
    </>
  )
}

export default Metaverse