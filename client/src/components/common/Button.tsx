import { ReactNode } from "react";

type ButtonPropsType = 
{
    children?:ReactNode,
    type:"outline" | "text" | "filled" | "filled-red" | "filled-white",
    className?:string,
    onClick?:React.MouseEventHandler<HTMLButtonElement>,
    disableScale?:boolean
}
function Button(props:ButtonPropsType)
{
    let style:string = "";

    if(props.type == 'filled')style = 'bg-primary text-light rounded-md shadow-xl hover:shadow-primary/40 transition-all';
    if(props.type == 'filled-red')style = 'bg-error text-light rounded-md shadow-xl hover:shadow-error/40 transition-all';
    if(props.type == 'filled-white')style = 'bg-white text-dark rounded-md shadow-xl hover:shadow-white/10 transition-all';
    if(props.type == 'text')style = 'relative hover:text-primary transition-all after:absolute after:bg-primary after:h-px after:w-full after:left-0 after:bottom-0 hover:after:origin-left after:origin-right after:scale-x-0 hover:after:scale-100 after:transition-transform';
    if(props.type == 'outline')style = 'border border-primary rounded-md text-primary';

    return (
        <button onClick={props.onClick} className={`${style} ${props.className} ${props.disableScale?"":"hover:scale-105"} font-medium text-xs px-4 py-3 md:text-sm md:px-6 md:py-3 lg:text-base lg:px-8 lg:py-4 active:scale-95 duration-200`}>
            {props.children}
        </button>
    )
}

export default Button;