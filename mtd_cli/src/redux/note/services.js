import {api} from "../../helpers/api"
export const getNotes = async() => {
    const { data } = await api.get("/Notes", { withCredentials: true });
    return data;
}

export const updateNote = async(data) => {
    await api.put("/Notes", data, { withCredentials: true });
}

export const deleteNote = async(data) => {
    await api.delete("/Notes", { withCredentials: true, data: data });
}