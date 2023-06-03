import React, {useEffect, useState} from 'react'
import style from './button.module.scss'


export const Button = ({text = "button", type = "submit", rank = "primary", action = null}) => {
    
    const [buttonStyle, setButtonStyle] = useState(style.primary);

    useEffect(() =>{
        switch (rank) {
            case "second":
                setButtonStyle(style.second);
                return;
            default:
                setButtonStyle(style.primary);
                return;

        }
    },[rank]);
    
    return(
        <button type={type} className={buttonStyle} onClick={action}>{text}</button>
    );
}