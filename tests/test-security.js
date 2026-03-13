/**
 * Security Tests
 * OWASP Top 10 checks for the changed code
 */
const fs = require('fs');
const path = require('path');

let issues = { critical: 0, high: 0, medium: 0, low: 0 };
let passed = 0;

function check(condition, testName, severity) {
  if (condition) {
    passed++;
    console.log(`  PASS: ${testName}`);
  } else {
    issues[severity]++;
    console.log(`  ${severity.toUpperCase()}: ${testName}`);
  }
}

const root = path.join(__dirname, '..');
const navJS = fs.readFileSync(path.join(root, 'js', 'nav.js'), 'utf8');
const authJS = fs.readFileSync(path.join(root, 'js', 'auth.js'), 'utf8');
const apiJS = fs.readFileSync(path.join(root, 'js', 'api.js'), 'utf8');
const indexHTML = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// ============================
// XSS Prevention
// ============================
console.log('\n--- XSS Prevention ---');
check(navJS.includes('_escapeNavHTML'), 'nav.js: Uses HTML escaping for display name', 'high');
check(navJS.includes('_escapeAttr'), 'nav.js: Uses attribute escaping for alt text', 'high');
check(navJS.includes('encodeURIComponent'), 'nav.js: URL-encodes username in profile link', 'medium');
check(!navJS.includes('innerHTML = user.') && !navJS.includes('innerHTML = `${user'), 'nav.js: No raw user data in innerHTML', 'high');

// ============================
// Open Redirect Prevention
// ============================
console.log('\n--- Open Redirect Prevention ---');
check(authJS.includes("indexOf('//')"), 'auth.js: Blocks protocol-relative redirect URLs', 'high');
check(authJS.includes("indexOf(':')"), 'auth.js: Blocks scheme-based redirect URLs', 'high');
check(navJS.includes('encodeURIComponent(currentPage'), 'nav.js: Encodes redirect param value', 'medium');

// ============================
// Injection Prevention
// ============================
console.log('\n--- Injection Prevention ---');
check(!navJS.includes('eval('), 'nav.js: No eval() usage', 'critical');
check(!navJS.includes('document.write('), 'nav.js: No document.write() usage', 'medium');
check(!navJS.includes('onclick="'), 'nav.js: No inline onclick handlers (uses addEventListener)', 'medium');

// ============================
// Hardcoded Secrets
// ============================
console.log('\n--- Hardcoded Secrets ---');
check(!navJS.includes('password'), 'nav.js: No hardcoded passwords', 'critical');
check(!navJS.includes('secret'), 'nav.js: No hardcoded secrets', 'critical');
check(!navJS.includes('api_key') && !navJS.includes('apiKey'), 'nav.js: No hardcoded API keys', 'critical');

// ============================
// Auth Token Handling
// ============================
console.log('\n--- Auth Token Handling ---');
check(!navJS.includes('getToken()'), 'nav.js: Does not directly access auth token', 'medium');
check(!indexHTML.includes('vegora_token'), 'index.html: No token references in HTML source', 'high');
check(apiJS.includes('localStorage'), 'api.js: Token stored in localStorage (standard for SPAs)', 'low');

// ============================
// CSRF / Request Security
// ============================
console.log('\n--- Request Security ---');
check(apiJS.includes("'Authorization'") && apiJS.includes('Bearer'), 'api.js: Uses Bearer token auth', 'medium');

// Summary
const total = issues.critical + issues.high + issues.medium + issues.low;
console.log(`\nSecurity Testing: ${total} issues found (Critical: ${issues.critical}, High: ${issues.high}, Medium: ${issues.medium}, Low: ${issues.low})`);
console.log(`${passed} security checks passed`);
if (issues.critical > 0 || issues.high > 0) process.exit(1);
