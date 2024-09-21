import { useState, useEffect } from 'react'
import { useAuth } from "../../context/AuthContext";
import Button from '../../components/common/Button'
import Navbar from '../../components/common/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AgeScalesPage() {
    const navigator = useNavigate();
    const possibleAnswers = [0,0.5,1] as const;
    type answerType = typeof possibleAnswers[number] | undefined;
    const [answers, setAnswers] = useState<{[key:string]:answerType[]}>({});

    const auth = useAuth();
    const [questions, setQuestions] = useState<Record<string, string[]>>({});

    async function getQuestions() {
        let response = await auth?.APIFunctions.GetRequest("/social", true);
        if (response.status == 200) {
            let result = response.data;
            delete result["_id"]
            setQuestions(result);
        }
    }
    useEffect(() => {
        getQuestions();
    }, [])

    function setAnswer(index: number, value: answerType,category:string) {
        console.log(index,value,category)
        setAnswers(prev => {
            if(prev[category] == undefined)
            {
                prev = {...prev,[category]:[]};
            }
            prev[category][index] = value;
            console.log(prev[category][index])
            return {...prev};
        })
    }

    async function submitScale() {
        let results = answers;
        let response = await auth?.APIFunctions.PostRequest("/dev", { results }, true);
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
        for(const category in questions)
        {
            for(let i = 0 ; i < questions[category].length ; i ++)
            {
                if (answers[category][i] == undefined) {
                    toast.info("Please fill all the fields", {
                        position: "bottom-right",
                    });
                    return;
                }
            }
        }
        submitScale();
        navigator("/dashboard");
    }

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto">
                <section className="my-8">
                    <h1 className="text-2xl sm:text-4xl lg:text-6xl mt-12 font-semibold">
                        Social Maturity <span className="gradient-text">Scale</span>
                    </h1>
                    <p className='mt-6 text-justify text-xl'>This is to evaluate the Social Age of your ward.</p>
                </section>
                <div className='max-w-4xl mx-auto flex flex-col gap-4'>
                    {Object.keys(questions).map((category, index) => {
                        return (
                            <div key={index} className='bg-light rounded-xl'>
                                <h1 className='text-2xl font-bold capitalize mb-8'>{(index + 1) + ". " + category}</h1>
                                {questions[category].map((question, idx) => {
                                    return (
                                        <div key={idx} className='mt-6'>
                                            <h1 className='text-xl'>{(idx + 1) + ". " + question}</h1>
                                            <div className="flex mt-4 gap-4 flex-col md:flex-row">
                                                {possibleAnswers.map((value, index2) => {
                                                    return <button key={index2} onClick={() => { setAnswer(idx, value,category) }} className={`capitalize hover:scale-105 active:scale-95 duration-200 grow p-2 rounded md:p-4 transition-all ${(answers[category] && answers[category][idx] == value) ? "bg-primary text-white" : "text-primary outline outline-1 outline-primary"}`}>{value}</button>
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                                <hr className='border border-primary/10 mt-8 mb-16'/>
                            </div>
                        )
                    })}
                    <div className='bg-light rounded-xl p-8 flex gap-4'>
                        <Button onClick={Submit} className='grow' type='filled'>Submit</Button>
                        <Button onClick={() => { setAnswers({}) }} className='grow' type='outline'>Reset</Button>
                    </div>
                </div>
            </div>
        </>
    )
}