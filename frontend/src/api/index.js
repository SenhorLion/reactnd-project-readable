const API_URL = 'http://localhost:3001';

const getToken = () => {
  let token = localStorage.token;
  if (!token) {
    token = localStorage.token = Math.random()
      .toString(36)
      .substr(-8);
  }
  return token;
};

const headers = {
  Accept: 'application/json',
  Authorization: getToken(),
};

export const fetchAllCategories = () => {
  return fetch(`${API_URL}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);
};
