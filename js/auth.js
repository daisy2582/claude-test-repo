/**
 * Vegora Bites - Auth Page Handler
 * Login & Register form logic
 */
document.addEventListener('DOMContentLoaded', () => {
  // Determine redirect destination from URL parameter or default to community
  var params = new URLSearchParams(window.location.search);
  var redirectTo = params.get('redirect') || 'community.html';

  // Sanitize redirect: only allow relative paths within the same site
  if (redirectTo.indexOf('//') !== -1 || redirectTo.indexOf(':') !== -1) {
    redirectTo = 'community.html';
  }

  // If already logged in, redirect immediately
  if (API.isLoggedIn()) {
    window.location.href = redirectTo;
    return;
  }

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = loginForm.querySelector('button[type="submit"]');
      const errEl = document.getElementById('loginError');
      errEl.textContent = '';
      btn.disabled = true;
      btn.textContent = 'Logging in...';

      try {
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;
        await API.login(username, password);
        window.location.href = redirectTo;
      } catch (err) {
        errEl.textContent = err.message;
        btn.disabled = false;
        btn.textContent = 'Log In';
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = registerForm.querySelector('button[type="submit"]');
      const errEl = document.getElementById('registerError');
      errEl.textContent = '';

      const username = document.getElementById('regUsername').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const displayName = document.getElementById('regDisplayName').value.trim();
      const password = document.getElementById('regPassword').value;
      const confirmPassword = document.getElementById('regConfirmPassword').value;

      if (password !== confirmPassword) {
        errEl.textContent = 'Passwords do not match';
        return;
      }
      if (password.length < 6) {
        errEl.textContent = 'Password must be at least 6 characters';
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Creating account...';

      try {
        await API.register(username, email, displayName, password);
        window.location.href = redirectTo;
      } catch (err) {
        errEl.textContent = err.message;
        btn.disabled = false;
        btn.textContent = 'Create Account';
      }
    });
  }
});
