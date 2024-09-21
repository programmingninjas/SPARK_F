import { ReactNode, useEffect, useRef, useState } from "react"
import Groq from "groq-sdk";

type MessageType = {
    sender: number;
    message: ReactNode;
}

function Chatbot()
{
    const [input, setInput] = useState<string>('');
    const [messages, setMessages] = useState<MessageType[]>([{sender: 1, message: 'How can i help you today?'}]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const groq = new Groq({ apiKey: "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",dangerouslyAllowBrowser: true });

    async function SendMessage()
    {
        if(input.length > 0)
        {
            setMessages(prev=>[...prev, {sender: 0, message: input}]);
            GenerateResponse(input);
            setInput('');
        }
    }

    async function GenerateResponse(input: string) {
        const result = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a chatbot named Xiaojie integrated in our website 'S.P.A.R.K' which stands for Special People achieving remarkable knowledge. An EdTech website for children with Cognitive disabilities.Talk nicely with the kids.",
                },
                {
                    role: "user",
                    content: input,
                }
            ],
            model: "llama3-8b-8192",
        });

        const responseText = result.choices[0]?.message?.content || "Sorry, I couldn't understand that.";
        setMessages(prev => [...prev, { sender: 1, message: responseText }]);
    }

    useEffect(()=>{
        scrollRef.current?.scrollTo({top: scrollRef.current.scrollHeight, behavior: 'smooth'})
    },[messages])

    return (
    <>
        <button onClick={()=>{setIsOpen(prev=>!prev)}} className={`${isOpen?"opacity-0":""} duration-300 fixed right-4 bottom-4 z-40 p-4 bg-violet-800 text-slate-50 rounded-full transition-all active:bg-accent active:scale-95 hover:scale-105`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
            </svg>
        </button>
        <div className={`fixed right-0 bottom-0 z-40 duration-300 p-4 ${isOpen?"":"translate-y-full"}`}>
            <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-tr from-primary to-accent shadow-xl overflow-clip h-128 max-w-sm w-96">
                <div className="p-4 text-slate-100 flex items-center justify-between gap-4">
                    <img className="w-16 aspect-square rounded-full" src="https://xiaojiecat.com/wp-content/uploads/2024/04/Layer-3-150x150.png" alt="pfp" />
                    <div className="grow">
                        <h1 className="text-lg font-bold">Xiaojie</h1>
                        <p className="text-xs opacity-70">Online</p>
                    </div>
                    <div>
                        <svg onClick={()=>setIsOpen(prev=>!prev)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 transition-all cursor-pointer active:scale-95 hover:scale-105">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                </div>
                <div className="grow overflow-y-auto bg-slate-100 m-1 rounded-[20px] divide-y-2 flex flex-col">
                    <div ref={scrollRef} className="grow overflow-y-auto">
                        {
                            messages.map((msg, i) => (
                                <div key={i} className={`p-2 ${msg.sender === 0 ? 'text-right' : 'text-left'}`}>
                                    <div className={`p-3 px-4 text-justify ${msg.sender === 0 ? 'bg-primary text-slate-200 rounded-br-3xl' : 'bg-slate-300 text-slate-900 rounded-bl-3xl'} rounded-3xl inline-block`}>
                                        {msg.message}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        SendMessage();
                    }} className="flex p-2">
                        <input value={input} onChange={(e)=>{setInput(e.target.value)}} type="text" placeholder="Type and press [enter]" className="grow p-1 bg-slate-100 text-sm outline-none"/>
                        <button className="bg-primary text-slate-50 w-10 h-10 grid place-items-center rounded-full transition-all active:bg-accent active:scale-95 hover:scale-105">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 scale-75">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Chatbot
