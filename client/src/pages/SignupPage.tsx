import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { FormEvent, useState } from "react";
import { useAuth } from "../context/AuthContext";

function SignupPage()
{
  const auth = useAuth();
  const [name,setName] = useState<InputState>({ value: "", hasError: false });
  const [email, setEmail] = useState<InputState>({ value: "", hasError: false });
  const [password, setPassword] = useState<InputState>({ value: "", hasError: false });
  const [confirmPassword, setConfirmPassword] = useState<InputState>({ value: "", hasError: false });
  const [dob, setDob] = useState<InputState>({ value: "", hasError: false });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    let hasError = false;

    //Pattern matching
    if (!email.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setEmail((prev) => ({ ...prev, hasError: true }));
      hasError = true;
    }

    if(!name.value.match(/[\S\s]+[\S]+/))
    {
      setName((prev)=>({...prev,hasError:true}));
      hasError = true;
    }
    if(!password.value.match(/[\S\s]+[\S]+/))
    {
      setPassword((prev)=>({...prev,hasError:true}));
      hasError = true;
    }
    if(!confirmPassword.value.match(/[\S\s]+[\S]+/))
    {
      setConfirmPassword((prev)=>({...prev,hasError:true}));
      hasError = true;
    }
    if(!dob.value.match(/[\S\s]+[\S]+/))
    {
      setDob((prev)=>({...prev,hasError:true}));
      hasError = true;
    }

    if(confirmPassword.value != password.value)
    {
      setPassword((prev)=>({...prev,hasError:true}));
      setConfirmPassword((prev)=>({...prev,hasError:true}));
      hasError = true;
    }

    if (hasError) return;

    auth?.APIFunctions.SignUp(email.value,password.value,name.value,dob.value);
  }

  return (
    <div className="flex h-screen">
      <div className="overflow-hidden hidden md:block">
        <img className="w-full h-full object-cover" src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
      </div>
      <div className="shrink-0 bg-light w-full md:w-160 flex flex-col p-8 md:p-16 overflow-y-auto">
        <h1 className="text-4xl font-bold">Sign up<span className="text-primary">.</span></h1>
        <form onSubmit={handleSubmit} action="" className="flex flex-wrap gap-4 mt-12">
          <Input
            className="grow"
            placeholder="Enter Full Name"
            value={name.value}
            hasError={name.hasError}
            onChange={(e) => setName({ value: e.target.value, hasError: false })}
            type="text"
            label="Full Name"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
          </Input>
          <Input
            className="grow"
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
          <Input
            placeholder="Confirm Password"
            value={confirmPassword.value}
            hasError={confirmPassword.hasError}
            onChange={(e) => setConfirmPassword({ value: e.target.value, hasError: false })}
            type="password"
            label="Confirm Password"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 scale-75"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
          </Input>
          <Input
            value={dob.value}
            hasError={dob.hasError}
            onChange={(e) => setDob({ value: e.target.value, hasError: false })}
            type="date"
            label="Date of Birth"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
          </Input>
          <Button className="mt-4 w-full" type="filled">SIGN UP</Button>
          <p className="opacity-75 text-xs md:text-base">Already have an Account? <Link className="text-accent" to='/login'>Login</Link>. </p>
        </form>
      </div>
    </div>
  )  
}

export default SignupPage;