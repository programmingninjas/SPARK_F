import { useState, useEffect } from 'react'
import { useAuth } from "../../context/AuthContext";
import Button from '../../components/common/Button'
import Navbar from '../../components/common/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ISAAScalesPage() {
    const navigator = useNavigate();
    const possibleAnswers = ["rarely", "sometimes", "frequently", "mostly", "always"] as const;
    type answerType = typeof possibleAnswers[number] | undefined;
    const [answers, setAnswers] = useState<answerType[]>([]);

    const auth = useAuth();
    const [questions, setQuestions] = useState<Record<string, string[]>>({});

    async function getQuestions() {
        let response = await auth?.APIFunctions.GetRequest("/isaa", true);
        if (response.status == 200) {
            let result = response.data;
            delete result["_id"]
            setQuestions(result);
        }
    }
    useEffect(() => {
        getQuestions();
    }, [])

    function setAnswer(index: number, value: answerType) {
        setAnswers(prev => {
            prev[index] = value;
            return [...prev];
        })
    }

    async function submitScale() {
        let results = answers;
        let response = await auth?.APIFunctions.PostRequest("/scale", { results }, true);
        if (response.status == 200) {
            toast.success("Scale submitted successfully", {
                position: "bottom-right",
            });
        }
        else {
            toast.error("Something went wrong", {
                position: "bottom-right",
            });
        }
    }

    function Submit() {
        for (let i = 0; i < Object.keys(questions).length; i++) {
            if (answers[i] != 'rarely' && answers[i] != 'sometimes' && answers[i] != 'frequently' && answers[i] != 'mostly' && answers[i] != 'always') {
                toast.info("Please fill all the fields", {
                    position: "bottom-right",
                });
                return;
            }
        }
        submitScale();
        navigator("/dashboard");
    }

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto">
                <section className="mt-8">
                    <h1 className="text-2xl sm:text-4xl lg:text-6xl mt-12 font-semibold">
                        ISAA Scale <span className="gradient-text">Evaluation</span>
                    </h1>
                    <p className='mt-6 text-justify text-xl'>This is to evaluate the ISAA scale of your ward.</p>
                </section>
                <div className='max-w-4xl mx-auto flex flex-col gap-4'>
                    {Object.keys(questions).map((value, index) => {
                        return (
                            <div key={index} className='bg-light rounded-xl p-8'>
                                <h1 className='text-xl'>{(index + 1) + ". " + value}</h1>
                                {questions[value].map((value, idx) => {
                                    return (
                                        <div key={idx} className="flex mt-4 gap-4 flex-col md:flex-row">
                                            <h1 className='text-xl'>{(idx + 1) + ". " + value}</h1>
                                            {possibleAnswers.map((value, index2) => {
                                                return <button key={index2} onClick={() => { setAnswer(index, value) }} className={`capitalize hover:scale-105 active:scale-95 duration-200 grow p-2 rounded md:p-4 transition-all ${(answers[index] == value) ? "bg-primary text-white" : "text-primary outline outline-1 outline-primary"}`}>{value}</button>
                                            })}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                    <div className='bg-light rounded-xl p-8 flex gap-4'>
                        <Button onClick={Submit} className='grow' type='filled'>Submit</Button>
                        <Button onClick={() => { setAnswers([]) }} className='grow' type='outline'>Reset</Button>
                    </div>
                </div>
            </div>
        </>
    )
}