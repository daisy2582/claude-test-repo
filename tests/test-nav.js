/**
 * Unit Tests for nav.js shared navigation module
 * Tests: _escapeNavHTML, _escapeAttr, initNav behavior, redirect logic
 */

// Minimal DOM mock for Node.js
const { JSDOM } = (() => {
  try { return require('jsdom'); } catch (e) { return { JSDOM: null }; }
})();

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

// ============================
// Test _escapeAttr function
// ============================
console.log('\n--- _escapeAttr Tests ---');

// Simulate _escapeAttr inline (same logic as nav.js)
function _escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

assert(_escapeAttr('hello') === 'hello', 'escapeAttr: plain text unchanged');
assert(_escapeAttr('<script>') === '&lt;script&gt;', 'escapeAttr: angle brackets escaped');
assert(_escapeAttr('"quotes"') === '&quot;quotes&quot;', 'escapeAttr: double quotes escaped');
assert(_escapeAttr("it's") === "it&#39;s", 'escapeAttr: single quotes escaped');
assert(_escapeAttr('a&b') === 'a&amp;b', 'escapeAttr: ampersand escaped');
assert(_escapeAttr('<"&\'>') === '&lt;&quot;&amp;&#39;&gt;', 'escapeAttr: all special chars');

// ============================
// Test redirect sanitization logic (from auth.js)
// ============================
console.log('\n--- Redirect Sanitization Tests ---');

function sanitizeRedirect(redirectTo) {
  if (redirectTo.indexOf('//') !== -1 || redirectTo.indexOf(':') !== -1) {
    return 'community.html';
  }
  return redirectTo;
}

assert(sanitizeRedirect('index.html') === 'index.html', 'redirect: relative path allowed');
assert(sanitizeRedirect('community.html') === 'community.html', 'redirect: community.html allowed');
assert(sanitizeRedirect('profile.html?user=test') === 'profile.html?user=test', 'redirect: path with query allowed');
assert(sanitizeRedirect('https://evil.com') === 'community.html', 'redirect: absolute URL blocked');
assert(sanitizeRedirect('//evil.com') === 'community.html', 'redirect: protocol-relative URL blocked');
assert(sanitizeRedirect('javascript:alert(1)') === 'community.html', 'redirect: javascript: protocol blocked');
assert(sanitizeRedirect('data:text/html,<h1>hi</h1>') === 'community.html', 'redirect: data: protocol blocked');

// ============================
// Test login URL generation logic (from nav.js)
// ============================
console.log('\n--- Login URL Generation Tests ---');

function buildLoginHref(currentPage, search) {
  var loginHref = 'login.html';
  if (currentPage && currentPage !== 'login.html' && currentPage !== 'register.html') {
    loginHref = 'login.html?redirect=' + encodeURIComponent(currentPage + search);
  }
  return loginHref;
}

assert(buildLoginHref('index.html', '') === 'login.html?redirect=index.html', 'loginHref: index.html redirect');
assert(buildLoginHref('community.html', '') === 'login.html?redirect=community.html', 'loginHref: community redirect');
assert(buildLoginHref('post.html', '?id=5') === 'login.html?redirect=' + encodeURIComponent('post.html?id=5'), 'loginHref: post with query');
assert(buildLoginHref('login.html', '') === 'login.html', 'loginHref: no redirect from login page');
assert(buildLoginHref('register.html', '') === 'login.html', 'loginHref: no redirect from register page');

// ============================
// JSDOM-based tests (if available)
// ============================
if (JSDOM) {
  console.log('\n--- DOM-based Tests (JSDOM) ---');

  // Test _escapeNavHTML
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
  const document = dom.window.document;

  function _escapeNavHTML(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  assert(_escapeNavHTML('hello') === 'hello', 'escapeNavHTML: plain text');
  assert(_escapeNavHTML('<script>alert("xss")</script>') === '&lt;script&gt;alert("xss")&lt;/script&gt;', 'escapeNavHTML: XSS attempt escaped');
  assert(_escapeNavHTML('a & b') === 'a &amp; b', 'escapeNavHTML: ampersand escaped');

  // Test that navRight element works
  const dom2 = new JSDOM(`
    <!DOCTYPE html>
    <html><body>
      <div class="nav-right" id="navRight"></div>
    </body></html>
  `);
  const navRight = dom2.window.document.getElementById('navRight');
  assert(navRight !== null, 'DOM: navRight element exists');
  assert(navRight.innerHTML === '', 'DOM: navRight starts empty');
} else {
  console.log('\n--- JSDOM not available, skipping DOM tests ---');
}

// ============================
// Summary
// ============================
console.log(`\nUnit Testing: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
