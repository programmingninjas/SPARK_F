import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { FormEvent, useState } from "react";
import { useAuth } from "../context/AuthContext";

function LoginPage()
{
  const auth = useAuth();
  const navigator = useNavigate();
  const [email, setEmail] = useState<InputState>({ value: "", hasError: false });
  const [password, setPassword] = useState<InputState>({ value: "", hasError: false });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    let hasError = false;

    //Pattern matching
    if (!email.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setEmail((prev) => ({ ...prev, hasError: true }));
      hasError = true;
    }
    if(!password.value.match(/[\S\s]+[\S]+/))
    {
      setPassword((prev)=>({...prev,hasError:true}));
      hasError = true;
    }
    
    if (hasError) return;

    let response = await auth?.APIFunctions.LogIn(email.value,password.value);
    if(response)
    {
      navigator('/dashboard');
    }
  }

  return (
    <div className="flex h-screen">
      <div className="overflow-hidden hidden md:block">
        <img className="w-full h-full object-cover" src="https://images.pexels.com/photos/8364026/pexels-photo-8364026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
      </div>
      <div className="shrink-0 bg-light w-full md:w-160 flex flex-col p-8 md:p-16 overflow-y-auto">
        <h1 className="text-4xl font-bold">Log in<span className="text-primary">.</span></h1>
        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4 mt-12">
          <Input
            placeholder="Enter Email Address"
            value={email.value}
            hasError={email.hasError}
            onChange={(e) => setEmail({ value: e.target.value, hasError: false })}
            type="email"
            label="Email Address"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 scale-75"><path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" /></svg>
          </Input>

          <Input
            placeholder="Enter Password"
            value={password.value}
            hasError={password.hasError}
            onChange={(e) => setPassword({ value: e.target.value, hasError: false })}
            type="password"
            label="Password"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 scale-75"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
          </Input>
          <Button className="mt-4" type="filled">LOGIN</Button>
          <p className="opacity-75 text-xs md:text-base">Don't Have an Account? <Link className="text-accent" to='/signup'>Sign Up</Link>. </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;