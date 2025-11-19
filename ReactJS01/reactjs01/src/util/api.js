import axios from './axios.customize';

const URL_API = "/v1/api"; // giữ nguyên /v1/api

// ===== User APIs =====
const createUserApi = (name, email, password) => {
  return axios.post(`${URL_API}/users/register`, { name, email, password });
};

const loginApi = (email, password) => {
  return axios.post(`${URL_API}/users/login`, { email, password });
};

const getUserApi = () => {
  return axios.get(`${URL_API}/users/user`);
};

// ===== Product APIs =====
const getProductsApi = (page = 1, limit = 10) => {
  return axios
    .get(`${URL_API}/products?page=${page}&limit=${limit}`);
};

const createProductApi = (data) => {
  return axios.post(`${URL_API}/products`, data);
};

const updateProductApi = (id, data) => {
  return axios.put(`${URL_API}/products/${id}`, data);
};

const deleteProductApi = (id) => {
  return axios.delete(`${URL_API}/products/${id}`);
};

export {
  createUserApi,
  loginApi,
  getUserApi,
  getProductsApi,
  createProductApi,
  updateProductApi,
  deleteProductApi
};
