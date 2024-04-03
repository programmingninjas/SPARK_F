import { useState } from "react";
import { Link } from "react-router-dom";

function DashboardTabs({ months, category, physicalResult, evaulationStatus }: { months: number, category: string, physicalResult: number, evaulationStatus: boolean }) {
    interface Video {
        id: number;
        title: string;
        src: string;
        thumbnail: string;
    }
    const videos: Video[] = [
        { id: 1, title: 'Video 1', src: './videos/video1.mp4', thumbnail: "./thumbnails/image1.jpg" },
        { id: 2, title: 'Video 2', src: './videos/video2.mp4', thumbnail: "./thumbnails/image2.jpg" },
        { id: 3, title: 'Video 3', src: './videos/video3.mp4', thumbnail: "./thumbnails/image3.jpg" },
        { id: 4, title: 'Video 4', src: './videos/video4.mp4', thumbnail: "./thumbnails/image4.jpg" },
        { id: 5, title: 'Video 5', src: './videos/video5.mp4', thumbnail: "./thumbnails/image5.jpg" },
        { id: 6, title: 'Video 6', src: './videos/video6.mp4', thumbnail: "./thumbnails/image6.jpg" },
    ];


    const [menuIndex, setMenuIndex] = useState(0);



    return (
        <section className="mt-16">
            <h1 className="my-4 text-5xl font-bold">Evaluation <span className="gradient-text">Modules</span></h1>
            <div className="flex gap-4 flex-wrap text-light text-xl font-medium mt-8">
                {(months / 12) <= 6 ? (<>
                    <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/evaluation/agescale"}>
                        Developmental Age Scale
                    </Link>
                </>) : (<>
                    <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/evaluation/iqtest"}>
                        IQ Test
                    </Link>
                    <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/evaluation/movementsequence"}>
                        Physical Reaction Time
                    </Link>
                    <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/evaluation/isaascale"}>
                        ISAA Scale
                    </Link>
                </>)}
            </div>
            <div className="flex gap-2 mt-16">
                {
                    [["Recommended Cognitive Training", evaulationStatus], ["Recommended Social Training", true]].map((menu, index) => (
                        menu[1] && <div key={index} className={`w-full text-center py-6 rounded-t-xl cursor-pointer ${menuIndex === index ? "bg-white text-primary" : "bg-slate-100"} duration-200 text-xl`} onClick={() => setMenuIndex(index)}>
                            {menu[0]}
                        </div>
                    ))
                }
            </div>
            <div className="bg-white rounded-xl p-4">
                {[
                    <div className="flex gap-4 flex-wrap text-light text-xl font-medium mt-8">
                        {
                            (months / 12) <= 6 ? (<>
                                {
                                    category == "Younger" ? (<>
                                        <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/training/3dtext"}>
                                            3D Alphabets
                                        </Link></>) : (<><Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/training/colorMatch"}>
                                            Color Matching
                                        </Link>
                                            <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/training/aquarium"}>
                                                Sea-quence
                                            </Link></>)
                                }
                            </>
                            ) : (
                                <>
                                    {
                                        (physicalResult < 7842) ? (<>
                                            <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/training/colorMatch"}>
                                                Color Matching
                                            </Link>
                                            <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/training/aquarium"}>
                                                Sea-quence
                                            </Link>
                                            <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/training/detection"}>
                                                Object Recognition
                                            </Link></>) : (<> <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/training/crocodile"}>
                                                Number Comparision
                                            </Link>
                                                <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/training/memoryGame"}>
                                                    Memory Game
                                                </Link></>)
                                    }
                                </>)
                        }
                    </div>,
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                        {videos.map((video) => (
                            <div key={video.id} className="relative">
                                <video
                                    controls
                                    className="w-full h-auto"
                                    src={video.src}
                                    title={video.title}
                                    poster={video.thumbnail}
                                />
                            </div>
                        ))}
                    </div>
                ][menuIndex]}
            </div>
        </section>
    )
}

export default DashboardTabs