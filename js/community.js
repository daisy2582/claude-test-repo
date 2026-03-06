// ===== Configuration =====
const API_BASE = '/api';

// ===== State =====
let currentUser = null;
let authToken = null;
let currentPage = 1;
let currentSort = 'new';
let currentCategory = '';
let currentSearch = '';
let hasMore = false;
let currentPostId = null;

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  loadAuthState();
  setupDarkMode();
  setupNavigation();
  setupAuthModal();
  setupCreatePostModal();
  setupSidebar();
  setupSortButtons();
  setupSearch();
  loadPosts();
});

// ===== Auth State =====
function loadAuthState() {
  const saved = localStorage.getItem('vegora_auth');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      authToken = data.token;
      currentUser = data.user;
      updateAuthUI();
    } catch (e) {
      localStorage.removeItem('vegora_auth');
    }
  }
}

function saveAuthState() {
  if (authToken && currentUser) {
    localStorage.setItem('vegora_auth', JSON.stringify({ token: authToken, user: currentUser }));
  } else {
    localStorage.removeItem('vegora_auth');
  }
}

function updateAuthUI() {
  const authBtns = document.getElementById('navAuth');
  const userNav = document.getElementById('navUser');
  const createPrompt = document.getElementById('createPostPrompt');

  if (currentUser) {
    authBtns.style.display = 'none';
    userNav.style.display = 'flex';
    createPrompt.style.display = 'flex';
    document.getElementById('userNameNav').textContent = currentUser.display_name;
    document.getElementById('commentForm').style.display = 'block';
  } else {
    authBtns.style.display = 'flex';
    userNav.style.display = 'none';
    createPrompt.style.display = 'none';
    document.getElementById('commentForm').style.display = 'none';
  }
}

// ===== API Helpers =====
async function api(endpoint, options = {}) {
  const headers = { ...options.headers };
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Something went wrong' }));
      throw new Error(err.detail || `Error ${res.status}`);
    }
    if (res.status === 204) return null;
    return await res.json();
  } catch (e) {
    if (e.message === 'Failed to fetch') {
      throw new Error('Cannot connect to server. Make sure the backend is running.');
    }
    throw e;
  }
}

// ===== Dark Mode =====
function setupDarkMode() {
  const toggle = document.getElementById('darkModeToggle');
  const saved = localStorage.getItem('vegora_theme');
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? '' : 'dark');
    localStorage.setItem('vegora_theme', isDark ? 'light' : 'dark');
    toggle.textContent = isDark ? '🌙' : '☀️';
  });
}

// ===== Navigation =====
function setupNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // User dropdown
  const menuBtn = document.getElementById('userMenuBtn');
  const dropdown = document.getElementById('userDropdown');
  menuBtn.addEventListener('click', () => {
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  });

  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });

  document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    currentUser = null;
    authToken = null;
    saveAuthState();
    updateAuthUI();
    showToast('Logged out successfully');
    dropdown.style.display = 'none';
  });
}

// ===== Auth Modal =====
function setupAuthModal() {
  const modal = document.getElementById('authModal');
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const closeBtn = document.getElementById('authModalClose');
  const tabs = document.querySelectorAll('.auth-tab');

  function openAuth(tab) {
    modal.style.display = 'flex';
    switchAuthTab(tab);
  }

  loginBtn.addEventListener('click', () => openAuth('login'));
  signupBtn.addEventListener('click', () => openAuth('signup'));
  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchAuthTab(tab.dataset.tab));
  });

  function switchAuthTab(tabName) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
    document.getElementById('loginForm').style.display = tabName === 'login' ? 'block' : 'none';
    document.getElementById('signupForm').style.display = tabName === 'signup' ? 'block' : 'none';
  }

  // Login
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const errEl = document.getElementById('loginError');
    errEl.textContent = '';
    try {
      const data = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          username: document.getElementById('loginUsername').value,
          password: document.getElementById('loginPassword').value,
        }),
      });
      authToken = data.access_token;
      currentUser = data.user;
      saveAuthState();
      updateAuthUI();
      modal.style.display = 'none';
      showToast(`Welcome back, ${currentUser.display_name}!`);
      loadPosts();
    } catch (err) {
      errEl.textContent = err.message;
    }
  });

  // Signup
  document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const errEl = document.getElementById('signupError');
    errEl.textContent = '';
    try {
      const data = await api('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          display_name: document.getElementById('signupDisplayName').value,
          username: document.getElementById('signupUsername').value,
          email: document.getElementById('signupEmail').value,
          password: document.getElementById('signupPassword').value,
        }),
      });
      authToken = data.access_token;
      currentUser = data.user;
      saveAuthState();
      updateAuthUI();
      modal.style.display = 'none';
      showToast(`Welcome to the community, ${currentUser.display_name}!`);
      loadPosts();
    } catch (err) {
      errEl.textContent = err.message;
    }
  });
}

// ===== Create Post Modal =====
function setupCreatePostModal() {
  const modal = document.getElementById('createPostModal');
  const openBtn = document.getElementById('openCreatePost');
  const closeBtn = document.getElementById('createPostClose');
  const imageInput = document.getElementById('postImage');
  const uploadArea = document.getElementById('imageUploadArea');
  const preview = document.getElementById('imagePreview');
  const placeholder = document.getElementById('uploadPlaceholder');
  const removeBtn = document.getElementById('removeImage');

  openBtn.addEventListener('click', () => modal.style.display = 'flex');
  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

  // Image upload
  uploadArea.addEventListener('click', () => imageInput.click());
  uploadArea.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('drag-over'); });
  uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('drag-over'));
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    if (e.dataTransfer.files.length) {
      imageInput.files = e.dataTransfer.files;
      showImagePreview(e.dataTransfer.files[0]);
    }
  });

  imageInput.addEventListener('change', () => {
    if (imageInput.files.length) showImagePreview(imageInput.files[0]);
  });

  removeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    imageInput.value = '';
    preview.style.display = 'none';
    removeBtn.style.display = 'none';
    placeholder.style.display = 'block';
  });

  function showImagePreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
      preview.style.display = 'block';
      removeBtn.style.display = 'flex';
      placeholder.style.display = 'none';
    };
    reader.readAsDataURL(file);
  }

  // Submit
  document.getElementById('createPostForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const errEl = document.getElementById('createPostError');
    errEl.textContent = '';

    const formData = new FormData();
    formData.append('title', document.getElementById('postTitle').value);
    formData.append('content', document.getElementById('postContent').value);
    formData.append('category', document.getElementById('postCategory').value);
    if (imageInput.files.length) {
      formData.append('image', imageInput.files[0]);
    }

    try {
      await api('/posts', { method: 'POST', body: formData });
      modal.style.display = 'none';
      document.getElementById('createPostForm').reset();
      preview.style.display = 'none';
      removeBtn.style.display = 'none';
      placeholder.style.display = 'block';
      showToast('Post created successfully!');
      currentPage = 1;
      loadPosts();
    } catch (err) {
      errEl.textContent = err.message;
    }
  });
}

// ===== Sidebar =====
function setupSidebar() {
  document.querySelectorAll('.sidebar-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sidebar-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      currentPage = 1;
      loadPosts();
    });
  });
}

// ===== Sort =====
function setupSortButtons() {
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSort = btn.dataset.sort;
      currentPage = 1;
      loadPosts();
    });
  });
}

// ===== Search =====
function setupSearch() {
  let timeout;
  document.getElementById('searchInput').addEventListener('input', (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      currentSearch = e.target.value.trim();
      currentPage = 1;
      loadPosts();
    }, 400);
  });
}

// ===== Load Posts =====
async function loadPosts(append = false) {
  const feed = document.getElementById('postsFeed');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  if (!append) {
    feed.innerHTML = '<div class="feed-loading"><div class="spinner"></div><p>Loading posts...</p></div>';
  }

  let params = `?page=${currentPage}&per_page=20&sort=${currentSort}`;
  if (currentCategory) params += `&category=${currentCategory}`;
  if (currentSearch) params += `&search=${encodeURIComponent(currentSearch)}`;

  try {
    const data = await api(`/posts${params}`);
    hasMore = data.has_more;
    loadMoreBtn.style.display = hasMore ? 'block' : 'none';

    // Update stats
    document.getElementById('totalPosts').textContent = data.total;

    if (!append) feed.innerHTML = '';

    if (data.posts.length === 0 && !append) {
      feed.innerHTML = `
        <div class="feed-empty">
          <h3>No posts yet</h3>
          <p>${currentUser ? 'Be the first to share something!' : 'Log in and start the conversation!'}</p>
        </div>`;
      return;
    }

    data.posts.forEach(post => {
      feed.appendChild(createPostCard(post));
    });

    loadMoreBtn.onclick = () => {
      currentPage++;
      loadPosts(true);
    };
  } catch (err) {
    if (!append) {
      feed.innerHTML = `
        <div class="feed-empty">
          <h3>Could not load posts</h3>
          <p>${err.message}</p>
        </div>`;
    }
    showToast(err.message);
  }
}

// ===== Create Post Card =====
function createPostCard(post) {
  const card = document.createElement('div');
  card.className = 'post-card';

  const score = post.upvotes - post.downvotes;
  const timeAgo = formatTimeAgo(post.created_at);
  const categoryEmojis = {
    recipe: '🍳', tip: '💡', journey: '🌱', progress: '📈', discussion: '💬', news: '📰'
  };

  card.innerHTML = `
    <div class="post-card-inner">
      <div class="vote-column">
        <button class="vote-btn upvote ${post.user_vote === 1 ? 'upvoted' : ''}" data-post-id="${post.id}" data-value="1" title="Upvote">▲</button>
        <span class="vote-score">${score}</span>
        <button class="vote-btn downvote ${post.user_vote === -1 ? 'downvoted' : ''}" data-post-id="${post.id}" data-value="-1" title="Downvote">▼</button>
      </div>
      <div class="post-body" data-post-id="${post.id}">
        <div class="post-meta">
          <span class="post-category-badge" data-cat="${post.category}">${categoryEmojis[post.category] || ''} ${post.category}</span>
          ${post.is_pinned ? '<span class="pinned-badge">📌 PINNED</span>' : ''}
          <span>Posted by</span>
          <span class="post-author" data-username="${post.author.username}">${post.author.display_name}</span>
          <span>· ${timeAgo}</span>
        </div>
        <h3 class="post-title">${escapeHtml(post.title)}</h3>
        <p class="post-preview">${escapeHtml(post.content)}</p>
        ${post.image_url ? `<img src="${post.image_url}" class="post-image-thumb" alt="Post image" loading="lazy">` : ''}
        <div class="post-actions">
          <button class="post-action-btn" data-post-id="${post.id}">💬 ${post.comment_count} Comments</button>
          <button class="post-action-btn share-btn" data-title="${escapeHtml(post.title)}">📤 Share</button>
          ${currentUser && post.author.id === currentUser.id ? `<button class="post-action-btn delete-btn" data-post-id="${post.id}">🗑️ Delete</button>` : ''}
        </div>
      </div>
    </div>`;

  // Event listeners
  card.querySelectorAll('.vote-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleVote(parseInt(btn.dataset.postId), parseInt(btn.dataset.value));
    });
  });

  card.querySelector('.post-body').addEventListener('click', (e) => {
    if (e.target.closest('.post-action-btn') || e.target.closest('.post-author')) return;
    openPostDetail(post.id);
  });

  card.querySelector('.post-actions .post-action-btn[data-post-id]')?.addEventListener('click', (e) => {
    e.stopPropagation();
    openPostDetail(post.id);
  });

  card.querySelector('.share-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.origin + `/community.html?post=${post.id}`);
    showToast('Link copied to clipboard!');
  });

  card.querySelector('.delete-btn')?.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (confirm('Delete this post?')) {
      try {
        await api(`/posts/${post.id}`, { method: 'DELETE' });
        card.remove();
        showToast('Post deleted');
      } catch (err) { showToast(err.message); }
    }
  });

  return card;
}

// ===== Vote =====
async function handleVote(postId, value) {
  if (!currentUser) {
    document.getElementById('authModal').style.display = 'flex';
    return;
  }

  try {
    const post = await api(`/posts/${postId}/vote`, {
      method: 'POST',
      body: JSON.stringify({ value }),
    });

    // Update the card in the feed
    const card = document.querySelector(`.vote-btn[data-post-id="${postId}"]`)?.closest('.post-card');
    if (card) {
      const score = post.upvotes - post.downvotes;
      card.querySelector('.vote-score').textContent = score;
      const upBtn = card.querySelector('.vote-btn.upvote');
      const downBtn = card.querySelector('.vote-btn.downvote');
      upBtn.classList.toggle('upvoted', post.user_vote === 1);
      downBtn.classList.toggle('downvoted', post.user_vote === -1);
    }
  } catch (err) {
    showToast(err.message);
  }
}

// ===== Post Detail =====
async function openPostDetail(postId) {
  const modal = document.getElementById('postDetailModal');
  const content = document.getElementById('postDetailContent');
  const closeBtn = document.getElementById('postDetailClose');
  currentPostId = postId;

  modal.style.display = 'flex';
  content.innerHTML = '<div class="feed-loading"><div class="spinner"></div></div>';

  closeBtn.onclick = () => modal.style.display = 'none';
  modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

  try {
    const post = await api(`/posts/${postId}`);
    const score = post.upvotes - post.downvotes;
    const timeAgo = formatTimeAgo(post.created_at);
    const categoryEmojis = {
      recipe: '🍳', tip: '💡', journey: '🌱', progress: '📈', discussion: '💬', news: '📰'
    };

    content.innerHTML = `
      <div class="detail-header">
        <div class="detail-meta">
          <span class="post-category-badge" data-cat="${post.category}">${categoryEmojis[post.category] || ''} ${post.category}</span>
          <span>Posted by <strong>${escapeHtml(post.author.display_name)}</strong></span>
          <span>· ${timeAgo}</span>
        </div>
        <h2 class="detail-title">${escapeHtml(post.title)}</h2>
      </div>
      <div class="detail-content">${escapeHtml(post.content)}</div>
      ${post.image_url ? `<img src="${post.image_url}" class="detail-image" alt="Post image">` : ''}
      <div class="detail-votes">
        <button class="vote-btn upvote ${post.user_vote === 1 ? 'upvoted' : ''}" id="detailUpvote">▲</button>
        <span class="vote-score" id="detailScore">${score}</span>
        <button class="vote-btn downvote ${post.user_vote === -1 ? 'downvoted' : ''}" id="detailDownvote">▼</button>
        <span style="margin-left:8px;color:var(--text-muted);font-size:0.85rem;">${post.upvotes} upvotes · ${post.downvotes} downvotes</span>
      </div>`;

    document.getElementById('detailUpvote').onclick = () => handleDetailVote(postId, 1);
    document.getElementById('detailDownvote').onclick = () => handleDetailVote(postId, -1);

    loadComments(postId);
  } catch (err) {
    content.innerHTML = `<p style="color:var(--danger);">${err.message}</p>`;
  }
}

async function handleDetailVote(postId, value) {
  if (!currentUser) {
    document.getElementById('authModal').style.display = 'flex';
    return;
  }
  try {
    const post = await api(`/posts/${postId}/vote`, {
      method: 'POST',
      body: JSON.stringify({ value }),
    });
    document.getElementById('detailScore').textContent = post.upvotes - post.downvotes;
    document.getElementById('detailUpvote').classList.toggle('upvoted', post.user_vote === 1);
    document.getElementById('detailDownvote').classList.toggle('downvoted', post.user_vote === -1);
  } catch (err) { showToast(err.message); }
}

// ===== Comments =====
async function loadComments(postId) {
  const list = document.getElementById('commentsList');
  list.innerHTML = '<div class="feed-loading"><div class="spinner"></div></div>';

  // Setup comment form
  const form = document.getElementById('commentForm');
  form.style.display = currentUser ? 'block' : 'none';
  form.onsubmit = async (e) => {
    e.preventDefault();
    const input = document.getElementById('commentInput');
    if (!input.value.trim()) return;
    try {
      await api(`/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content: input.value.trim() }),
      });
      input.value = '';
      loadComments(postId);
      showToast('Comment added!');
    } catch (err) { showToast(err.message); }
  };

  try {
    const comments = await api(`/posts/${postId}/comments`);
    if (comments.length === 0) {
      list.innerHTML = '<div class="no-comments">No comments yet. Be the first!</div>';
      return;
    }
    list.innerHTML = '';
    comments.forEach(c => list.appendChild(createCommentEl(c)));
  } catch (err) {
    list.innerHTML = `<p style="color:var(--danger);">${err.message}</p>`;
  }
}

function createCommentEl(comment) {
  const el = document.createElement('div');
  el.className = 'comment-card';
  el.innerHTML = `
    <div class="comment-header">
      <span class="comment-author">${escapeHtml(comment.author.display_name)}</span>
      <span class="comment-time">· ${formatTimeAgo(comment.created_at)}</span>
    </div>
    <div class="comment-body">${escapeHtml(comment.content)}</div>
    ${comment.replies?.length ? '<div class="comment-replies"></div>' : ''}`;

  if (comment.replies?.length) {
    const repliesEl = el.querySelector('.comment-replies');
    comment.replies.forEach(r => repliesEl.appendChild(createCommentEl(r)));
  }
  return el;
}

// ===== Utilities =====
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatTimeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
