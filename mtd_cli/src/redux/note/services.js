import {api} from "../../helpers/api"
export const getNotes = async() => {
    const { data } = await api.get("/Note/GetNotes", { withCredentials: true });
    return data;
}