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

export const fetchPostById = postId => {
  return fetch(`${API_URL}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => {
      return data;
    });
};

export const addPost = post =>
  fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify(post),
  })
    .then(response => response.json())
    .catch(response => response.json());

export const upVotePost = (postId, option) =>
  fetch(`${API_URL}/posts/${postId}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ option }),
  })
    .then(res => res.json())
    .catch(res => res.json());

export const downVotePost = (postId, option) =>
  fetch(`${API_URL}/posts/${postId}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ option }),
  })
    .then(res => res.json())
    .catch(res => res.json());

export const upVoteComment = (commentId, option) =>
  fetch(`${API_URL}/comments/${commentId}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ option }),
  })
    .then(res => res.json())
    .catch(res => res.json());

export const downVoteComment = (commentId, option) =>
  fetch(`${API_URL}/comments/${commentId}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ option }),
  })
    .then(res => res.json())
    .catch(res => res.json());

export const deletePost = postId =>
  fetch(`${API_URL}/posts/${postId}`, {
    method: 'DELETE',
    headers,
  })
    .then(response => response.json())
    .catch(response => response.json());

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

export const addComment = comment =>
  fetch(`${API_URL}/comments`, {
    method: 'POST',
    headers,
    body: JSON.stringify(comment),
  })
    .then(res => res.json())
    .catch(res => res.json());

export const deleteComment = commentId =>
  fetch(`${API_URL}/comments/${commentId}`, {
    method: 'DELETE',
    headers,
  })
    .then(res => res.json())
    .catch(res => res.json());

export const editComment = comment =>
  fetch(`${API_URL}/comments/${comment.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(comment),
  })
    .then(res => res.json())
    .catch(res => res.json());

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
