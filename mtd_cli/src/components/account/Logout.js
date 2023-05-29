import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {userLogout} from "../../redux/user/services";
import {CleanUser} from "../../redux/user/actions"
import {CleanNotes} from "../../redux/note/actions";

export const Logout = () => {
    const user = useSelector((state) => state.user.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(  () => {
        if (user.id == null){
            navigate("/login");
        }
    })
    
    const onLogout = async () =>{
        await userLogout();
        dispatch(CleanUser());
        dispatch(CleanNotes());
        navigate("/login");
    }
  
  return(
      <>
        <h2>Logout</h2>
        <p onClick={() => onLogout()}>Click me</p>
      </>
  );
}
