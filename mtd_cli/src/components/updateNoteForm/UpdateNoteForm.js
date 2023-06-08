import React, {useEffect, useState} from 'react'
import styles from "./update.note.form.module.scss"
import * as Components from "../index"
import {updateNote} from "../../redux/note/services"
import {HideUpdateForm, UpdateNote} from "../../redux/note/actions";
import {useDispatch} from "react-redux";
import {ValidateNoteForm} from "../../helpers/validate";

export const UpdateNoteForm = ({note}) => {
    const dispatch = useDispatch()
    
    const [name, setName] = useState(note.name);
    const [description, setDescription] = useState(note.description);
    
    const [status, setStatus] = useState({
        type: '',
        message: '',
        nameError: '',
        descriptionError: '',
    });
    
    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }
    
    const onHandleSubmit = async (e) => {
        e.preventDefault();

        setStatus(ValidateNoteForm(name, description, status));

        if (status.flag === '') {
            await Update();
        }
    }
    
    const Back = () => {
        dispatch(HideUpdateForm());
    }
    
    const Update = async() => {
        let updatedNote = {
            id: note.id,
            userId: note.userId,
            name: name,
            description: description,
            isDone: note.isDone
        }
        try {
            await updateNote(updatedNote);
            dispatch(UpdateNote());
        }
        catch (e) {
            setStatus({
                type: 'error',
                message: e.request.response,
                nameError: true,
                descriptionError: true,
            })
        }
    }
    
    return(
        <div className={styles.update}>
            <form onSubmit={ e => onHandleSubmit(e)}>
                <h2>Edit Note</h2>
                <Components.Input placeholder="Name *" value={name} onChange={e => onChangeName(e)} isError={status.nameError}/>
                <Components.TextArea placeholder="Description *" value={description} onChange={e => onChangeDescription(e)} isError={status.descriptionError}/>
                <Components.Message type={status.type} text={status.message}/>
                <div className={styles.actions}>
                    <div>
                        <Components.Button text="Save"/>
                    </div>
                    <div>
                        <Components.Button type="button" rank="second" text="Back" action={() => Back()}/>
                    </div>
                </div>
            </form>
        </div>
    );
}