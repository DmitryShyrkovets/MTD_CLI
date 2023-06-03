import React, {useEffect, useState} from 'react'
import style from './button.module.scss'


export const Button = ({
                           text = "button", 
                           type = "submit", 
                           rank = "primary", 
                           isDisabled = false, 
                           action = null}) => {
    
    const [buttonStyle, setButtonStyle] = useState(style.primary);

    useEffect(() =>{
        switch (rank) {
            case "second":
                setButtonStyle(style.second);
                return;
            case "complete":
                setButtonStyle(style.complete);
                return;
            case "delete":
                setButtonStyle(style.delete);
                return;
            default:
                setButtonStyle(style.primary);
                return;

        }
    },[rank]);
    
    return(
        <button type={type} disabled={isDisabled} className={buttonStyle} onClick={action}>{text}</button>
    );
}