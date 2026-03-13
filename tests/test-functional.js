/**
 * Functional Tests
 * Validates all acceptance criteria from requirements document
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    passed++;
    console.log(`  PASS: ${testName}`);
  } else {
    failed++;
    console.log(`  FAIL: ${testName}`);
  }
}

const root = path.join(__dirname, '..');

// ============================
// FR-001: navRight in index.html navbar
// ============================
console.log('\n--- FR-001: navRight in index.html navbar ---');
const indexHTML = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const indexDom = new JSDOM(indexHTML);
const indexDoc = indexDom.window.document;

const navRight = indexDoc.getElementById('navRight');
assert(navRight !== null, 'FR-001: #navRight element exists in index.html');

const navbar = indexDoc.getElementById('navbar');
assert(navbar !== null && navbar.contains(navRight), 'FR-001: #navRight is inside the navbar');

// ============================
// FR-002: Log In and Sign Up buttons when logged out
// ============================
console.log('\n--- FR-002: Auth buttons when logged out ---');
// Simulate logged-out state by running nav.js in a DOM context
const navJS = fs.readFileSync(path.join(root, 'js', 'nav.js'), 'utf8');
const apiJS = fs.readFileSync(path.join(root, 'js', 'api.js'), 'utf8');

const dom2 = new JSDOM(`
  <!DOCTYPE html>
  <html><body>
    <div id="navRight"></div>
    <script>${apiJS}</script>
    <script>${navJS}</script>
    <script>initNav();</script>
  </body></html>
`, { url: 'http://localhost/index.html', runScripts: 'dangerously' });

const navRightEl = dom2.window.document.getElementById('navRight');
assert(navRightEl.innerHTML.includes('Log In'), 'FR-002: "Log In" button shown when logged out');
assert(navRightEl.innerHTML.includes('Sign Up'), 'FR-002: "Sign Up" button shown when logged out');
assert(navRightEl.innerHTML.includes('nav-login-btn'), 'FR-002: Login button has correct CSS class');
assert(navRightEl.innerHTML.includes('nav-register-btn'), 'FR-002: Sign Up button has correct CSS class');
assert(navRightEl.innerHTML.includes('nav-auth-buttons'), 'FR-002: Auth buttons wrapper has correct class');

// ============================
// FR-003: Avatar/dropdown when logged in
// ============================
console.log('\n--- FR-003: Avatar/dropdown when logged in ---');
const dom3 = new JSDOM(`
  <!DOCTYPE html>
  <html><body>
    <div id="navRight"></div>
    <script>
      // Pre-set localStorage before API module loads
      localStorage.setItem('vegora_token', 'fake-token-123');
      localStorage.setItem('vegora_user', JSON.stringify({
        id: 1,
        username: 'testuser',
        display_name: 'Test User',
        avatar_url: null
      }));
    </script>
    <script>${apiJS}</script>
    <script>${navJS}</script>
    <script>initNav();</script>
  </body></html>
`, { url: 'http://localhost/index.html', runScripts: 'dangerously', resources: 'usable' });

const navRight3 = dom3.window.document.getElementById('navRight');
assert(navRight3.innerHTML.includes('nav-user-menu'), 'FR-003: User menu shown when logged in');
assert(navRight3.innerHTML.includes('Test User'), 'FR-003: Display name shown');
assert(navRight3.innerHTML.includes('My Profile'), 'FR-003: "My Profile" link in dropdown');
assert(navRight3.innerHTML.includes('Log Out'), 'FR-003: "Log Out" button in dropdown');
assert(navRight3.innerHTML.includes('nav-user-avatar'), 'FR-003: Avatar element present');
assert(navRight3.innerHTML.includes('\uD83C\uDF31'), 'FR-003: Fallback emoji avatar when no avatar_url');

// ============================
// FR-004: Single source of truth
// ============================
console.log('\n--- FR-004: Single source of initNav ---');
const feedJS = fs.readFileSync(path.join(root, 'js', 'feed.js'), 'utf8');
const profileJS = fs.readFileSync(path.join(root, 'js', 'profile.js'), 'utf8');
const postJS = fs.readFileSync(path.join(root, 'js', 'post.js'), 'utf8');

const navCount = [navJS, feedJS, profileJS, postJS].filter(f => f.includes('function initNav()')).length;
assert(navCount === 1, 'FR-004: initNav() defined in exactly one file (nav.js)');
assert(navJS.includes('function initNav()'), 'FR-004: initNav() is in nav.js');

// ============================
// FR-005: Mobile hamburger includes auth
// ============================
console.log('\n--- FR-005: Mobile auth buttons ---');
const stylesCSS = fs.readFileSync(path.join(root, 'css', 'styles.css'), 'utf8');
assert(stylesCSS.includes('.nav-right'), 'FR-005: nav-right CSS styles exist for homepage');
assert(stylesCSS.includes('@media') && stylesCSS.includes('.nav-right'), 'FR-005: Responsive CSS for nav-right');

// ============================
// FR-006: Login redirect parameter
// ============================
console.log('\n--- FR-006: Login redirect ---');
assert(navRightEl.innerHTML.includes('login.html?redirect='), 'FR-006: Login link includes redirect parameter');
assert(navRightEl.innerHTML.includes('redirect=index.html'), 'FR-006: Login from homepage redirects back to index.html');

const authJSContent = fs.readFileSync(path.join(root, 'js', 'auth.js'), 'utf8');
assert(authJSContent.includes("params.get('redirect')"), 'FR-006: auth.js reads redirect param');
assert(authJSContent.includes('window.location.href = redirectTo'), 'FR-006: auth.js uses redirect destination');

// ============================
// FR-007: CSS styles loaded
// ============================
console.log('\n--- FR-007: Auth CSS available on homepage ---');
assert(indexHTML.includes('css/social.css'), 'FR-007: social.css linked in index.html');
const socialCSS = fs.readFileSync(path.join(root, 'css', 'social.css'), 'utf8');
assert(socialCSS.includes('.nav-auth-buttons'), 'FR-007: nav-auth-buttons style exists');
assert(socialCSS.includes('.nav-login-btn'), 'FR-007: nav-login-btn style exists');

// ============================
// Edge Cases
// ============================
console.log('\n--- Edge Cases ---');

// Test with avatar_url present
const dom4 = new JSDOM(`
  <!DOCTYPE html>
  <html><body>
    <div id="navRight"></div>
    <script>
      localStorage.setItem('vegora_token', 'token');
      localStorage.setItem('vegora_user', JSON.stringify({
        id: 2, username: 'photouser', display_name: 'Photo User',
        avatar_url: '/uploads/avatars/photo.jpg'
      }));
    </script>
    <script>${apiJS}</script>
    <script>${navJS}</script>
    <script>initNav();</script>
  </body></html>
`, { url: 'http://localhost/index.html', runScripts: 'dangerously' });
const navRight4 = dom4.window.document.getElementById('navRight');
assert(navRight4.innerHTML.includes('<img src='), 'Edge: Avatar image rendered when avatar_url exists');
assert(navRight4.innerHTML.includes('/uploads/avatars/photo.jpg'), 'Edge: Correct avatar URL used');

// Test XSS in display name
const dom5 = new JSDOM(`
  <!DOCTYPE html>
  <html><body>
    <div id="navRight"></div>
    <script>
      localStorage.setItem('vegora_token', 'token');
      localStorage.setItem('vegora_user', JSON.stringify({
        id: 3, username: 'xssuser', display_name: '<script>alert("xss")<\\/script>',
        avatar_url: null
      }));
    </script>
    <script>${apiJS}</script>
    <script>${navJS}</script>
    <script>initNav();</script>
  </body></html>
`, { url: 'http://localhost/index.html', runScripts: 'dangerously' });
const navRight5 = dom5.window.document.getElementById('navRight');
assert(!navRight5.innerHTML.includes('<script>alert'), 'Edge: XSS in display name is escaped');

// Summary
console.log(`\nFunctional Testing: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
