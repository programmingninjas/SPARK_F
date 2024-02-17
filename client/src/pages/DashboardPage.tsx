import { Link } from "react-router-dom";
import Button from "../components/common/Button"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import AreaMetric from "../components/AreaMetric";
import ICAImage from "./../assets/ICA.png"
import { useModal } from "../context/ModalContext";

const data = [
  {
    "Actual Age": 1,
    "Developmental Age": 1,
  },
  {
    "Actual Age": 2,
    "Developmental Age": 1.5,
  },
  {
    "Actual Age": 3,
    "Developmental Age": 1.5,
  },
  {
    "Actual Age": 4,
    "Developmental Age": 1.65,
  },
  {
    "Actual Age": 5,
    "Developmental Age": 2.5,
  },
  {
    "Actual Age": 6,
    "Developmental Age": 4,
  },
  {
    "Actual Age": 7,
    "Developmental Age": 5,
  },
  {
    "Actual Age": 8,
    "Developmental Age": 6,
  },
  {
    "Actual Age": 9,
    "Developmental Age": 8,
  },
  {
    "Actual Age": 10,
    "Developmental Age": 9,
  },
  {
    "Actual Age": 11,
    "Developmental Age": 10.5,
  },
  {
    "Actual Age": 12,
    "Developmental Age": 11.5,
  },
];

function DashboardPage() {
  const auth = useAuth();
  const [dob, setDob] = useState("");
  const modal = useModal();
  async function getDob() {
    let response = await auth?.APIFunctions.GetRequest("/user/me", true);
    if (response.status == 200) {
      setDob(response.data.dob);
    }
  }

  useEffect(() => {
    getDob();
  }, [])

  const gap = "gap-4";

  return (
    <>
      <Navbar />
      <section className="container mx-auto px-2 md:px-8 pb-24">
        <div className={`flex flex-col lg:flex-row ${gap}`}>
          <div className={`w-full h-96 lg:w-96 flex flex-col ${gap}`}>
            <div className="card p-4 flex flex-col gap-2">
              <div className="flex gap-4">
                <div className="h-24 w-24 overflow-clip rounded-lg">
                  <img
                    className="h-full w-full object-cover"
                    src="https://i.pinimg.com/originals/97/2f/1b/972f1b8aca65479e3c401b800a4bd76a.jpg"
                    alt=""
                  />
                </div>
                <div className="grow flex flex-col justify-center">
                  <h1 className="text-xl font-bold">{auth?.userdata?.name}</h1>
                  <h1 className="text-primary">{auth?.userdata?.email}</h1>
                </div>
                <div className="grid place-items-center">
                  <svg
                    className="duration-150 hover:text-error cursor-pointer hover:scale-110 active:scale-95"
                    onClick={async () => {
                      if (
                        await modal?.CreateModal(
                          "Sign Out",
                          <h1>Are you sure you want to Sign Out?</h1>,
                          "Yes",
                          "No"
                        )
                      )
                        auth?.APIFunctions.SignOut();
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M15.2958 9V5.25C15.2958 4.65326 15.0658 4.08097 14.6563 3.65901C14.2468 3.23705 13.6914 3 13.1124 3H7.28988C6.7108 3 6.15543 3.23705 5.74596 3.65901C5.33648 4.08097 5.10645 4.65326 5.10645 5.25V18.75C5.10645 19.3467 5.33648 19.919 5.74596 20.341C6.15543 20.7629 6.7108 21 7.28988 21H13.1124C13.6914 21 14.2468 20.7629 14.6563 20.341C15.0658 19.919 15.2958 19.3467 15.2958 18.75V15M11.6567 9L8.7455 12M8.7455 12L11.6567 15M8.7455 12H21.1183"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <Link className="w-full" to={"/results"}>
                <Button className="w-full" type="filled">
                  Results
                </Button>
              </Link>
            </div>
            <div className="grow card p-4 flex justify-between items-center">
              <h1 className="font-semibold text-md">Date of Birth</h1>
              <h1 className="font-semibold text-md text-primary">{dob}</h1>
            </div>
            <div className="grow card p-4 flex justify-between items-center">
              <h1 className="font-semibold text-md">Evaluation Status</h1>
              <h1 className="font-semibold text-md text-primary">Pending...</h1>
            </div>
          </div>
          <div className="card p-4 bg-white h-96 w-full lg:w-160 grow">
            <AreaMetric data={data} label="Age" sublabel=" Actual Age vs Developmental Age" />
          </div>
          <Link to='/analysis' className="card p-4 bg-white grow flex flex-col">
            <div className="flex justify-between gap-4">
              <h1 className="font-bold">Recent EEG Analysis</h1>
              <h1 className="text-primary flex items-center gap-2">
                <div className="text-sm">View Details</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </h1>
            </div>
            <div className="grow flex justify-center items-center">
              <img className="w-64" src={ICAImage} alt="" />
            </div>
          </Link>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-6xl mt-12 font-semibold">
          <span className="gradient-text">Evalulation</span> Modules.
        </h1>
        <div className="flex gap-4 flex-wrap text-light text-xl font-medium mt-8">
          <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/evaluation/agescale"}>
            Developmental Age Scale
          </Link>
          <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/evaluation/isaascale"}>
            ISAA Scale
          </Link>
          <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/evaluation/reactiontime"}>
            Physical Reaction Time
          </Link>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-6xl mt-24 font-semibold">
          <span className="gradient-text">Training</span> Modules.
        </h1>
        <h1 className="text-md sm:text-2xl lg:text-3xl opacity-70">
          Recommended based on scale
        </h1>
        <div className="flex gap-4 flex-wrap text-light text-xl font-medium mt-8">
          <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/training/3dtext"}>
            3D Alphabets
          </Link>
          <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/training/detection"}>
            Object Recognition
          </Link>
          <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/training/colorMatch"}>
            Color Matching
          </Link>
          <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/training/memoryGame"}>
            Memory Game
          </Link>
          <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/training/shapeDetection"}>
            Shape Detection
          </Link>
          <Link className="card bg-primary w-96 grow hover:grow-[2] grid text-center py-16" to={"/training/faceExpressionDetection"}>
            Face Expression Detection
          </Link>
        </div>
      </section>
    </>
  )
  // return (
  //   <>
  //     <Navbar />
  //     <div className="mx-auto container flex gap-2 flex-col md:flex-row items-stretch">
  //       <div className="w-full md:w-96 h-full flex flex-col justify-center">
  //         <div className="card bg-white">
  //           <div className="flex items-center">
  //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24">
  //               <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  //             </svg>
  //             <div>
  //               <h1 className="text-xl font-bold">{auth?.userdata?.name}</h1>
  //               <h1 className="text-sm text-primary">{auth?.userdata?.email}</h1>
  //             </div>
  //           </div>
  //           <Button onClick={auth?.APIFunctions.SignOut} disableScale className="mt-2 w-full" type="filled">Sign Out</Button>
  //         </div>
  //         <div className="card bg-white mt-2">
  //           <h1 className="font-semibold text-md">Date of Birth</h1>
  //           <h1 className="font-semibold text-md text-primary">{dob}</h1>
  //         </div>
  //         <div className="card bg-white mt-2">
  //           <h1 className="font-semibold text-md">Some Other Metric</h1>
  //           <h1 className="font-semibold text-md text-primary">{dob}</h1>
  //         </div>
  //       </div>
  //       <div className="grow">
  //         <div className="flex flex-col md:flex-row gap-2">
  //           <div className="card bg-white h-96 grow">
  //             <AreaMetric data={data} label="Age" sublabel=" Actual Age vs Developmental Age" />
  //           </div>
  //           <div className="flex flex-col gap-2">
  //             <Link to='/analysis' className="card bg-white grow flex flex-col">
  //               <div className="flex justify-between gap-4">
  //                 <h1 className="font-bold">Recent EEG Analysis</h1>
  //                 <h1 className="text-primary flex items-center gap-2">
  //                   <div className="text-sm">View Details</div>
  //                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  //                     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  //                   </svg>
  //                 </h1>
  //               </div>
  //               <div className="grow flex justify-center items-center">
  //                 <img className="w-64" src={ICAImage} alt="" />
  //               </div>
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="flex container mx-auto gap-2 flex-wrap my-8">
  //       
  //       <div className="card bg-white mt-2 grow w-1/2">
  //         <h1 className="font-semibold text-xl">Recommended Training Modules</h1>
  //         <div className="flex mt-4 gap-2 flex-wrap">
  //           <Link to='/3dtext' className="card w-64 flex flex-col justify-between h-40 grow bg-primary text-light transition-all hover:grow-[2] duration-300 hover:z-20 shadow-xl hover:shadow-primary/40 hover:bg-accent">
  //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
  //               <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  //             </svg>

  //             <div>
  //               <h1 className="font-semibold uppercase">3D Alphabets</h1>
  //               <h1 className="opacity-70">Learn Letters of the English Alphabet in 3D</h1>
  //             </div>
  //           </Link>
  //           <Link to='/detection'>
  //             <div className="card w-64 flex flex-col justify-between h-40 grow bg-primary text-light transition-all hover:grow-[2] duration-300 hover:z-20 shadow-xl hover:shadow-primary/40 hover:bg-accent">
  //               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
  //                 <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
  //                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  //               </svg>
  //               <div>
  //                 <h1 className="font-semibold uppercase">Detection</h1>
  //                 <h1 className="opacity-70">Subtitle</h1>
  //               </div>
  //             </div>
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //     {/* <p className="break-words">{auth?.userdata?.token}<br /></p> */}
  //   </>
  // )`
}

export default DashboardPage