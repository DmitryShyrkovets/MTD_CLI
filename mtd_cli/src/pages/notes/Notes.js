import React, {useEffect, useState} from 'react'
import {NavLink, useNavigate} from "react-router-dom";
import {getNotes} from "../../redux/note/services"
import {useDispatch, useSelector} from "react-redux";
import {SetNotes} from "../../redux/note/actions";
import * as Components from "../../components/index"

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
            let notesList =  await getNotes();
            dispatch(SetNotes(notesList));
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
                <Components.Header/>
                <main>
                    <h2>Notes</h2>
                    {notes.map(((note) =>
                            <Components.Note note={note} />
                    ))}
                </main>
            </>
    )
}