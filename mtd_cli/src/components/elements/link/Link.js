import React, {useEffect} from 'react'
import {Link} from "react-router-dom";
import style from "./link.module.scss"


export const CustomLink = ({path, text}) => {
    return(
        <Link className={style.link} to={path}>{text}</Link>
    );
}