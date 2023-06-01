import React, {useState} from 'react'
import { useDispatch } from "react-redux"
import {NavLink, useNavigate} from "react-router-dom";
import {CreateUser, getUser} from "../../redux/user/services";
import {SetUser} from "../../redux/user/actions";

export const Registration = () =>{

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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

    function CheckInputs(){
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
            setErrorFlag('error');
        }
    }
    
    return(
      <div>
          <div className="registration">
              <div className="img-place">
              </div>
              <form onSubmit={e => handleSubmit(e)}>
                  <h2>Registration</h2>
                  <div className="data-field">
                      <input className={errorEmail} type="text" placeholder="Email address *" value={email} onChange={event => onEmailChange(event)}/>
                  </div>
                  <div className="data-field">
                      <input className={errorPassword} type="password" placeholder="Password *" value={password} onChange={event => onPasswordChange(event)}/>
                  </div>
                  <div className="data-field">
                      <input className={errorConfirmPassword} type="password" placeholder="Confirm password *" value={confirmPassword} onChange={event => onConfirmPasswordChange(event)}/>
                  </div>
                  <p className={"error-msg " + errorFlag}>{errorMessage}</p>
                  <div className="buttons">
                      <button type="submit">Create account</button>
                      <NavLink className="back" to="/login">Back</NavLink>
                  </div>
              </form>
          </div>
      </div>  
    );
}