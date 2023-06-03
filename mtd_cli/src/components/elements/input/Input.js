import React, {useState} from 'react'
import openEye from "../../../assets/open_eye.png"
import closeEye from "../../../assets/close_eye.png"
import style from "./input.module.scss"


export const Input = ({placeholder, value, onChange, type, isError}) => {

    const [isVisible, setIsVisible] = useState(false);
    const [inputType, setInputType] = useState(type);

    const HideShowPassword = () => {
        if (isVisible){
            setInputType('password');
        }
        else{
            setInputType('text');
        }

        setIsVisible(!isVisible);
    }
    
    return(
        <>{type === "password" ?
            <article>
                <input type={inputType}
                       placeholder={placeholder}
                       className={isError  ? style.error : undefined}
                       value={value}
                       onChange={e => onChange(e)}/>
                <img src={isVisible ? closeEye : openEye}
                     alt="open eye"
                     title={isVisible ? "Hide password" : 'Show password'}
                     onClick={ () => HideShowPassword()}/>
            </article>
                :
            <article>
                <input type={inputType}
                       placeholder={placeholder}
                       className={isError  ? style.error : undefined}
                       value={value}
                       onChange={e => onChange(e)}/>
            </article> }
        </>
    );
}