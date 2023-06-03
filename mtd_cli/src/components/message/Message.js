import React, {useEffect, useState} from 'react'
import styles from "./message.module.scss"
import success from "../../assets/success.png"
import error from "../../assets/error.png"
import info from "../../assets/info.png"


export const Message = ({text, type}) => {

    const [icon, setIcon] = useState(info);
    const [style, setStyle] = useState(styles.none);

    useEffect(() => {
        switch (type) {
            case "success":
                setIcon(success);
                setStyle(styles.success);
                return;
            case "error":
                setIcon(error);
                setStyle(styles.error);
                return;
            case "info":
                setIcon(info);
                setStyle(styles.info);
                return;
            default:
                setStyle(styles.none);
                return;

        }
    }, [type])
    

    return(
        <div className={style}>
            <img src={icon} alt="error"/>
            <p>{text}</p>
        </div>
    );
}