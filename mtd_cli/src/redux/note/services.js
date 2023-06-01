import {api} from "../../helpers/api"
export const getNotes = async() => {
    const { data } = await api.get("/Notes", { withCredentials: true });
    return data;
}