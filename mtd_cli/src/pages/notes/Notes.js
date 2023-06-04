import React, {useEffect, useCallback} from 'react'
import {useNavigate} from "react-router-dom";
import {getNotes} from "../../redux/note/services"
import {useDispatch, useSelector} from "react-redux";
import {SetNotes, ShowCreateForm} from "../../redux/note/actions";
import * as Components from "../../components/index"
import styles from './notes.module.scss'

export const Notes = () => {
    const notes = useSelector((state) => state.note.notes);
    const flag = useSelector((state) => state.note.flag);
    const showCreateForm = useSelector((state) => state.note.showCreateForm);
    const user = useSelector((state) => state.user.profile);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect( () => {
        if (user.id == null){
            navigate("/login");
        }
        
        Load();
    }, [flag])
    
    
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
    };
    
    const CreateForm = () => {
        dispatch(ShowCreateForm());
    }


    return(
        <>
            <Components.Header/>
            <main>
                {showCreateForm ?
                    <Components.CreateNoteForm userId={user.id}/> :
                    <div className="content">
                        <div className={styles.noteAction}>
                            <h2>Notes</h2>
                            <div>
                                <Components.Button text={"Create"} type={"button"} action={() => CreateForm()}/>
                            </div>
                        </div>
                        {notes?.map(((note) =>
                                <Components.Note key={note.id} note={note} />
                        ))}
                        {notes?.length < 1 &&
                            <div className={styles.notesInfo}>
                                <h3>You have no entries!</h3>
                            </div>
                        }
                    </div>
                }
            </main>
        </>
    )
}