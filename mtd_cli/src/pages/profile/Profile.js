import React from "react";
import * as Components from "../../components/index"
import { userLogout } from "../../redux/user/services";
import { CleanUser } from "../../redux/user/actions";
import { CleanNotes } from "../../redux/note/actions";
import { useNavigate } from "react-router-dom";

export const Profile = () => {

    const navigate = useNavigate();


    const Logout = async () => {
        await userLogout();
        CleanUser();
        CleanNotes();
        navigate("/login");
    }

    return(
        <>
            <Components.Header/>
            <div className="content">
                <h2>Profile page</h2>
                <p>This page is currently under development</p>
                <Components.Button rank="delete" text="Logout" type="button" action={() => Logout()}/>
            </div>
        </>
    );
}