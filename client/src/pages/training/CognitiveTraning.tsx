import Navbar from '../../components/common/Navbar'
import { Link } from 'react-router-dom'

function CognitiveTraning() {
  return (
    <>
      <Navbar/>
      <section className="container mx-auto px-2 md:px-8 pb-24">
            <h1 className="text-2xl sm:text-4xl lg:text-6xl mt-12 font-semibold">
                All Training <span className="gradient-text">Modules</span>
            </h1>
            <div className="flex gap-4 flex-wrap text-light text-xl font-medium mt-8">
                <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/training/3dtext"}>
                    3D Alphabets
                </Link>
                <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/training/colorMatch"}>
                    Color Matching
                </Link>
                <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/training/aquarium"}>
                    Sea-quence
                </Link>
                <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/training/detection"}>
                    Object Recognition
                </Link>
                <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/training/crocodile"}>
                    Number Comparision
                </Link>
                <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/training/memoryGame"}>
                    Memory Game
                </Link>
            </div>
        </section>
    </>
  )
}

export default CognitiveTraning