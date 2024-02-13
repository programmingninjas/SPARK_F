import  { useState,useEffect } from 'react'
import { useAuth } from "../../context/AuthContext";
import Button from '../../components/common/Button'
import Navbar from '../../components/common/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ISAAScalesPage()
{
    const navigator = useNavigate();
    const possibleAnswers = ["yes","no"] as const;
    type answerType = typeof possibleAnswers[number] | undefined;
    const [answers,setAnswers] = useState<answerType[]>([]);

    const auth = useAuth();
    const [dob,setDob] = useState("");
    const [questions,setQuestions] = useState([]);

    interface MonthRange {
        [months: number]: string;
    }
    
    function getMonthRange(months: number): string {
        const monthsRange: MonthRange = {
            0: 'birth_to_five',
            6: 'six_to_ten',
            11: 'eleven_to_fifteen',
            16: 'sixteen_to_twenty',
            21: 'twentyone_to_twentyfive',
            26: 'twentysix_to_thirty',
            31: 'thirtyone_to_thirtyfive',
            36: 'thirtysix_to_forty',
            41: 'fortyone_to_fiftynine',
            60: 'sixty_to_seventyone'
        };
    
        let monthRange = '';
        for (const rangeStart in monthsRange) {
            if (months >= parseInt(rangeStart)) {
                monthRange = monthsRange[rangeStart];
            } else {
                break;
            }
        }
    
        return monthRange;
    }

    function calculateMonths(dob: string): number {
        const dateRegex: RegExp = /^(\d{4})-(\d{2})-(\d{2})$/;
        const match: RegExpMatchArray | null = dob.match(dateRegex);
    
        if (!match) {
            throw new Error('Invalid date format. Please provide date in the format YYYY-MM-DD.');
        }
    
        const [, yearStr, monthStr, dayStr]: string[] = match;
        const day: number = parseInt(dayStr, 10);
        const month: number = parseInt(monthStr, 10);
        const year: number = parseInt(yearStr, 10);
    
        const today: Date = new Date();
        const birthDate: Date = new Date(year, month - 1, day); // month is 0-indexed in JavaScript Dates
    
        // Calculate the difference in months
        let months = (today.getFullYear() - birthDate.getFullYear()) * 12 + (today.getMonth() - birthDate.getMonth());
    
        // If the current day of the month is before the birth day, decrement months by 1
        if (today.getDate() < birthDate.getDate()) {
            months--;
        }
    
        return months;
    }

    async function getDob()
    {
        let response = await auth?.APIFunctions.GetRequest("/user/me",true);
        if(response.status == 200)
        {
        setDob(response.data.dob);
        }
    }
    async function getQuestions() {
        let months = calculateMonths(dob);
        let range = getMonthRange(months);
        let response = await auth?.APIFunctions.GetRequest("/scale/"+range,true);
        if(response.status == 200)
        {
        setQuestions(response.data);
        }
    }
    useEffect(()=>{
        getDob();
    },[])
    useEffect(()=>{
        if(!dob)return;
        getQuestions();
    },[dob])
    
    function setAnswer(index:number,value:answerType)
    {
        setAnswers(prev=>{
            prev[index] = value;
            return [...prev];
        })
    }
    
    async function submitScale(){
        let month = calculateMonths(dob);
        let months = getMonthRange(month);
        let results = answers;
        let response = await auth?.APIFunctions.PostRequest("/scale",{months,results},true);
        if(response.status == 200)
        {
            toast.success("Scale submitted successfully", {
                position: "bottom-right",
            });
        }
        else{
            toast.error("Something went wrong", {
                position: "bottom-right",
            });
        }
    }

    function Submit()
    {
        for(let i = 0 ; i < questions.length ; i ++)
        {
            if(answers[i] != 'yes' && answers[i] != 'no')
            {
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
            <Navbar/>
            <div className="max-w-4xl mx-auto">
                <section className="mt-8">
                    <h1 className="text-2xl sm:text-4xl lg:text-6xl mt-12 font-semibold">
                        ISAA Scale <span className="gradient-text">Evaluation</span>
                    </h1>
                    <p className='mt-6 text-justify text-xl'>This is to evaluate the ISAA scale of your ward.</p>
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