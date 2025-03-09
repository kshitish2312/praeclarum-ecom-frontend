import axios from "axios";
import { store } from "../store/store";
import { logout, setTokens } from "../store/slices/authSlice";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((config:any) => {
  const state = store.getState();
  const accessToken = state.auth.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response: any) => response,
  async (error: { response: { status: number; }; config: { headers: { Authorization: string; }; }; }) => {
    if (error.response?.status === 401) {
      const state = store.getState();
      const refreshToken = state.auth.refreshToken;

      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          store.dispatch(setTokens(data));

          error.config.headers.Authorization = `Bearer ${data.accessToken}`;
          return axiosInstance(error.config);
        } catch (refreshError) {
          store.dispatch(logout());
        }
      } else {
        store.dispatch(logout());
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
