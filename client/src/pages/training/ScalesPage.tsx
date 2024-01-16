import  { useState } from 'react'
import Button from '../../components/common/Button'
import Navbar from '../../components/common/Navbar';
import { useNavigate } from 'react-router-dom';

function ScalesPage()
{
    const navigator = useNavigate();
    const possibleAnswers = ["yes","no"] as const;
    type answerType = typeof possibleAnswers[number] | undefined;
    const [answers,setAnswers] = useState<answerType[]>([]);

    const questions = [
        "Reacts to sound occasionally ",
        "Does not necessarily turn head toward sound source ",
        "Does not necessarily watch face when parent speaks",
        "Needs audiologic evaluation",
        "Minimal vocalization (cries, fusses) ",
        "Ceases sounds when talked too"
    ]
    
    function setAnswer(index:number,value:answerType)
    {
        setAnswers(prev=>{
            prev[index] = value;
            return [...prev];
        })
    }

    function Submit()
    {
        for(let i = 0 ; i < questions.length ; i ++)
        {
            if(answers[i] != 'yes' && answers[i] != 'no')
            {
                return;
            }
        }
        navigator("/dashboard");
    }

    return (
        <>
            <Navbar/>
            <div className="max-w-4xl mx-auto">
                <section className="flex mt-8 flex-wrap md:flex-nowrap">
                    <div className="w-full p-8 lg:p-16">
                        <h1 className="text-3xl md:text-5xl font-medium">Different Scales <span className="gradient-text">will be</span> <br/> available, <span className="gradient-text">here soon</span></h1>
                        <p className="mt-8 text-md md:text-xl">
                        Scales like Development Age , ISAA etc
                        <br />
                        This is under Research and Development.
                        </p>
                    </div> 
                </section>
                <div className='max-w-4xl mx-auto flex flex-col gap-4'>
                    {questions.map((value,index)=>{
                        return(
                            <div key={index} className='bg-light rounded-xl p-8'>
                                <h1 className='text-xl'>{(index+1) + ". " +value}</h1>
                                <div className="flex mt-4 gap-4 flex-col md:flex-row">
                                    {possibleAnswers.map((value,index2)=>{
                                        return <button key={index2} onClick={()=>{setAnswer(index,value)}} className={`capitalize hover:scale-105 active:scale-95 duration-200 grow p-2 rounded md:p-4 transition-all ${(answers[index] == value)?"bg-primary text-white":"text-primary outline outline-1 outline-primary"}`}>{value}</button>
                                    })}
                                </div>
                            </div>
                        )
                    })}
                    <div className='bg-light rounded-xl p-8 flex gap-4'>
                        <Button onClick={Submit} className='grow' type='filled'>Submit</Button>
                        <Button onClick={()=>{setAnswers([])}} className='grow' type='outline'>Reset</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScalesPage