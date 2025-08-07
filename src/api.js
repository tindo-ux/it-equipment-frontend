import axios from 'axios';
import { useAppContext } from './App';

const useApi = () => {
  const { setLoading } = useAppContext();

  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
  });

  api.interceptors.request.use(
    config => {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    response => {
      setLoading(false);
      return response;
    },
    error => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  return api;
};

export default useApi;
