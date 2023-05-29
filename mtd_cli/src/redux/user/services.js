import {api} from "../../helpers/api"
export const userLogin = async(loginData) => {
    await api.post("/Account/Login", loginData);
}

export const userLogout = async() => {
    await api.get("/Account/Logout");
}

export const getUser = async() => {
    const { data } = await api.get("/User/GetUser");
    return data;
}