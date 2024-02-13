import React, { ReactNode, useContext, useRef, useState } from "react";
import Button from "../components/common/Button";

type ModalContextType = {
    CreateModal(modalTitle: string, modalContent: ReactNode, positiveBTN: string, negativeBTN: string): Promise<unknown>
};

const ModalContext = React.createContext<ModalContextType | null>(null);

export function useModal() {
    return useContext(ModalContext);
}

export function ModalProvier(props: { children: React.ReactNode }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("ModalTitle");
    const [modalContent, setModalContent] = useState<ReactNode>(
        <h1>Are you sure you want to perform this action?</h1>
    );
    const [positiveBTN, setPositiveBTN] = useState("Yes");
    const [negativeBTN, setNegativeBTN] = useState("No");

    const value = {
        CreateModal,
    };

    const confirmationObject = useRef<PromiseClass>()

    class PromiseClass
    {
        //TODO change unknown
        resolve: (value: boolean) => void;
        reject: (value: boolean) => void;
        constructor(resolve:(value: boolean) => void,reject:(value: boolean) => void)
        {
            this.resolve = resolve;
            this.reject = reject;
        }
    }

    function CreateModal(modalTitle:string,modalContent:ReactNode,positiveBTN:string,negativeBTN:string)
    {
        setModalTitle(modalTitle);
        setModalContent(modalContent);
        setPositiveBTN(positiveBTN);
        setNegativeBTN(negativeBTN);
        setModalOpen(true);
        return new Promise((resolve,reject)=>{
            confirmationObject.current = new PromiseClass(resolve,reject)    
        });
    }

    function negativeClick()
    {
        confirmationObject.current?.resolve(false);
        setModalOpen(false);
    }
    function positiveClick()
    {
        confirmationObject.current?.resolve(true);
        setModalOpen(false);
    }

    return (
        <>
            <div
                className={`${modalOpen ? "bg-black/20" : "pointer-events-none"
                    } duration-500 fixed h-screen w-screen top-0 left-0 grid place-items-center z-50`}
            >
                <div
                    onClick={() => {
                        negativeClick();
                    }}
                    className={`absolute w-full h-full -z-10`}
                ></div>
                <div
                    className={`card max-w-lg w-full p-4 lg:p-8 ${modalOpen ? "" : "scale-125 opacity-0"
                        }`}
                >
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl md:text-4xl font-medium">{modalTitle}</h1>
                        <svg
                            onClick={() => {
                                negativeClick();
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8 text-text/70 hover:text-primary hover:scale-105 active:scale-95 duration-100 cursor-pointer"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                    </div>
                    <div className="opacity-70 mt-4">{modalContent}</div>
                    <div className="flex gap-4 mt-4">
                        <Button onClick={positiveClick} className="w-full" type="filled">
                            {positiveBTN}
                        </Button>
                        <Button onClick={negativeClick} className="w-full" type="filled">
                            {negativeBTN}
                        </Button>
                    </div>
                </div>
            </div>
            <ModalContext.Provider value={value}>
                {props.children}
            </ModalContext.Provider>
        </>
    );
}
