import {api} from "../../helpers/api"
export const userLogin = async(loginData) => {
    await api.post("/Account/Login", loginData);
}

export const CreateUser = async(loginData) => {
    await api.post("/Account/Registration", loginData);
}

export const userLogout = async() => {
    await api.get("/Account/Logout");
}

export const getUser = async() => {
    const { data } = await api.get("/Profile");
    return data;
}