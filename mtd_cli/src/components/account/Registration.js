import React, {useState} from 'react'
import { useDispatch } from "react-redux"
import {NavLink, useNavigate} from "react-router-dom";
import {CreateUser, getUser} from "../../redux/user/services";
import {SetUser} from "../../redux/user/actions";
import error from "../../images/error.png";
import closeEye from "../../images/close_eye.png";
import openEye from "../../images/open_eye.png";

export const Registration = () =>{

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(false);
    const [inputTypePassword, setInputTypePassword] = useState("password");
    const [inputTypeConfirmPassword, setInputTypeConfirmPassword] = useState("password");

    const [errorFlag, setErrorFlag] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

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
    
    const handleSubmit = async (e) =>{
        e.preventDefault();

        if (!CheckInputs()){
            return;
        }

        await Registration();
    }

    const CheckInputs = () => {
        let pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        setErrorEmail('');
        setErrorPassword('');
        setErrorConfirmPassword('');
        setErrorMessage('')
        setErrorFlag('');

        if(email === "" || password === "" || confirmPassword === ""){
            setErrorMessage('Fields must not be empty!');
            setErrorEmail('error');
            setErrorPassword('error');
            setErrorConfirmPassword('error');
            setErrorFlag('error');

            return false;
        }

        if(!pattern .test(email)){
            setErrorMessage('Email entered incorrectly!');
            setErrorEmail('error');
            setErrorFlag('error');

            return false;
        }

        if(password !== confirmPassword){
            setErrorMessage('Passwords are different!');
            setErrorPassword('error');
            setErrorConfirmPassword('error');
            setErrorFlag('error');

            return false;
        }

        if(password.length < 6){
            setErrorMessage('Password must be at least 6 characters!');
            setErrorPassword('error');
            setErrorFlag('error');

            return false;
        }

        return true;
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
            setErrorMessage(e.request.response);
            setErrorEmail('error');
            setErrorPassword('error');
            setErrorConfirmPassword('error');
            setErrorFlag('error');
        }
    }

    const HideShowPassword = () => {
        if (isVisiblePassword){
            setInputTypePassword('password');
        }
        else{
            setInputTypePassword('text');
        }

        setIsVisiblePassword(!isVisiblePassword);
    }

    const HideShowConfirmPassword = () => {
        if (isVisibleConfirmPassword){
            setInputTypeConfirmPassword('password');
        }
        else{
            setInputTypeConfirmPassword('text');
        }

        setIsVisibleConfirmPassword(!isVisibleConfirmPassword);
    }
    
    return(
        <div className="registration">
            <div className="img-place">
            </div>
            <form onSubmit={e => handleSubmit(e)}>
                <h2>Registration</h2>
                <div className="data-field">
                    <input className={errorEmail} type="text" placeholder="Email address *" value={email} onChange={event => onEmailChange(event)}/>
                </div>
                <div className="data-field">
                    <input className={errorPassword} type={inputTypePassword} placeholder="Password *" value={password} onChange={event => onPasswordChange(event)}/>
                    <img src={isVisiblePassword ? closeEye : openEye} alt="open eye" title={isVisiblePassword ? "Hide password" : 'Show password'} onClick={ () => HideShowPassword()}/>
                </div>
                <div className="data-field">
                    <input className={errorPassword} type={inputTypeConfirmPassword} placeholder="Password *" value={confirmPassword} onChange={event => onConfirmPasswordChange(event)}/>
                    <img src={isVisibleConfirmPassword ? closeEye : openEye} alt="open eye" title={isVisibleConfirmPassword ? "Hide password" : 'Show password'} onClick={ () => HideShowConfirmPassword()}/>
                </div>
                <div className={"msg " + errorFlag}>
                    <img src={error} alt="status"/>
                    <p>{errorMessage}</p>
                </div>
                <div className="buttons">
                    <button type="submit">Create account</button>
                    <NavLink className="back" to="/login">Back</NavLink>
                </div>
            </form>
        </div>
    );
}