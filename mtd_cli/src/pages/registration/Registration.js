import React, {useState} from 'react'
import { useDispatch } from "react-redux"
import * as Components from "../../components/index"
import style from "./registration.module.scss"
import {CreateUser, getUser} from "../../redux/user/services";
import {SetUser} from "../../redux/user/actions";
import {useNavigate} from "react-router-dom";
import {ValidateRegistrationForm} from '../../helpers/validate'

export const Registration = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [status, setStatus] = useState({
        flag: '', 
        message: '',
        emailError: false,
        passwordError: false,
        confirmPasswordError: false,
    });
    

    const onEmailChange = (event) => {
        if(event.target.value === " "){
            event.target.value = "";
        }

        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        if(event.target.value === " "){
            event.target.value = "";
        }

        setPassword(event.target.value);
    }

    const onConfirmPasswordChange = (event) => {
        if(event.target.value === " "){
            event.target.value = "";
        }

        setConfirmPassword(event.target.value);
    }
    
    const onHandleSubmit = async (e) =>{
        e.preventDefault();

        setStatus(ValidateRegistrationForm(email, password, confirmPassword, status));
        
        if (status.flag === '') {
            await Registration();
        }
        
    }

    const Registration = async () =>{

        let user = {
            email: email,
            password: password
        };
        try {
            await CreateUser(user);
            dispatch(SetUser(await getUser()));
            navigate("/");
        }
        catch (e) {
            setStatus({
                flag: 'error', 
                message: e.request.response, 
                emailError: true, 
                passwordError: true,
                confirmPasswordError: true
            })
        }
    }
    
    const Back = () => {
        navigate('/login');
    }

    return(
        <main className={style.registration}>
            <form onSubmit={ e => onHandleSubmit(e)}>
                <h2>Registration</h2>
                <Components.Input placeholder="Email address *" type="text"  value={email} isError={status.emailError} onChange={e => onEmailChange(e)}/>
                <Components.Input placeholder="Password *" type="password"  value={password} isError={status.passwordError} onChange={e => onPasswordChange(e)}/>
                <Components.Input placeholder="Confirm password *" type="password"  value={confirmPassword} isError={status.confirmPasswordError} onChange={e => onConfirmPasswordChange(e)}/>
                <Components.Message type={status.flag} text={status.message}/>
                <div className={style.buttons}>
                    <Components.Button text="Create account"/>
                    <Components.Button type="button" rank="second" text="Back" action={() => Back()}/>
                </div>
            </form>
        </main>
    );
}