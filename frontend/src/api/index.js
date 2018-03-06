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
  console.log('API.fetchAllCategories');
  return fetch(`${API_URL}/categories`, { headers })
    .then(res => {
      console.log('res', res);
      return res.json();
    })
    .then(data => {
      console.log('data', data);
      return data.categories;
    });
};

export const fetchAllPosts = () => {
  return fetch(`${API_URL}/posts`, { headers })
    .then(res => res.json())
    .then(data => {
      console.log('fetchAllPosts', data);
      return data;
    });
};

export const fetchAllComments = postId => {
  return fetch(`${API_URL}/comments`, { headers })
    .then(res => res.json())
    .then(data => {
      console.log('fetchAllComments', data);
      return data;
    });
};
export const fetchPostComments = postId => {
  return fetch(`${API_URL}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => {
      console.log('fetchPostComments', data);
      return data;
    });
};
