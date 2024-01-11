import { API_ADDRESS } from './API_ADDRESS';

const fetchApi = async (endpoint, setStateFunc, method = 'GET') => {
  try {
    const response = await fetch(`${API_ADDRESS}${endpoint}`, {
      method: method,
      headers: {
        Authorization: localStorage.getItem('resToken'),
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    const result = await response.json();

    setStateFunc(result);
  } catch (error) {
    console.log(error);
  }
};

export default fetchApi;
