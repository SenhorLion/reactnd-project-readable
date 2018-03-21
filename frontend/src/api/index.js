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
  'Content-Type': 'application/json',
};

export const fetchAllCategories = () => {
  return fetch(`${API_URL}/categories`, { headers })
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data.categories;
    });
};

export const fetchAllPosts = () => {
  return fetch(`${API_URL}/posts`, { headers })
    .then(res => res.json())
    .then(data => {
      return data;
    });
};

export const saveEditPost = post =>
  fetch(`${API_URL}/posts/${post.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(post),
  })
    .then(response => response.json())
    .catch(response => response.json());

export const fetchPostsByCategory = () => {
  return fetch(`${API_URL}/:category/posts`, { headers })
    .then(res => res.json())
    .then(data => {
      return data;
    });
};

export const fetchAllComments = postId => {
  return fetch(`${API_URL}/comments`, { headers })
    .then(res => res.json())
    .then(data => {
      return data;
    });
};
export const fetchPostComments = postId => {
  return fetch(`${API_URL}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => {
      return data;
    });
};
