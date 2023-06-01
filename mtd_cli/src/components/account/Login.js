import React, {useState} from 'react'
import { useDispatch } from "react-redux"
import {SetUser} from "../../redux/user/actions"
import {userLogin, getUser} from "../../redux/user/services"
import {NavLink, useNavigate} from "react-router-dom";
import "../../images/sheet.jpg"
import error from "../../images/error.png";
import openEye from "../../images/open_eye.png";
import closeEye from "../../images/close_eye.png";


export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [inputType, setInputType] = useState("password");
    
    const [errorFlag, setErrorFlag] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    
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
    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        if (!CheckInputs()){
            return;
        }
        
        await onSignIn();
    }
    const CheckInputs = () => {
        let pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        setErrorEmail('');
        setErrorPassword('');
        setErrorMessage('')
        setErrorFlag('');
        
        if(email === "" || password === ""){
            setErrorMessage('Fields must not be empty!');
            setErrorEmail('error');
            setErrorPassword('error');
            setErrorFlag('error');

            return false;
        }

        if(!pattern .test(email)){
            setErrorMessage('Email entered incorrectly!');
            setErrorEmail('error');
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
    const onSignIn = async () =>{

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
            setErrorMessage(e.request.response);
            setErrorEmail('error');
            setErrorPassword('error');
            setErrorFlag('error');
        }
    }
    
    const HideShowPassword = () => {
        if (isVisiblePassword){
            setInputType('password');
        }
        else{
            setInputType('text');
        }
        
        setIsVisiblePassword(!isVisiblePassword);
    }
    
  return(
      <div className="login">
          <div className="img-place">
          </div>
          <form onSubmit={e => handleSubmit(e)}>
              <h2>Welcome</h2>
              <div className="data-field">
                  <input className={errorEmail} type="text" placeholder="Email address *" value={email} onChange={event => onEmailChange(event)}/>
              </div>
              <div className="data-field">
                  <input className={errorPassword} type={inputType} placeholder="Password *" value={password} onChange={event => onPasswordChange(event)}/>
                  <img src={isVisiblePassword ? closeEye : openEye} alt="open eye" title={isVisiblePassword ? "Hide password" : 'Show password'} onClick={ () => HideShowPassword()}/>
              </div>
              <div className={"msg " + errorFlag}>
                  <img src={error} alt="status"/>
                  <p>{errorMessage}</p>
              </div>
              <button type="submit">Sign in</button>
              <div className="login-links">
                  <div className="login-link">
                      <NavLink to="/recovery">Forgot password?</NavLink>
                  </div>
                  <div className="login-link">
                      <NavLink to="/registration">Don't have account?</NavLink>
                  </div>
              </div>
          </form>
      </div>
  );
}
