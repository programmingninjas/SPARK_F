import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import AreaMetric from "../components/AreaMetric";
import { useModal } from "../context/ModalContext";
import DashboardTabs from "../components/DashboardTabs";

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
  const [role, setRole] = useState("");
  const modal = useModal();

  const gap = "gap-4";

  function getStatus(): string {
    let status = false ? ("Complete") : ("Pending...")
    return status
  }

  async function getUser() {
    let response = await auth?.APIFunctions.GetRequest("/user/me", true);
    if (response.status == 200) {
      setDob(response?.data?.dob);
      setRole(response?.data?.role);
    }
  }

  useEffect(() => {
    getUser();
  }, [])
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
                    src="https://xiaojiecat.com/wp-content/uploads/2024/04/Layer-3-150x150.png"
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
            </div>
            <div className="grow card p-4 flex justify-between items-center">
              <h1 className="font-semibold text-md">Date of Birth</h1>
              <h1 className="font-semibold text-md text-primary">{dob}</h1>
            </div>
            <div className="grow card p-4 flex justify-between items-center">
              <h1 className="font-semibold text-md">Evaluation Status</h1>
              <div className="flex items-center"> {/* Wrap both text and SVG inside a container */}
                <h1 className="font-semibold text-md mx-2 text-primary">{getStatus()}</h1>
              </div>
            </div>
          </div>
          <div className="card p-4 bg-white h-96 w-full lg:w-160 grow">
            <AreaMetric data={data} label="Age" sublabel=" Actual Age vs Developmental Age" />
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="card p-4 bg-white grow flex flex-col">
              <div className="flex justify-between gap-4">
                <h1 className="font-bold">Developmental Age</h1>
                <h1 className="text-primary flex items-center gap-2">
                  <div className="text-sm cursor-pointer">View Reports</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </h1>
              </div>
              <div className="grow flex justify-center items-center">
                <div className="text-2xl">11.5</div> {/* Example Date */}
              </div>
            </div>

            <div className="card p-4 bg-white grow flex flex-col">
              <div className="flex justify-between gap-4">
                <h1 className="font-bold">Social Age</h1>
                <h1 className="text-primary flex items-center gap-2">
                  <div className="text-sm cursor-pointer">View Reports</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </h1>
              </div>
              <div className="grow flex justify-center items-center">
                <div className="text-2xl">10</div> {/* Example Height */}
              </div>
            </div>

            <div className="card p-4 bg-white grow flex flex-col">
              <div className="flex justify-between gap-4">
                <h1 className="font-bold">IQ</h1>
                <h1 className="text-primary flex items-center gap-2">
                  <div className="text-sm cursor-pointer">View Results</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </h1>
              </div>
              <div className="grow flex justify-center items-center">
                <div className="text-2xl">70</div> {/* Example Weight */}
              </div>
            </div>
          </div>

        </div>
        <DashboardTabs role={role}/>
      </section>
    </>
  )
}

export default DashboardPage