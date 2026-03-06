/**
 * Vegora Bites - API Service Module
 * Handles all backend communication with JWT auth
 */
const API = (() => {
  const BASE_URL = 'http://localhost:8000';
  const TOKEN_KEY = 'vegora_token';
  const USER_KEY = 'vegora_user';

  // Token management
  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  function getUser() {
    const u = localStorage.getItem(USER_KEY);
    return u ? JSON.parse(u) : null;
  }

  function setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  function isLoggedIn() {
    return !!getToken();
  }

  // Fetch wrapper with auth
  async function request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const headers = options.headers || {};

    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(url, { ...options, headers });

    if (res.status === 204) return null;

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const msg = data?.detail || `Request failed (${res.status})`;
      throw new Error(msg);
    }

    return data;
  }

  // Auth endpoints
  async function register(username, email, displayName, password) {
    const data = await request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        display_name: displayName,
        password
      })
    });
    setToken(data.access_token);
    setUser(data.user);
    return data;
  }

  async function login(username, password) {
    const data = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    setToken(data.access_token);
    setUser(data.user);
    return data;
  }

  function logout() {
    removeToken();
    window.location.href = 'community.html';
  }

  async function getMe() {
    return request('/api/auth/me');
  }

  // Posts endpoints
  async function getPosts(params = {}) {
    const q = new URLSearchParams();
    if (params.page) q.set('page', params.page);
    if (params.per_page) q.set('per_page', params.per_page);
    if (params.category) q.set('category', params.category);
    if (params.sort) q.set('sort', params.sort);
    if (params.search) q.set('search', params.search);
    return request(`/api/posts?${q.toString()}`);
  }

  async function getPost(id) {
    return request(`/api/posts/${id}`);
  }

  async function createPost(title, content, category, imageFile) {
    const form = new FormData();
    form.append('title', title);
    form.append('content', content);
    form.append('category', category);
    if (imageFile) form.append('image', imageFile);
    return request('/api/posts', {
      method: 'POST',
      body: form,
      headers: {} // let browser set content-type for FormData
    });
  }

  async function updatePost(id, data) {
    return request(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async function deletePost(id) {
    return request(`/api/posts/${id}`, { method: 'DELETE' });
  }

  async function votePost(id, value) {
    return request(`/api/posts/${id}/vote`, {
      method: 'POST',
      body: JSON.stringify({ value })
    });
  }

  // Comments endpoints
  async function getComments(postId) {
    return request(`/api/posts/${postId}/comments`);
  }

  async function createComment(postId, content, parentId) {
    const body = { content };
    if (parentId) body.parent_id = parentId;
    return request(`/api/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  }

  async function deleteComment(postId, commentId) {
    return request(`/api/posts/${postId}/comments/${commentId}`, { method: 'DELETE' });
  }

  // Users endpoints
  async function getUserProfile(username) {
    return request(`/api/users/${username}`);
  }

  async function getUserPosts(username) {
    return request(`/api/users/${username}/posts`);
  }

  async function updateProfile(data) {
    return request('/api/users/me', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async function uploadAvatar(file) {
    const form = new FormData();
    form.append('avatar', file);
    return request('/api/users/me/avatar', {
      method: 'POST',
      body: form,
      headers: {}
    });
  }

  // Health check
  async function health() {
    return request('/api/health');
  }

  return {
    BASE_URL,
    getToken, setToken, removeToken,
    getUser, setUser,
    isLoggedIn,
    register, login, logout, getMe,
    getPosts, getPost, createPost, updatePost, deletePost, votePost,
    getComments, createComment, deleteComment,
    getUserProfile, getUserPosts, updateProfile, uploadAvatar,
    health
  };
})();
