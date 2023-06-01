import React, {useState} from 'react'
import { useDispatch } from "react-redux"
import {SetUser} from "../../redux/user/actions"
import {userLogin, getUser} from "../../redux/user/services"
import {NavLink, useNavigate} from "react-router-dom";
import "./scss/account.scss"
import "../../images/sheet.jpg"


export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
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
    function CheckInputs(){
        let pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
            setErrorPassword('');
            setErrorFlag('error');

            return false;
        }

        if(password.length < 6){
            setErrorMessage('Password must be at least 6 characters!');
            setErrorEmail('');
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
                  <input className={errorPassword} type="password" placeholder="Password *" value={password} onChange={event => onPasswordChange(event)}/>
              </div>
              <p className={"error-msg " + errorFlag}>{errorMessage}</p>
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
