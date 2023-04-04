import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AdminAccountApi, AdminAuthenticationApi } from "../../http";

export const fetchAllAdminAccounts = createAsyncThunk(
  "adminAccounts/fetchAllAdminAccounts",
  async () => {
    try {
      const response = await AdminAccountApi.getAllAdmins();
      return response;
    } catch (error) {}
  }
);

export const fetchCurrentAdmin = createAsyncThunk(
  "adminAccounts/fetchCurrentAdmin",
  async () => {
    const response = await AdminAccountApi.getCurrentAdmin();
    return response;
  }
);

export const doCreateAdmin = createAsyncThunk(
  "adminAccounts/createAdmin",
  async (args) => {
    try {
      await AdminAccountApi.createAdmin(args);
      await AdminAuthenticationApi.requestOneTimePassword(args);
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const doDeleteAdmin = createAsyncThunk(
  "adminAccounts/deleteAdmin",
  async (id) => {
    await AdminAccountApi.deleteAdmin(id);
  }
);

export const fetchAdminInfoByID = createAsyncThunk(
  "adminAccounts/fetchAdminInfoByID",
  async (id) => {
    const response = await AdminAccountApi.getAdminInfoByID(id);
    return response;
  }
);

export const doUpdateAdmin = createAsyncThunk(
  "adminAccounts/updateAdmin",
  async (args) => {
    try {
      const response = await AdminAccountApi.updateAdmin(args);
      return response;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

const initialState = {
  tableData: [],
};

const adminAccountSlice = createSlice({
  name: "adminAccount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllAdminAccounts.fulfilled, (state, action) => {
      return {
        ...state,
        tableData: action.payload,
      };
    });
  },
});

const { reducer } = adminAccountSlice;
export { reducer as adminAccountReducer };
