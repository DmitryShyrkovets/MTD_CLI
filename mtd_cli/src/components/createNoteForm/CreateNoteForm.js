import React, {useEffect, useState} from 'react'
import styles from "./create.note.form.module.scss"
import * as Components from "../../components/index"
import {createNote} from "../../redux/note/services"
import {HideCreateForm, CreateNote} from "../../redux/note/actions";
import {useDispatch} from "react-redux";
import {ValidateCreateNoteForm} from "../../helpers/validate";

export const CreateNoteForm = ({userId}) => {
    const dispatch = useDispatch()
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
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

        setStatus(ValidateCreateNoteForm(name, description, status));

        if (status.flag === '') {
            await Create();
        }
    }
    
    const Back = () => {
        dispatch(HideCreateForm());
    }
    
    const Create = async() => {
        let note = {
            userId: userId,
            name: name,
            description: description
        }
        try {
            await createNote(note);
            dispatch(CreateNote());
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
        <div className={styles.create}>
            <form onSubmit={ e => onHandleSubmit(e)}>
                <h2>Create Note</h2>
                <Components.Input placeholder="Name *" value={name} onChange={e => onChangeName(e)} isError={status.nameError}/>
                <Components.TextArea placeholder="Description *" value={description} onChange={e => onChangeDescription(e)} isError={status.descriptionError}/>
                <Components.Message type={status.type} text={status.message}/>
                <div className={styles.actions}>
                    <div>
                        <Components.Button text="Create"/>
                    </div>
                    <div>
                        <Components.Button type="button" rank="second" text="Back" action={() => Back()}/>
                    </div>
                </div>
            </form>
        </div>
    );
}