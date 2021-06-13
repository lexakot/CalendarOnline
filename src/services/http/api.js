import axios from 'axios';
import TokenStorage from '../storage/token';

const baseURL = 'http://82.146.48.248:90';

const http = axios.create({
  withCredentials: false,
  baseURL: baseURL,
  headers: {'Content-Type': 'application/json'},
});

http.interceptors.request.use(
  async request => {
    const token = await TokenStorage.get();
    const newRequest = {...request};
    if (token) {
      newRequest.headers.Authorization = `Bearer ${token}`;
    }
    return newRequest;
  },
  error => Promise.reject(error),
);

export default http;
