import React, { useState , useContext } from "react";
import axios from '../axios';

type UserdataType = {
    id:string,
    token:string,
    email:string,
    name:string,
} | null;

type AuthContextType = {
    userdata:UserdataType,
    isAuthorized:boolean,
    APIFunctions:
    {
        LogIn:(email:string,password:string)=>Promise<boolean>,
        SignUp:(email:string,password:string,name:string,dob:string)=>Promise<boolean>,
        SignOut:()=>void,
        PostRequest:(url:string,body:any,needsToken:boolean,params?:any)=>Promise<any>,
        GetRequest:(url:string,needsToken:boolean,params?:any)=>Promise<any>
    }
}

type AuthResponseType = {
    status:number,
    [key:string]:any
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export function useAuth()
{
    return useContext(AuthContext);
}

export function AuthProvier(props:{children:React.ReactNode})
{
    const [isAuthorized,setIsAuthorized] = useState(false);
    const [userdata,setUserdata] = useState<UserdataType>({id:"",name:"",token:"",email:""});

    const APIFunctions = {
        LogIn,
        SignUp,
        SignOut,
        PostRequest,
        GetRequest
    };

    const value = {
        userdata,
        isAuthorized,//is signed in
        APIFunctions
    }

    return  <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>

    async function LogIn(email:string,password:string):Promise<boolean>
    {
        try
        {
            const response:AuthResponseType = await PostRequest("/user/login",{email,password},false);
            
            console.log(response);
            if(response.status == 201)
            {
                setUserdata(response.data);
                setIsAuthorized(true);
                localStorage.setItem("userdata",JSON.stringify(response.data));
                return true;
            }
        }
        catch(e)
        {
            return false;
        }
        return false;
    }
    async function SignUp(email:string,password:string,name:string,dob:string):Promise<boolean>
    {
        try
        {
            const response:AuthResponseType = await PostRequest("/user",{email,password,dob,name},false);
            console.log(response);
            if(response.status == 201)
            {
                alert("User Created");
                return true;
            }
        }
        catch(e)
        {
            return false;
        }
        return false;
    }
    async function SignOut()
    {
        setUserdata(null);
        setIsAuthorized(false);
        localStorage.removeItem("userdata");
    }
    async function GetRequest(url:string,sendToken:boolean,params?:any)
    {
        let response:AuthResponseType;
        try
        {
            if(sendToken)
            {
                response = await axios.get(url,{headers:{"x-access-token":userdata?.token},params:params})
            }
            else
            {
                response = await axios.get(url,{params:params});
            }
        }
        catch(e:any)
        {
            return HandleErrors(e);
        }
        return response;
    }
    async function PostRequest(url:string,body:any,needsToken:boolean,params?:any)
    {
        let response:AuthResponseType;

        try
        {
            if(needsToken && isAuthorized)
            {
                response = await axios.post(url,body,{headers:{"x-access-token":userdata?.token},params:params});
            }
            else
            {
                response = await axios.post(url,body,{params:params});
            }   
        }
        catch(e:any)
        {
            return HandleErrors(e);
        }
        return response;
    }

    function HandleErrors(e:any):AuthResponseType
    {
        console.log(e);
        return e.response;
    }

}
