/**
 * Vegora Bites - Feed Page Logic
 * Handles feed rendering, voting, filtering, pagination, post creation
 */

// State
let currentSort = 'new';
let currentCategory = '';
let currentSearch = '';
let currentPage = 1;
let hasMore = false;
let isLoading = false;

// Init
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initNav();
  initHamburger();
  initSortTabs();
  initCategoryTabs();
  initSearch();
  initLoadMore();
  initImageUpload();
  loadFeed();
});

// ============================
// Dark Mode
// ============================
function initDarkMode() {
  const dm = localStorage.getItem('darkMode');
  if (dm === 'true') document.body.classList.add('dark-mode');
  const toggle = document.getElementById('darkModeToggle');
  if (toggle) {
    if (dm === 'true') toggle.textContent = '☀️';
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
      toggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });
  }
}

// ============================
// Navigation Auth State
// ============================
function initNav() {
  const navRight = document.getElementById('navRight');
  if (!navRight) return;

  if (API.isLoggedIn()) {
    const user = API.getUser();
    const avatarContent = user.avatar_url
      ? `<img src="${API.BASE_URL}${user.avatar_url}" alt="${user.display_name}">`
      : '🌱';

    navRight.innerHTML = `
      <div class="nav-user-menu">
        <div class="nav-user-avatar" id="navAvatarBtn">${avatarContent}</div>
        <span class="nav-username" id="navUsernameBtn">${user.display_name}</span>
        <div class="nav-user-dropdown" id="navUserDropdown">
          <a href="profile.html?user=${user.username}">My Profile</a>
          <button class="logout-btn" onclick="API.logout()">Log Out</button>
        </div>
      </div>
    `;

    // Toggle dropdown
    const avatarBtn = document.getElementById('navAvatarBtn');
    const usernameBtn = document.getElementById('navUsernameBtn');
    const dropdown = document.getElementById('navUserDropdown');

    [avatarBtn, usernameBtn].forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
      });
    });

    document.addEventListener('click', () => dropdown.classList.remove('show'));

    // Show create post bar
    const createPostBar = document.getElementById('createPostBar');
    if (createPostBar) createPostBar.style.display = 'flex';
    const sidebarCreateBtn = document.getElementById('sidebarCreateBtn');
    if (sidebarCreateBtn) sidebarCreateBtn.style.display = 'block';
  } else {
    navRight.innerHTML = `
      <div class="nav-auth-buttons">
        <a href="login.html" class="nav-auth-btn nav-login-btn">Log In</a>
        <a href="register.html" class="nav-auth-btn nav-register-btn">Sign Up</a>
      </div>
    `;
  }
}

// ============================
// Hamburger Menu
// ============================
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }
}

// ============================
// Sort & Filter
// ============================
function initSortTabs() {
  document.querySelectorAll('.sort-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.sort-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentSort = tab.dataset.sort;
      currentPage = 1;
      clearFeed();
      loadFeed();
    });
  });
}

function initCategoryTabs() {
  document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      currentPage = 1;
      clearFeed();
      loadFeed();
    });
  });
}

function initSearch() {
  const input = document.getElementById('searchInput');
  const btn = document.getElementById('searchBtn');

  btn.addEventListener('click', () => {
    currentSearch = input.value.trim();
    currentPage = 1;
    clearFeed();
    loadFeed();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      currentSearch = input.value.trim();
      currentPage = 1;
      clearFeed();
      loadFeed();
    }
  });
}

function initLoadMore() {
  document.getElementById('loadMoreBtn').addEventListener('click', () => {
    currentPage++;
    loadFeed(true);
  });
}

// ============================
// Feed Loading
// ============================
function clearFeed() {
  const container = document.getElementById('feedContainer');
  container.innerHTML = `
    <div class="loading-spinner" id="feedLoading">
      <div class="spinner"></div>
      <p>Loading posts...</p>
    </div>
  `;
}

async function loadFeed(append = false) {
  if (isLoading) return;
  isLoading = true;

  const loadingEl = document.getElementById('feedLoading');
  const container = document.getElementById('feedContainer');
  const loadMoreContainer = document.getElementById('loadMoreContainer');

  if (!append && loadingEl) loadingEl.style.display = 'block';

  try {
    const params = {
      page: currentPage,
      per_page: 20,
      sort: currentSort
    };
    if (currentCategory) params.category = currentCategory;
    if (currentSearch) params.search = currentSearch;

    const data = await API.getPosts(params);

    if (loadingEl) loadingEl.style.display = 'none';

    // Update sidebar stats
    document.getElementById('totalPosts').textContent = data.total;

    if (data.posts.length === 0 && !append) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🌿</div>
          <h3>No posts yet</h3>
          <p>${currentSearch ? 'No posts match your search.' : 'Be the first to share something!'}</p>
        </div>
      `;
      loadMoreContainer.style.display = 'none';
      return;
    }

    const postsHTML = data.posts.map(post => renderPostCard(post)).join('');

    if (append) {
      container.insertAdjacentHTML('beforeend', postsHTML);
    } else {
      container.innerHTML = postsHTML;
    }

    hasMore = data.has_more;
    loadMoreContainer.style.display = hasMore ? 'block' : 'none';

  } catch (err) {
    if (loadingEl) loadingEl.style.display = 'none';
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <h3>Could not load posts</h3>
        <p>${err.message}. Make sure the backend server is running.</p>
      </div>
    `;
  } finally {
    isLoading = false;
  }
}

// ============================
// Render Post Card
// ============================
function renderPostCard(post) {
  const score = post.upvotes - post.downvotes;
  const upClass = post.user_vote === 1 ? 'upvoted' : '';
  const downClass = post.user_vote === -1 ? 'downvoted' : '';
  const timeAgo = relativeTime(post.created_at);
  const badgeClass = `badge-${post.category}`;
  const categoryLabel = post.category.charAt(0).toUpperCase() + post.category.slice(1);

  let imageHTML = '';
  if (post.image_url) {
    imageHTML = `<img src="${API.BASE_URL}${post.image_url}" alt="" class="post-image-preview" loading="lazy" onclick="window.location.href='post.html?id=${post.id}'">`;
  }

  const contentPreview = post.content.length > 300
    ? post.content.substring(0, 300) + '...'
    : post.content;

  return `
    <div class="post-card" data-post-id="${post.id}">
      <div class="vote-column">
        <button class="vote-btn ${upClass}" onclick="vote(${post.id}, 1, this)" aria-label="Upvote">▲</button>
        <span class="vote-score">${score}</span>
        <button class="vote-btn ${downClass}" onclick="vote(${post.id}, -1, this)" aria-label="Downvote">▼</button>
      </div>
      <div class="post-body">
        <div class="post-meta">
          <span class="post-category-badge ${badgeClass}">${categoryLabel}</span>
          <span>Posted by</span>
          <a class="post-author-link" href="profile.html?user=${post.author.username}">${post.author.display_name}</a>
          <span class="post-time">${timeAgo}</span>
        </div>
        <h3 class="post-title" onclick="window.location.href='post.html?id=${post.id}'">${escapeHTML(post.title)}</h3>
        <p class="post-content-preview">${escapeHTML(contentPreview)}</p>
        ${imageHTML}
        <div class="post-actions">
          <button class="post-action-btn" onclick="window.location.href='post.html?id=${post.id}'">
            💬 ${post.comment_count} Comment${post.comment_count !== 1 ? 's' : ''}
          </button>
          <button class="post-action-btn" onclick="sharePost(${post.id})">📤 Share</button>
        </div>
      </div>
    </div>
  `;
}

// ============================
// Voting
// ============================
async function vote(postId, value, btn) {
  if (!API.isLoggedIn()) {
    showToast('Please log in to vote', 'error');
    return;
  }

  const card = btn.closest('.post-card') || btn.closest('.post-detail-main');
  const voteColumn = card.querySelector('.vote-column') || card.querySelector('.post-detail-vote');
  const upBtn = voteColumn.querySelector('.vote-btn:first-child');
  const downBtn = voteColumn.querySelector('.vote-btn:last-child');
  const scoreEl = voteColumn.querySelector('.vote-score');

  // Determine new vote value (toggle off if same)
  let newValue = value;
  if ((value === 1 && upBtn.classList.contains('upvoted')) ||
      (value === -1 && downBtn.classList.contains('downvoted'))) {
    newValue = 0;
  }

  try {
    const updatedPost = await API.votePost(postId, newValue);
    const newScore = updatedPost.upvotes - updatedPost.downvotes;
    scoreEl.textContent = newScore;

    upBtn.classList.toggle('upvoted', updatedPost.user_vote === 1);
    downBtn.classList.toggle('downvoted', updatedPost.user_vote === -1);
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ============================
// Create Post Modal
// ============================
function openCreatePostModal() {
  if (!API.isLoggedIn()) {
    window.location.href = 'login.html';
    return;
  }
  document.getElementById('createPostModal').classList.add('active');
}

function closeCreatePostModal() {
  document.getElementById('createPostModal').classList.remove('active');
  document.getElementById('createPostForm').reset();
  removeImage();
  document.getElementById('createPostError').textContent = '';
}

async function submitPost() {
  const title = document.getElementById('postTitle').value.trim();
  const content = document.getElementById('postContent').value.trim();
  const category = document.getElementById('postCategory').value;
  const imageInput = document.getElementById('postImage');
  const imageFile = imageInput.files[0] || null;
  const errorEl = document.getElementById('createPostError');
  const submitBtn = document.getElementById('submitPostBtn');

  if (!title || !content) {
    errorEl.textContent = 'Title and content are required';
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Posting...';
  errorEl.textContent = '';

  try {
    await API.createPost(title, content, category, imageFile);
    closeCreatePostModal();
    showToast('Post created!', 'success');
    currentPage = 1;
    clearFeed();
    loadFeed();
  } catch (err) {
    errorEl.textContent = err.message;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Post';
  }
}

// ============================
// Image Upload
// ============================
function initImageUpload() {
  const area = document.getElementById('imageUploadArea');
  if (!area) return;

  area.addEventListener('dragover', (e) => {
    e.preventDefault();
    area.style.borderColor = '#2d8a4e';
  });

  area.addEventListener('dragleave', () => {
    area.style.borderColor = '';
  });

  area.addEventListener('drop', (e) => {
    e.preventDefault();
    area.style.borderColor = '';
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const input = document.getElementById('postImage');
      const dt = new DataTransfer();
      dt.items.add(file);
      input.files = dt.files;
      previewImage(input);
    }
  });
}

function previewImage(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById('imagePreviewImg').src = e.target.result;
    document.getElementById('imagePreviewContainer').classList.add('active');
    document.getElementById('imageUploadPrompt').style.display = 'none';
    document.getElementById('imageUploadArea').classList.add('has-image');
  };
  reader.readAsDataURL(file);
}

function removeImage(e) {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }
  document.getElementById('postImage').value = '';
  document.getElementById('imagePreviewContainer').classList.remove('active');
  document.getElementById('imageUploadPrompt').style.display = 'block';
  document.getElementById('imageUploadArea').classList.remove('has-image');
}

// ============================
// Share
// ============================
function sharePost(postId) {
  const url = `${window.location.origin}/post.html?id=${postId}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url);
    showToast('Link copied!', 'success');
  }
}

// ============================
// Utilities
// ============================
function relativeTime(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
  return `${Math.floor(diff / 31536000)}y ago`;
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('socialToast');
  toast.textContent = message;
  toast.className = `social-toast ${type} show`;
  setTimeout(() => toast.classList.remove('show'), 3000);
}
