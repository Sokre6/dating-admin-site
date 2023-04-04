import axios from "./axios.js";

export const requestOneTimePassword = async (data) => {
  await axios.post("/admin/api/v1/auth/otp", {
    username: data.email,
  });
};

export const authenticate = async (data) => {
  const response = await axios.post("/admin/api/v1/auth/authenticate", data, {
    skipAuthRefresh: true,
  });
  return response.data;
};

export const reissueTokens = async (axios, reissueToken) => {
  const response = await axios.post(
    `/admin/api/v1/auth/reissue-tokens?reissueToken=${reissueToken}`
  );
  return response.data;
};
