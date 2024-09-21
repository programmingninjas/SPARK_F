import Navbar from '../../components/common/Navbar'
import { Link } from 'react-router-dom'

function AllTrainings() {
    return (
        <>
            <Navbar />
            <section className='container p-4 lg:px-64 mx-auto'>
                <div className="flex gap-4 flex-wrap">
                    <Link to={'/menu/cognitive'} className='shadow-xl bg-white flex gap-4 flex-col items-center justify-between h-96 w-full md:w-1/3 grow p-4 rounded-xl'>
                        <div className='w-full grow rounded-lg overflow-clip'>
                            <img src="congnitive.jpeg" className='w-full h-full object-cover' alt="" />
                        </div>
                        <h2 className='text-2xl font-bold'>Cognitive Training</h2>
                    </Link>
                    <Link to={'/metaverse'} className='shadow-xl bg-white flex gap-4 flex-col items-center justify-between h-96 w-full md:w-1/3 grow p-4 rounded-xl'>
                        <div className='w-full grow rounded-lg overflow-clip'>
                            <img src="metaverse.jpeg" className='w-full h-full object-cover' alt="" />
                        </div>
                        <h2 className='text-2xl font-bold'>Metaverse Training</h2>
                    </Link>
                    <Link to={'/menu/social'} className='shadow-xl bg-white flex gap-4 flex-col items-center justify-between h-64 w-full md:w-1/3 grow p-4 rounded-xl'>
                        <div className='w-full h-40 rounded-lg overflow-hidden'>
                            <img src="social.jpeg" className='w-full h-full object-cover' alt="Social Training" />
                        </div>
                        <h2 className='text-xl font-bold'>Social Training</h2>
                    </Link>
                </div>
            </section>
        </>
    )
}

export default AllTrainings