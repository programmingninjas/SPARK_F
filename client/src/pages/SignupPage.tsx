import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { FormEvent, useState } from "react";
import { useAuth } from "../context/AuthContext";

function SignupPage() {
  const auth = useAuth();
  const [name, setName] = useState<InputState>({ value: "", hasError: false });
  const [email, setEmail] = useState<InputState>({ value: "", hasError: false });
  const [password, setPassword] = useState<InputState>({ value: "", hasError: false });
  const [confirmPassword, setConfirmPassword] = useState<InputState>({ value: "", hasError: false });
  const [dob, setDob] = useState<InputState>({ value: "", hasError: false });
  const [role, setRole] = useState<string>("child"); // New state for role

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    let hasError = false;

    // Validation logic remains the same
    if (!email.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setEmail((prev) => ({ ...prev, hasError: true }));
      hasError = true;
    }

    if (!name.value.match(/[\S\s]+[\S]+/)) {
      setName((prev) => ({ ...prev, hasError: true }));
      hasError = true;
    }

    if (!password.value.match(/[\S\s]+[\S]+/)) {
      setPassword((prev) => ({ ...prev, hasError: true }));
      hasError = true;
    }

    if (!confirmPassword.value.match(/[\S\s]+[\S]+/)) {
      setConfirmPassword((prev) => ({ ...prev, hasError: true }));
      hasError = true;
    }

    if (!dob.value.match(/[\S\s]+[\S]+/)) {
      setDob((prev) => ({ ...prev, hasError: true }));
      hasError = true;
    }

    if (confirmPassword.value !== password.value) {
      setPassword((prev) => ({ ...prev, hasError: true }));
      setConfirmPassword((prev) => ({ ...prev, hasError: true }));
      hasError = true;
    }

    if (hasError) return;

    // Include role in signup function
    auth?.APIFunctions.SignUp(email.value, password.value, name.value, dob.value, role);
  };

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
          />
          <Input
            className="grow"
            placeholder="Enter Email Address"
            value={email.value}
            hasError={email.hasError}
            onChange={(e) => setEmail({ value: e.target.value, hasError: false })}
            type="email"
            label="Email Address"
          />
          <Input
            placeholder="Enter Password"
            value={password.value}
            hasError={password.hasError}
            onChange={(e) => setPassword({ value: e.target.value, hasError: false })}
            type="password"
            label="Password"
          />
          <Input
            placeholder="Confirm Password"
            value={confirmPassword.value}
            hasError={confirmPassword.hasError}
            onChange={(e) => setConfirmPassword({ value: e.target.value, hasError: false })}
            type="password"
            label="Confirm Password"
          />
          <Input
            value={dob.value}
            hasError={dob.hasError}
            onChange={(e) => setDob({ value: e.target.value, hasError: false })}
            type="date"
            label="Date of Birth"
          />
          {/* New role selection input */}
          <div className="flex flex-col">
            <label className="mb-2">Select Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="border rounded p-2">
              <option value="child">Child</option>
              <option value="educator">Educator</option>
            </select>
          </div>
          <Button className="mt-4 w-full" type="filled">SIGN UP</Button>
          <p className="opacity-75 text-xs md:text-base">Already have an Account? <Link className="text-accent" to='/login'>Login</Link>.</p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
