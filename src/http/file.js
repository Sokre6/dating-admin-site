import axios from "./axios";

export async function getFileById(id) {
    const response = await axios.get(`/api/v1/file/${id}`);
    return response.data;
}