import axios from "axios";
import config from "../config";
import store from "../store";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { clearAuthState, reissueJwt } from "../store/slices/auth";

export const createAxios = () => {
  return axios.create({
    timeout: 60000,
    baseURL: config.REACT_APP_API_BASE_URL,
  });
};

const instance = createAxios();

//Authorization interceptor

instance.interceptors.request.use(async (request) => {
  const { accessToken } = store.getState().auth;

  if (accessToken) {
    request.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return request;
});

// Language interceptor
instance.interceptors.request.use(async (request) => {
  const language = "hr";

  if (language) {
    request.headers["Accept-Language"] = language;
  }

  return request;
});

const authRefreshCallback = async (failedRequest) => {
  try {
    const tokens = await store
      .dispatch(reissueJwt({ axios: createAxios() }))
      .unwrap();
    failedRequest.response.config.headers[
      "Authorization"
    ] = `Bearer ${tokens.accessToken}`;
    return Promise.resolve();
  } catch (error) {
    store.dispatch(clearAuthState());
    return Promise.reject(failedRequest);
  }
};

createAuthRefreshInterceptor(instance, authRefreshCallback, {
  pauseInstanceWhileRefreshing: true,
});

export default instance;
