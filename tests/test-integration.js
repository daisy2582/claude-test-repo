/**
 * Integration Tests
 * Verifies that all pages correctly load nav.js and have proper #navRight containers
 * Tests script loading order and CSS dependencies
 */
const fs = require('fs');
const path = require('path');

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
// Test: index.html integration
// ============================
console.log('\n--- index.html Integration ---');
const indexHTML = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

assert(indexHTML.includes('id="navRight"'), 'index.html: has #navRight element');
assert(indexHTML.includes('js/api.js'), 'index.html: loads api.js');
assert(indexHTML.includes('js/nav.js'), 'index.html: loads nav.js');
assert(indexHTML.includes('css/social.css'), 'index.html: loads social.css for auth styles');
assert(indexHTML.indexOf('js/api.js') < indexHTML.indexOf('js/nav.js'), 'index.html: api.js loaded before nav.js');
assert(indexHTML.indexOf('js/nav.js') < indexHTML.indexOf('js/app.js'), 'index.html: nav.js loaded before app.js');
assert(indexHTML.includes('initNav()'), 'index.html: calls initNav()');

// ============================
// Test: community.html integration
// ============================
console.log('\n--- community.html Integration ---');
const communityHTML = fs.readFileSync(path.join(root, 'community.html'), 'utf8');

assert(communityHTML.includes('id="navRight"'), 'community.html: has #navRight element');
assert(communityHTML.includes('js/nav.js'), 'community.html: loads nav.js');
assert(communityHTML.indexOf('js/api.js') < communityHTML.indexOf('js/nav.js'), 'community.html: api.js before nav.js');
assert(communityHTML.indexOf('js/nav.js') < communityHTML.indexOf('js/feed.js'), 'community.html: nav.js before feed.js');

// ============================
// Test: profile.html integration
// ============================
console.log('\n--- profile.html Integration ---');
const profileHTML = fs.readFileSync(path.join(root, 'profile.html'), 'utf8');

assert(profileHTML.includes('id="navRight"'), 'profile.html: has #navRight element');
assert(profileHTML.includes('js/nav.js'), 'profile.html: loads nav.js');
assert(profileHTML.indexOf('js/api.js') < profileHTML.indexOf('js/nav.js'), 'profile.html: api.js before nav.js');
assert(profileHTML.indexOf('js/nav.js') < profileHTML.indexOf('js/profile.js'), 'profile.html: nav.js before profile.js');

// ============================
// Test: post.html integration
// ============================
console.log('\n--- post.html Integration ---');
const postHTML = fs.readFileSync(path.join(root, 'post.html'), 'utf8');

assert(postHTML.includes('id="navRight"'), 'post.html: has #navRight element');
assert(postHTML.includes('js/nav.js'), 'post.html: loads nav.js');
assert(postHTML.indexOf('js/api.js') < postHTML.indexOf('js/nav.js'), 'post.html: api.js before nav.js');
assert(postHTML.indexOf('js/nav.js') < postHTML.indexOf('js/post.js'), 'post.html: nav.js before post.js');

// ============================
// Test: nav.js has no duplicated code in page-specific files
// ============================
console.log('\n--- No Duplication Check ---');
const feedJS = fs.readFileSync(path.join(root, 'js', 'feed.js'), 'utf8');
const profileJS = fs.readFileSync(path.join(root, 'js', 'profile.js'), 'utf8');
const postJS = fs.readFileSync(path.join(root, 'js', 'post.js'), 'utf8');
const navJS = fs.readFileSync(path.join(root, 'js', 'nav.js'), 'utf8');

assert(!feedJS.includes('function initNav()'), 'feed.js: no duplicate initNav');
assert(!profileJS.includes('function initNav()'), 'profile.js: no duplicate initNav');
assert(!postJS.includes('function initNav()'), 'post.js: no duplicate initNav');
assert(navJS.includes('function initNav()'), 'nav.js: has initNav function');
assert(navJS.includes('function initDarkMode()'), 'nav.js: has initDarkMode function');
assert(navJS.includes('function initHamburger()'), 'nav.js: has initHamburger function');

// ============================
// Test: auth.js redirect support
// ============================
console.log('\n--- auth.js Redirect Integration ---');
const authJS = fs.readFileSync(path.join(root, 'js', 'auth.js'), 'utf8');

assert(authJS.includes("params.get('redirect')"), 'auth.js: reads redirect parameter');
assert(authJS.includes('redirectTo'), 'auth.js: uses redirectTo variable');
assert(authJS.includes("indexOf('//')"), 'auth.js: sanitizes redirect for protocol-relative');
assert(authJS.includes("indexOf(':')"), 'auth.js: sanitizes redirect for protocol schemes');
assert(!authJS.includes("window.location.href = 'community.html';") || authJS.split("window.location.href = 'community.html'").length <= 1, 'auth.js: no hardcoded community.html redirect in login flow');

// ============================
// Test: CSS auth styles available
// ============================
console.log('\n--- CSS Integration ---');
const socialCSS = fs.readFileSync(path.join(root, 'css', 'social.css'), 'utf8');

assert(socialCSS.includes('.nav-auth-buttons'), 'social.css: has nav-auth-buttons class');
assert(socialCSS.includes('.nav-login-btn'), 'social.css: has nav-login-btn class');
assert(socialCSS.includes('.nav-register-btn'), 'social.css: has nav-register-btn class');
assert(socialCSS.includes('.nav-user-menu'), 'social.css: has nav-user-menu class');
assert(socialCSS.includes('.nav-auth-btn'), 'social.css: has nav-auth-btn class');

// Summary
console.log(`\nIntegration Testing: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
