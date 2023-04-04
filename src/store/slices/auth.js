import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AdminAuthenticationApi } from "../../http";

export const requestOTP = createAsyncThunk("auth/requestOTP", async (args) => {
  try {
    await AdminAuthenticationApi.requestOneTimePassword(args);
  } catch (error) {
    throw error.response.status;
  }
});

export const doAuthenticate = createAsyncThunk(
  "auth/doAuthenticate",
  async (args) => {
    try {
      const response = await AdminAuthenticationApi.authenticate(args);
      return response;
    } catch (error) {
      throw error.response.data.cause;
    }
  }
);

export const reissueJwt = createAsyncThunk(
  "auth/reissueJwt",
  async (args, { getState, dispatch }) => {
    const { reissueToken } = getState().auth;
    if (!reissueToken) {
      throw new Error("Reissue token not available");
    }
    const { axios } = args;
    const tokens = await AdminAuthenticationApi.reissueTokens(
      axios,
      reissueToken
    );
    dispatch(updateJwt({ ...tokens }));
    return tokens;
  }
);

const initialState = {
  email: null,
  accessToken: null,
  reissueToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      return {
        ...state,
        email: action.payload,
      };
    },
    clearAuthState: () => {
      return {
        ...initialState,
      };
    },
    updateJwt: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doAuthenticate.fulfilled, (state, action) => {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        reissueToken: action.payload?.reissueToken,
      };
    });
  },
});

const { actions, reducer } = authSlice;
export const { setEmail, clearAuthState, updateJwt } = actions;
export { reducer as authReducer };
