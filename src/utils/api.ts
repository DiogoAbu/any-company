import Config from 'react-native-config';
import axios from 'axios';

const timeout = 10000;
axios.defaults.timeout = timeout;

const instance = axios.create({
  baseURL: Config.API_URL,
});

instance.defaults.timeout = timeout;

export const setAuthorizationToken = (token: string) => {
  instance.defaults.headers.common.Authorization = 'Bearer ' + token;
};

export default instance;
