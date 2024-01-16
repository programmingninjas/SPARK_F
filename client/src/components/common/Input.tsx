import { ReactNode } from "react";

type InputPropsType = {
  children?:ReactNode
  label:string,
  type:React.HTMLInputTypeAttribute,
  hasError?:boolean,
  onChange?:React.ChangeEventHandler<HTMLInputElement>,
  value?:string | number | readonly string[] | undefined,
  placeholder?:string,
  className?:string
}
function Input(props:InputPropsType)
{
  return (
    <div className={`w-full text-base ${props.className}`}>
      <h1 className={`opacity-50 ${props.hasError?"text-error":""} transition-colors`}>{props.label}</h1>
      <div className="relative mt-2">
        <input placeholder={props.placeholder} value={props.value} onChange={props.onChange} type={props.type} className={`w-full ${props.children?"pl-10 md:pl-10":""} py-2 px-3 md:py-3 md:px-4 rounded-lg outline outline-1 ${props.hasError?"outline-error":"outline-transparent focus:outline-secondary"} transition-all duration-300 shadow-lg shadow-dark/5`}/>
        <div className={`absolute top-0 left-0 opacity-25  py-2 md:py-3 px-2 ${props.hasError?"text-error":""} transition-colors`}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Input;