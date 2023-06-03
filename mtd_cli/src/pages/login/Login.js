import React, {useState} from 'react'
import { useDispatch } from "react-redux"
import * as Components from "../../components/index"
import style from "./login.module.scss"
import {getUser, userLogin} from "../../redux/user/services";
import {SetUser} from "../../redux/user/actions";
import {useNavigate} from "react-router-dom";
import {ValidateLoginForm} from '../../helpers/validate'

export const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [status, setStatus] = useState({
        flag: '', 
        message: '',
        emailError: false,
        passwordError: false,
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
    
    const onHandleSubmit = async (e) =>{
        e.preventDefault();

        setStatus(ValidateLoginForm(email, password, status));
        
        if (status.flag === '') {
            await Login();
        }
        
    }

    const Login = async () =>{

        let user = {
            email: email,
            password: password
        };
        try {
            await userLogin(user);
            dispatch(SetUser(await getUser()));
            navigate("/");
        }
        catch (e) {
            setStatus({
                flag: 'error', 
                message: e.request.response, 
                emailError: true, 
                passwordError: true
            })
        }
    }

    return(
        <main className={style.login}>
            <form onSubmit={ e => onHandleSubmit(e)}>
                <h2>Welcome</h2>
                <Components.Input placeholder="Email address *" type="text"  value={email} isError={status.emailError} onChange={e => onEmailChange(e)}/>
                <Components.Input placeholder="Password *" type="password"  value={password} isError={status.passwordError} onChange={e => onPasswordChange(e)}/>
                <Components.Button text="Sign In"/>
                <Components.Message type={status.flag} text={status.message}/>
                <div className={style.links}>
                    <Components.CustomLink path="/recovery" text="Forgot password?"/>
                    <Components.CustomLink path="/registration" text="Don't have account?"/>
                </div>
            </form>
        </main>
    );
}