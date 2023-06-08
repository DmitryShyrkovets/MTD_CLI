import React from 'react'
import * as Components from '../../components'
import { ShowUpdateForm, SetFlag} from "../../redux/note/actions";
import styles from './head.module.scss'
import {useDispatch, useSelector} from "react-redux";

export const DetailHead = ({name, deleteAction = null}) => {

    const dispatch = useDispatch();

    const UpdateForm = () => {
        dispatch(ShowUpdateForm());
    }

    return(
        <div className={styles.detailHead}>
        <h2>{name} </h2>
            <div className={styles.actions}>
                <div>
                    <Components.Button text={"Edit"} rank={"primary"} type={"button"} action={() => UpdateForm()}/>
                </div>
                <div>
                    <Components.Button text={"Delete"} rank={"delete"} type={"button"} action={deleteAction}/>
                </div>
            </div>
        </div>
    );
}