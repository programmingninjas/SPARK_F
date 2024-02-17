import { useEffect, useState } from "react";
import Navbar from '../components/common/Navbar';
import { useAuth } from "../context/AuthContext"

function ResultPage() {
    const auth = useAuth();
    const [ageResults, setAgeResult] = useState([]);
    const [isaaResult, setIsaaResult] = useState({});
    const [range, setRange] = useState("");
    const [months, setMonths] = useState(0);
    const [dob, setDob] = useState("");
    const [user, setUser] = useState("");

    const [developmentalAge, setDevelopmentalAge] = useState(0);
    const [category, setCategory] = useState("");
    const [autism, setAutism] = useState("");

    async function getUser() {
        let response = await auth?.APIFunctions.GetRequest("/user/me", true);
        if (response.status == 200) {
            setDob(response.data.dob);
            setUser(response.data._id);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    interface MinAge {
        [minAge: string]: number;
    }
    const minAge: MinAge = {
        'birth_to_five': 0,
        'six_to_ten': 6,
        'eleven_to_fifteen': 11,
        'sixteen_to_twenty': 16,
        'twentyone_to_twentyfive': 21,
        'twentysix_to_thirty': 26,
        'thirtyone_to_thirtyfive': 31,
        'thirtysix_to_forty': 36,
        'fortyone_to_fiftynine': 41,
        'sixty_to_seventyone': 60
    };

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
    async function getAgeResult() {
        let months = calculateMonths(dob);
        let range = getMonthRange(months);
        let response = await auth?.APIFunctions.GetRequest("/scale/result/" + range, true, { user });
        setMonths(months);
        setRange(range);
        if (response.status == 200) {
            setAgeResult(response.data);
        }
    }
    useEffect(() => {
        if (!user) return;
        getAgeResult();
    }, [user])

    type Response = "yes" | "no";

    function evaluateResults(age: number, results: Response[]): number {
        const countYes = results.filter(result => result === "yes").length;
        const countNo = results.filter(result => result === "no").length;

        const totalResponses = results.length;
        const halfResponses = totalResponses / 2;

        if (countYes === totalResponses - 1 && countNo === 1) {
            // All but one response is "yes"
            return age;
        } else if (countYes >= halfResponses) {
            // Half or more responses are "yes"
            return minAge[range] + 2;
        } else {
            // More than half responses are "no"
            return minAge[range];
        }
    }

    useEffect(() => {
        if (!ageResults) return;
        setDevelopmentalAge(evaluateResults(months,ageResults));
    }, [ageResults])

    function getCategory(): string {
        if (months===developmentalAge) {
            return "Actual Age";
        } else {
            return "Younger Age";
        }
    }

    useEffect(() => {
        if(!developmentalAge)return;
        setCategory(getCategory());
    }, [developmentalAge])

    function calculateAutismCategory() {
        const categories = Object.keys(isaaResult);
        let totalScore = 0;
    
        categories.forEach(category => {
            const responses = isaaResult[category];
            console.log(responses)
            const scoreMap = {
                "rarely": 1,
                "sometimes": 2,
                "frequently": 3,
                "mostly": 4,
                "always": 5
            };
    
            for (let i=0;i<responses.length;i++){
                totalScore += scoreMap[responses[i]]
            }
        });
        // Determine the category based on the total score
        let category;
        if (totalScore >= 153) {
            category = "Severe Autism";
        } else if (totalScore >= 107 && totalScore < 153) {
            category = "Moderate Autism";
        } else if (totalScore >= 70 && totalScore < 106) {
            category = "Mild Autism";
        } 
        else {
            category = "No Autism"; 
        }
    
        return category;
    }

    async function getisaaResult() {
        let response = await auth?.APIFunctions.GetRequest("/isaa/result/", true, { user });
        if (response.status == 200) {
            setIsaaResult(response.data.results);
        }
    }
    useEffect(() => {
        if (!user) return;
        getisaaResult();
    }, [user])
    
    useEffect(() => {
        if (!isaaResult) return;
        setAutism(calculateAutismCategory());
    }, [isaaResult])


    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto">
                <section className="mt-8">
                    <h1 className="text-2xl sm:text-4xl lg:text-6xl mt-12 font-semibold">
                        Developmental Age <span className="gradient-text">Result</span>
                    </h1>
                    <p className='mt-6 text-justify text-xl'>Based on the questionaire that you filled, Here are the results</p>
                </section>
                <div className='max-w-4xl mx-auto flex flex-col gap-4'>
                    <p className="text-4xl mt-20 font-semibold">
                        Your Developmental Age is <span className="gradient-text">{developmentalAge}</span>
                    </p>
                    <p className="text-4xl mt-12 font-semibold">
                        Your Category is <span className="gradient-text">{category}</span>
                    </p>
                </div>
                <section className="mt-20">
                    <h1 className="text-2xl sm:text-4xl lg:text-6xl mt-12 font-semibold">
                        ISAA <span className="gradient-text">Result</span>
                    </h1>
                    <p className='mt-6 text-justify text-xl'>Based on the questionaire that you filled, Here are the results</p>
                </section>
                <div className='max-w-4xl mx-auto flex flex-col gap-4'>
                    <p className="text-4xl my-20 font-semibold">
                        Your Child has <span className="gradient-text">{autism}</span>
                    </p>
                </div>
                <section className="mt-10">
                    <h1 className="text-2xl sm:text-4xl lg:text-6xl mt-12 font-semibold">
                        Physical Reaction Time <span className="gradient-text">Result</span>
                    </h1>
                    <p className='mt-6 text-justify text-xl'>Based on the activity, Here are the results</p>
                </section>
                <div className='max-w-4xl mx-auto flex flex-col gap-4'>
                    <p className="text-4xl my-20 font-semibold">
                        Your Child has <span className="gradient-text">Good Reaction</span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default ResultPage