import React from 'react'
import * as Components from "../../components/index"
import {Link, useNavigate} from "react-router-dom";
import styles from "./header.module.scss"

export const Header = () => {

    const navigate = useNavigate();
    
    const ToProfile = () =>{
        navigate("/profile");
    }
    
    return(
        <header>
            <div className="content">
                <Link to="/">My To Do</Link>
                <div>
                    <Components.Button rank="second" text="My Profile" action={() => ToProfile()}/>
                </div>
            </div>
        </header>
    );
}