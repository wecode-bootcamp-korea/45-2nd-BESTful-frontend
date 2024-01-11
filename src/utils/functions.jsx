import { API_ADDRESS } from './API_ADDRESS';

const fetchApi = async (endpoint, method = 'GET') => {
  const response = await fetch(`${API_ADDRESS}${endpoint}`, {
    method: method,
    headers: {
      Authorization: localStorage.getItem('resToken'),
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
  const result = await response.json();

  return result;
};

export default fetchApi;
