/**
 * Vegora Bites - Shared Navigation Module
 * Handles auth-aware navbar rendering across all pages.
 * Single source of truth for initNav(), initDarkMode(), initHamburger()
 */

// ============================
// Dark Mode (shared)
// ============================
function initDarkMode() {
  var dm = localStorage.getItem('darkMode');
  if (dm === 'true') document.body.classList.add('dark-mode');
  var toggle = document.getElementById('darkModeToggle');
  if (toggle) {
    if (dm === 'true') toggle.textContent = '\u2600\uFE0F';
    toggle.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
      toggle.textContent = document.body.classList.contains('dark-mode') ? '\u2600\uFE0F' : '\uD83C\uDF19';
    });
  }
}

// ============================
// Navigation Auth State (shared)
// ============================
function initNav() {
  var navRight = document.getElementById('navRight');
  if (!navRight) return;

  if (typeof API !== 'undefined' && API.isLoggedIn()) {
    var user = API.getUser();
    var avatarContent = user.avatar_url
      ? '<img src="' + API.BASE_URL + user.avatar_url + '" alt="' + _escapeAttr(user.display_name) + '">'
      : '\uD83C\uDF31';

    navRight.innerHTML =
      '<div class="nav-user-menu">' +
        '<div class="nav-user-avatar" id="navAvatarBtn">' + avatarContent + '</div>' +
        '<span class="nav-username" id="navUsernameBtn">' + _escapeNavHTML(user.display_name) + '</span>' +
        '<div class="nav-user-dropdown" id="navUserDropdown">' +
          '<a href="profile.html?user=' + encodeURIComponent(user.username) + '">My Profile</a>' +
          '<button class="logout-btn" id="navLogoutBtn">Log Out</button>' +
        '</div>' +
      '</div>';

    // Bind logout
    var logoutBtn = document.getElementById('navLogoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        API.logout();
      });
    }

    // Toggle dropdown
    var avatarBtn = document.getElementById('navAvatarBtn');
    var usernameBtn = document.getElementById('navUsernameBtn');
    var dropdown = document.getElementById('navUserDropdown');

    [avatarBtn, usernameBtn].forEach(function (el) {
      if (el) {
        el.addEventListener('click', function (e) {
          e.stopPropagation();
          dropdown.classList.toggle('show');
        });
      }
    });

    document.addEventListener('click', function () {
      if (dropdown) dropdown.classList.remove('show');
    });

    // Show create post bar if it exists (community page)
    var createPostBar = document.getElementById('createPostBar');
    if (createPostBar) createPostBar.style.display = 'flex';
    var sidebarCreateBtn = document.getElementById('sidebarCreateBtn');
    if (sidebarCreateBtn) sidebarCreateBtn.style.display = 'block';
  } else {
    // Build login URL with redirect parameter
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var loginHref = 'login.html';
    if (currentPage && currentPage !== 'login.html' && currentPage !== 'register.html') {
      loginHref = 'login.html?redirect=' + encodeURIComponent(currentPage + window.location.search);
    }

    navRight.innerHTML =
      '<div class="nav-auth-buttons">' +
        '<a href="' + loginHref + '" class="nav-auth-btn nav-login-btn">Log In</a>' +
        '<a href="register.html" class="nav-auth-btn nav-register-btn">Sign Up</a>' +
      '</div>';
  }
}

// ============================
// Hamburger Menu (shared)
// ============================
function initHamburger() {
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks') || document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }
}

// ============================
// Internal helpers
// ============================
function _escapeNavHTML(str) {
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function _escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
