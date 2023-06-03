import React, {useEffect, useState} from 'react'
import {updateNote, deleteNote} from "../../redux/note/services"
import {SetFlag} from "../../redux/note/actions";
import * as Components from "../index"
import styles from './note.module.scss'
import {useDispatch} from "react-redux";

export const Note = ({note}) => {

    const dispatch = useDispatch();

    const Done = async () => {
        let data = {
            id: note.id,
            userId: note.userId,
            name: note.name,
            description: note.description,
            isDone: !note.isDone,
        }
        try {
            await updateNote(data);
            dispatch(SetFlag());
        }
        catch (e) {
            console.log(e)
        }
    }
    
    const Delete = async () => {
        let data = {
            id: note.id,
            userId: note.userId
        }
        try {
            await deleteNote(data);
            dispatch(SetFlag());
        }
        catch (e) {
            console.log(e)
        }
    }
    
    return(
        <div className={styles.note} id={note.id}>
            <Components.CustomLink path={"/notes/" + note.id} 
                                   text={note.isDone ? 
                                       <del>{note.name}</del> 
                                       : note.name} />
            <div className={styles.actions}>
                <Components.Button text={"Done"} rank={note.isDone && "complete"} type={"button"} action={() => Done()}/>
                <Components.Button text={"Delete"} rank={"delete"} type={"button"} action={() => Delete()}/>
            </div>
        </div>
    );
}