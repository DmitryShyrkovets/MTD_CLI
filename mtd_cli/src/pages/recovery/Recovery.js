import React, {useState} from 'react'
import { useDispatch } from "react-redux"
import * as Components from "../../components/index"
import style from "./recovery.module.scss"
import {CreateUser, getUser, RecoveryData} from "../../redux/user/services";
import {SetUser} from "../../redux/user/actions";
import {useNavigate} from "react-router-dom";
import {ValidateRecoveryForm, ValidateRegistrationForm} from '../../helpers/validate'

export const Recovery = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [email, setEmail] = useState('');

    const [status, setStatus] = useState({
        flag: '', 
        message: '',
        emailError: false
    });
    

    const onEmailChange = (event) => {
        if(event.target.value === " "){
            event.target.value = "";
        }

        setEmail(event.target.value);
    }
    
    const onHandleSubmit = async (e) =>{
        e.preventDefault();
        
        setStatus(ValidateRecoveryForm(email, status));
        
        if (status.flag === '') {
            await Recovery();
        }
        
    }

    const Recovery = async () =>{

        let user = {
            email: email,
        };
        try {
            await RecoveryData(user);
            setStatus({
                flag: 'success',
                message: 'Email send successfully!',
                emailError: false
            })
        }
        catch (e) {
            setStatus({
                flag: 'error',
                message: e.request.response, 
                emailError: true
            })
        }
    }
    
    const Back = () => {
        navigate('/login');
    }

    return(
        <main className={style.recovery}>
            <form onSubmit={ e => onHandleSubmit(e)}>
                <h2>Recovery</h2>
                <Components.RecoveryInstruction />
                <Components.Input placeholder="Email address *" type="text"  value={email} isError={status.emailError} onChange={e => onEmailChange(e)}/>
                <Components.Message type={status.flag} text={status.message}/>
                <div className={style.buttons}>
                    <Components.Button text="Send email"/>
                    <Components.Button type="button" rank="second" text="Back" action={() => Back()}/>
                </div>
            </form>
        </main>
    );
}