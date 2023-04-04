import axios from "./axios.js";

export const getAllAdmins = async () => {
  const response = await axios.get("/admin/api/v1/admin-account");
  return response.data;
};

export const getCurrentAdmin = async () => {
  const response = await axios.get("/admin/api/v1/admin-account/me");
  return response.data;
};

export const createAdmin = async (data) => {
  await axios.post("/admin/api/v1/admin-account", {
    username: data.email,
    status: "ACTIVE",
  });
};

export const deleteAdmin = async (id) => {
  await axios.delete(`/admin/api/v1/admin-account/${id}`);
};

export const getAdminInfoByID = async (axios, id) => {
  const response = await axios.get(`/admin/api/v1/admin-account/${id}`);
  return response.data;
};

export const updateAdmin = async (data) => {
  await axios.put(`/admin/api/v1/admin-account/${data.id}`, {
    id: data.id,
    username: data.username,
    status: data.status,
  });
};
