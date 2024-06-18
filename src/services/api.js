import axios from 'axios';
import env from 'react-native-config';

console.log('URL: ' + env.API_BASE_URL);
const api = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 3000,
});

// Remove these lines if wanting to disable http request log
api.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});

export const setClientToken = token => {
  let tokenBearer = '';
  if (token != null && token !== '') {
    tokenBearer = 'Bearer ' + token;
  }
  api.defaults.headers.common.Authorization = tokenBearer;
};

export const URI = {
  CONTACT: 'contact'
};

export default api;
