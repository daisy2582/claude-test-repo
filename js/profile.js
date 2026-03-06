/**
 * Vegora Bites - Profile Page
 * User profile view with posts
 */

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initNav();
  initHamburger();
  loadProfile();
});

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
  } else {
    navRight.innerHTML = `
      <div class="nav-auth-buttons">
        <a href="login.html" class="nav-auth-btn nav-login-btn">Log In</a>
        <a href="register.html" class="nav-auth-btn nav-register-btn">Sign Up</a>
      </div>
    `;
  }
}

function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }
}

async function loadProfile() {
  const params = new URLSearchParams(window.location.search);
  const username = params.get('user');
  const container = document.getElementById('profileContent');

  if (!username) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🤔</div>
        <h3>No user specified</h3>
        <p><a href="community.html" style="color:#2d8a4e;">Back to community</a></p>
      </div>
    `;
    return;
  }

  try {
    const profile = await API.getUserProfile(username);
    const posts = await API.getUserPosts(username);

    document.title = `${profile.display_name} - Vegora Bites`;

    const avatarContent = profile.avatar_url
      ? `<img src="${API.BASE_URL}${profile.avatar_url}" alt="${profile.display_name}">`
      : profile.display_name.charAt(0).toUpperCase();

    const joinDate = new Date(profile.created_at).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    let postsHTML = '';
    if (posts.length === 0) {
      postsHTML = `
        <div class="empty-state" style="padding:40px;">
          <p style="color:#9ca3af;">No posts yet</p>
        </div>
      `;
    } else {
      postsHTML = posts.map(post => {
        const score = post.upvotes - post.downvotes;
        const timeAgo = relativeTime(post.created_at);
        const badgeClass = `badge-${post.category}`;
        const categoryLabel = post.category.charAt(0).toUpperCase() + post.category.slice(1);

        return `
          <div class="post-card" onclick="window.location.href='post.html?id=${post.id}'" style="cursor:pointer;">
            <div class="vote-column">
              <span class="vote-score" style="font-size:14px;">${score}</span>
              <span style="font-size:11px; color:#9ca3af;">pts</span>
            </div>
            <div class="post-body">
              <div class="post-meta">
                <span class="post-category-badge ${badgeClass}">${categoryLabel}</span>
                <span class="post-time">${timeAgo}</span>
              </div>
              <h3 class="post-title">${escapeHTML(post.title)}</h3>
              <div class="post-actions">
                <span class="post-action-btn">💬 ${post.comment_count} Comments</span>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    container.innerHTML = `
      <div class="profile-header-card">
        <div class="profile-avatar-large">${avatarContent}</div>
        <h1 class="profile-display-name">${escapeHTML(profile.display_name)}</h1>
        <p class="profile-username">@${escapeHTML(profile.username)}</p>
        ${profile.bio ? `<p class="profile-bio">${escapeHTML(profile.bio)}</p>` : ''}
        <div class="profile-stats">
          <div class="profile-stat">
            <span class="profile-stat-num">${profile.total_karma}</span>
            <span class="profile-stat-lbl">Karma</span>
          </div>
          <div class="profile-stat">
            <span class="profile-stat-num">${profile.post_count}</span>
            <span class="profile-stat-lbl">Posts</span>
          </div>
        </div>
        <p class="profile-joined">Joined ${joinDate}</p>
      </div>

      <h2 class="profile-posts-title">Posts by ${escapeHTML(profile.display_name)}</h2>
      ${postsHTML}

      <div style="text-align:center; padding:20px;">
        <a href="community.html" style="color:#2d8a4e; font-weight:600; text-decoration:none;">← Back to Community</a>
      </div>
    `;

  } catch (err) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <h3>Could not load profile</h3>
        <p>${err.message}. <a href="community.html" style="color:#2d8a4e;">Back to community</a></p>
      </div>
    `;
  }
}

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
