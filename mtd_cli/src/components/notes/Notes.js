import React, {useEffect, useState} from 'react'
import {NavLink, useNavigate} from "react-router-dom";
import {getNotes} from "../../redux/note/services"
import {useDispatch, useSelector} from "react-redux";
import {SetNotes} from "../../redux/note/actions";

export const Notes = () => {
    const notes = useSelector((state) => state.note.notes);
    const user = useSelector((state) => state.user.profile);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [isAuth, setIsAuth] = useState(false);

    useEffect(  () => {
        if (user.id == null){
            navigate("/login");
        }
    }, [])
    
    useEffect(   () => {
        Load();
    }, [])

     const Load = async () => {

        try {
            let test =  await getNotes();
            dispatch(SetNotes(test));
        }
        catch (e) {
            console.log(e);
            if (e.response.status == 401){
                navigate("/login");
            }
        }
    }


        return(
        <>
            <h2>Notes</h2>
            <div>
                <NavLink to="/login">login</NavLink>
            </div>
            <div>
                <NavLink to="/logout">logout</NavLink>
            </div>
            {notes.map(((note) => 
                <div key={note.id}>
                    <p>Note id: {note.id}</p>
                    <p>Note userId: {note.userId}</p>
                    <p>Note name: {note.name}</p>
                    <p>Note category: {note.category}</p>
                    <p>Note text: {note.text}</p>
                </div>
            ))}
        </>
    )
}