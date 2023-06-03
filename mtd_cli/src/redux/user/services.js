import {api} from "../../helpers/api"
export const userLogin = async(data) => {
    await api.post("/Account/Login", data);
}

export const CreateUser = async(data) => {
    await api.post("/Account/Registration", data);
}

export const RecoveryData = async(data) => {
    await api.post("/Account/RecoveryData", data);
}

export const userLogout = async() => {
    await api.post("/Account/Logout");
}

export const getUser = async() => {
    const { data } = await api.get("/Profile");
    return data;
}