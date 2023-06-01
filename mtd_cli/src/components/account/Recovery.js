import React, {useState} from 'react'
import {NavLink, useNavigate} from "react-router-dom";
import {RecoveryData} from "../../redux/user/services";
import success from "../../images/success.png";
import error from "../../images/error.png";

export const Recovery = () =>{

    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const [Flag, setFlag] = useState('');
    const [message, setMessage] = useState('');

    const onEmailChange = (event) => {
        if(event.target.value === " "){
            event.target.value = "";
        }

        setEmail(event.target.value);
    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault();

        if (!CheckInputs()){
            return;
        }

        await ReacoveryData();
    }

    const CheckInputs = () => {
        let pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        setMessage('');
        setFlag('');
        
        if(email === ""){
            setMessage('Email must not be empty!');
            setFlag('error');

            return false;
        }

        if(!pattern .test(email)){
            setMessage('Email entered incorrectly!');
            setFlag('error');

            return false;
        }

        return true;
    }

    const ReacoveryData = async () =>{

        let user = {
            email: email,
        };
        try {
            await RecoveryData(user);
            setFlag('success');
            setMessage('Email sent successfully!');
        }
        catch (e) {
            setMessage(e.request.response);
            setFlag('error');
        }
    }
    
    return(
        <div className="recovery">
            <div className="img-place">
            </div>
            <form onSubmit={e => handleSubmit(e)}>
                <h2>Recovery</h2>
                <section>
                    <p>If you have forgotten your account password, we will help you regain access to it.</p>
                    <h3>Follow instructions:</h3>
                    <ol>
                        <li>Enter the email you used to register your account and submit the form.</li>
                        <li>Open your mail and check your incoming messages. There should be an email with login information.</li>
                        <li>Log in to your account and be sure to delete the letter, or even better, change the password to a new one.</li>
                    </ol>
                    <p>Good luck!</p>
                </section>
                <div className="data-field">
                    <input className={Flag} type="text" placeholder="Email address *" value={email} onChange={event => onEmailChange(event)}/>
                </div>
                <div className={"msg " + Flag}>
                    <img src={Flag === "success" ? success : error} alt="status"/>
                    <p>{message}</p>
                </div>
                <div className="buttons">
                    <button type="submit">Create account</button>
                    <NavLink className="back" to="/login">Back</NavLink>
                </div>
            </form>
        </div>
    );
}
