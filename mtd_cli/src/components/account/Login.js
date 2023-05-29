import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import {SetUser} from "../../redux/user/actions"
import {userLogin, getUser} from "../../redux/user/services"
import {useNavigate} from "react-router-dom";


export const Login = () => {

    const user = useSelector((state) => state.user.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    
    const onSignIn = async () =>{
        let user = {
            email: "testemail@mail.ru",
            password: "qweasdzxc"
        };
        try {
            await userLogin(user);
            let test = await getUser();
            console.log(test);
            dispatch(SetUser(test));
            navigate("/");
        }
        catch (e) {
            console.log(e)
        }
    }
    
  return(
      <>
        <h2>Login</h2>
          <p onClick={() => onSignIn()}>Click me</p>
          <p>{user.id}</p>
          <p>{user.nickname}</p>
          <p>{user.email}</p>
      </>
  );
}
