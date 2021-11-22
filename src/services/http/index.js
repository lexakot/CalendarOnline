import axios from 'axios';

const baseURL = 'http://178.250.159.105';

const http = axios.create({
  withCredentials: false,
  baseURL: baseURL,
  headers: {'Content-Type': 'application/json'},
});

// http.interceptors.request.use(
//   async (request) => {
//     const newRequest = {...request};
//     newRequest.data = {
//       ...newRequest.data,
//       api_key: config.apiKey,
//     };
//     return newRequest;
//   },
//   (error) => Promise.reject(error),
// );

export default http;
