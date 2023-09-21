import { Link } from "react-router-dom";
import Button from "../components/common/Button"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import AreaMetric from "../components/AreaMetric";
import ICAImage from "./../assets/ICA.png"

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

function DashboardPage()
{
  const auth = useAuth();
  const [dob,setDob] = useState("");

  async function getDob()
  {
    let response = await auth?.APIFunctions.GetRequest("/user/me",true);
    if(response.status == 200)
    {
      setDob(response.data.dob);
    }
  }

  useEffect(()=>{
    getDob();
  },[])

  return (
    <>
      <Navbar/>
      <div className="mx-auto container min-h-screen flex gap-2 flex-col md:flex-row">
        <div className="w-full md:w-96 h-full md:sticky top-4">
          <div className="card bg-white">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <h1 className="text-xl font-bold">{auth?.userdata?.name}</h1>
                <h1 className="text-sm text-primary">{auth?.userdata?.email}</h1>
              </div>
            </div>
            <Button  onClick={auth?.APIFunctions.SignOut} disableScale className="mt-2 w-full" type="filled">Sign Out</Button>
          </div>
          <div className="card bg-white mt-2">
            <h1 className="font-semibold text-md">Date of Birth</h1>
            <h1 className="font-semibold text-md text-primary">{dob}</h1>
          </div>
        </div>
        <div className="grow">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="card bg-white h-96 grow">
              <AreaMetric data={data} label="Age" sublabel=" Actual Age vs Developmental Age" />
            </div>
            <div className="flex flex-col gap-2">
              <Link to='/analysis' className="card bg-white grow flex flex-col">
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
          </div>
          <div className="card bg-white mt-2">
            <h1 className="font-semibold text-xl">Training Module or something</h1>
            <div className="flex mt-4 gap-2 flex-wrap">
              <Link to="/scales" className="card w-64 flex flex-col justify-between h-40 grow bg-primary text-light transition-all hover:grow-[2] duration-300 hover:z-20 shadow-xl hover:shadow-primary/40 hover:bg-accent">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                </svg>
                <div>
                  <h1 className="font-semibold uppercase">Scale Tester</h1>
                  <h1 className="opacity-70">Subtitle</h1>
                </div>
              </Link>
              <Link to='/3dtext' className="card w-64 flex flex-col justify-between h-40 grow bg-primary text-light transition-all hover:grow-[2] duration-300 hover:z-20 shadow-xl hover:shadow-primary/40 hover:bg-accent">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
                <div>
                  <h1 className="font-semibold uppercase">3D Text</h1>
                  <h1 className="opacity-70">Subtitle</h1>
                </div>
              </Link>
              <a href='Detection.html' className="card w-64 flex flex-col justify-between h-40 grow bg-primary text-light transition-all hover:grow-[2] duration-300 hover:z-20 shadow-xl hover:shadow-primary/40 hover:bg-accent">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h1 className="font-semibold uppercase">Detection</h1>
                  <h1 className="opacity-70">Subtitle</h1>
                </div>
              </a>
              <Link to='/reactiontime' className="card w-64 flex flex-col justify-between h-40 grow bg-primary text-light transition-all hover:grow-[2] duration-300 hover:z-20 shadow-xl hover:shadow-primary/40 hover:bg-accent">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>

                <div>
                  <h1 className="font-semibold uppercase">Reaction Time</h1>
                  <h1 className="opacity-70">Subtitle</h1>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      {/* <p className="break-words">{auth?.userdata?.token}<br /></p> */}
    </>
  )
}

export default DashboardPage