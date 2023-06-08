import React, {useState, useEffect} from "react"
import * as Components from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {getDetail} from "../../redux/note/services";
import {SetDetail, SetFlag} from "../../redux/note/actions";
import {useNavigate, useParams} from "react-router-dom";
import {updateNote, deleteNote} from "../../redux/note/services"
import styles from "./detail.module.scss"
import moment from "moment"

export const Detail = () => {

    const {id} = useParams();
    
    const detail = useSelector((state) => state.note.detail);
    const user = useSelector((state) => state.user.profile);
    const flag = useSelector((state) => state.note.flag);

    const showUpdateForm = useSelector((state) => state.note.showUpdateForm);
    
    const [createAt, setCreateAt] = useState(null);
    const [doneAt, setDoneAt] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (user.id == null){
            navigate("/login");
        }
        
        Load();
    }, [flag])

    useEffect(() => {
        if(detail){
            setCreateAt(moment(detail.createAt).format('MMMM Do YYYY, h:mm:ss a'));
            setDoneAt(moment(detail.doneAt).format('MMMM Do YYYY, h:mm:ss a'));
        }

    }, [detail])
    
    const Load = async () => {
        try{
            let detail = await getDetail(id);
            dispatch(SetDetail(detail));
        }
        catch (e){
            dispatch(SetDetail(null));
        }
    }

    const Done = async () => {
        let data = {
            id: id,
            userId: detail.userId,
            name: detail.name,
            description: detail.description,
            isDone: !detail.isDone,
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
            id: id,
            userId: detail.userId
        }
        try {
            await deleteNote(data);
            navigate('/');
        }
        catch (e) {
            console.log(e)
        }
    }
    
    return(
        <>
            <Components.Header/>
            <main>
                {showUpdateForm ?
                <Components.UpdateNoteForm note={detail} />:
                detail ? <div className={styles.detail}>
                <section className={detail.isDone ? styles.success : undefined}>
                    <Components.DetailHead name={detail.name} deleteAction={() => Delete()}/>
                    <div className={styles.dates}>
                        <p><b>Create AT: </b> {createAt} </p>
                        {detail.doneAt && <p><b>Done AT: </b> {doneAt} </p>}
                    </div>
                    <div className={styles.description}>
                        <h3>Description: </h3>
                        <p>{detail.description}</p>
                    </div>
                    <Components.Button text={"Done"} rank={detail.isDone && "complete"} type={"button"} action={() => Done()} />
                </section>
            </div> :
            <Components.Message text="Note is not found"  type="error"/>}
            </main>
        </>
    );
}