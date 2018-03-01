const API_ID = process.env.REACT_APP_API_ID;
const APP_KEY = process.env.REACT_APP_API_KEY;

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

// TODO: store api url in constant
export function fetchCategories() {
  return fetch(`http://localhost:3001/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);
}
