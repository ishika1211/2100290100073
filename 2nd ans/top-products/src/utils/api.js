import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = 'http://testserver.com/api';

export const registerWithCompanies = async () => {
  const response = await axios.post(`${BASE_URL}/register`, {
    companies: ['company1', 'company2', 'company3', 'company4', 'company5']
  });
  return response.data;
};

export const fetchProducts = async (category, company) => {
  const response = await axios.get(`${BASE_URL}/products`, {
    params: { category, company }
  });
  return processProducts(response.data);
};

export const processProducts = (products) => {
  return products.map(product => ({
    ...product,
    uniqueId: uuidv4()
  }));
};