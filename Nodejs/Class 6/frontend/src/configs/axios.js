import axios from 'axios';
import configs from './configs';

const api = axios.create({
  baseURL: configs.BASE_URL,
  withCredentials: true,
});

export default api;