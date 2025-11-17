import axios from './axios.customize';

const URL_API = "/v1/api";

const createUserApi = (name, email, password) => {
  const URL_REGISTER = `${URL_API}/register`;
  const data = { name, email, password };
  return axios.post(URL_REGISTER, data);
};

const loginApi = (email, password) => {
  const URL_LOGIN = `${URL_API}/login`;
  const data = { email, password };
  return axios.post(URL_LOGIN, data);
};

const getUserApi = () => {
  const URL_USER = `${URL_API}/user`;
  return axios.get(URL_USER);
};

export { createUserApi, loginApi, getUserApi };