/**
 * Vegora Bites - Post Detail Page
 * Single post view with comments and threaded replies
 */

let currentPost = null;

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initNav();
  initHamburger();
  loadPost();
});

// ============================
// Dark Mode, Navigation, and Hamburger
// are now provided by js/nav.js (shared module)
// ============================

// ============================
// Load Post
// ============================
async function loadPost() {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get('id');
  if (!postId) {
    document.getElementById('postDetailContent').innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🤔</div>
        <h3>Post not found</h3>
        <p><a href="community.html" style="color:#2d8a4e;">Back to community</a></p>
      </div>
    `;
    return;
  }

  try {
    currentPost = await API.getPost(postId);
    renderPost(currentPost);
    loadComments(postId);
  } catch (err) {
    document.getElementById('postDetailContent').innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <h3>Could not load post</h3>
        <p>${err.message}. <a href="community.html" style="color:#2d8a4e;">Back to community</a></p>
      </div>
    `;
  }
}

function renderPost(post) {
  const score = post.upvotes - post.downvotes;
  const upClass = post.user_vote === 1 ? 'upvoted' : '';
  const downClass = post.user_vote === -1 ? 'downvoted' : '';
  const timeAgo = relativeTime(post.created_at);
  const badgeClass = `badge-${post.category}`;
  const categoryLabel = post.category.charAt(0).toUpperCase() + post.category.slice(1);
  const currentUser = API.getUser();
  const isAuthor = currentUser && currentUser.id === post.author.id;

  let imageHTML = '';
  if (post.image_url) {
    imageHTML = `<img src="${API.BASE_URL}${post.image_url}" alt="" class="post-detail-image">`;
  }

  let deleteBtn = '';
  if (isAuthor) {
    deleteBtn = `<button class="post-action-btn" onclick="deleteCurrentPost()">🗑️ Delete</button>`;
  }

  document.title = `${post.title} - Vegora Bites`;

  document.getElementById('postDetailContent').innerHTML = `
    <div class="post-detail-card">
      <div class="post-detail-main">
        <div class="post-detail-vote">
          <button class="vote-btn ${upClass}" onclick="votePost(${post.id}, 1, this)" aria-label="Upvote">▲</button>
          <span class="vote-score">${score}</span>
          <button class="vote-btn ${downClass}" onclick="votePost(${post.id}, -1, this)" aria-label="Downvote">▼</button>
        </div>
        <div class="post-detail-content">
          <div class="post-detail-meta">
            <span class="post-category-badge ${badgeClass}">${categoryLabel}</span>
            <span>Posted by</span>
            <a class="post-author-link" href="profile.html?user=${post.author.username}">${post.author.display_name}</a>
            <span class="post-time">${timeAgo}</span>
          </div>
          <h1 class="post-detail-title">${escapeHTML(post.title)}</h1>
          <div class="post-detail-text">${escapeHTML(post.content)}</div>
          ${imageHTML}
          <div class="post-detail-actions">
            <button class="post-action-btn">💬 ${post.comment_count} Comment${post.comment_count !== 1 ? 's' : ''}</button>
            <button class="post-action-btn" onclick="shareCurrentPost()">📤 Share</button>
            ${deleteBtn}
          </div>
        </div>
      </div>

      <div class="comments-section" id="commentsSection">
        <h3>Comments</h3>
        ${API.isLoggedIn() ? `
        <div class="comment-form">
          <textarea id="commentInput" placeholder="Add a comment..."></textarea>
          <div class="comment-form-actions">
            <button class="comment-submit-btn" onclick="submitComment()">Comment</button>
          </div>
        </div>
        ` : `<p style="color:#6b7280; margin-bottom:20px;">
          <a href="login.html" style="color:#2d8a4e; font-weight:600;">Log in</a> to comment
        </p>`}
        <div id="commentsList">
          <div class="loading-spinner">
            <div class="spinner"></div>
          </div>
        </div>
      </div>
    </div>

    <div style="text-align:center; padding:20px;">
      <a href="community.html" style="color:#2d8a4e; font-weight:600; text-decoration:none;">← Back to Community</a>
    </div>
  `;
}

// ============================
// Voting
// ============================
async function votePost(postId, value, btn) {
  if (!API.isLoggedIn()) {
    showToast('Please log in to vote', 'error');
    return;
  }

  const voteArea = btn.closest('.post-detail-vote');
  const upBtn = voteArea.querySelector('.vote-btn:first-child');
  const downBtn = voteArea.querySelector('.vote-btn:last-child');
  const scoreEl = voteArea.querySelector('.vote-score');

  let newValue = value;
  if ((value === 1 && upBtn.classList.contains('upvoted')) ||
      (value === -1 && downBtn.classList.contains('downvoted'))) {
    newValue = 0;
  }

  try {
    const updated = await API.votePost(postId, newValue);
    scoreEl.textContent = updated.upvotes - updated.downvotes;
    upBtn.classList.toggle('upvoted', updated.user_vote === 1);
    downBtn.classList.toggle('downvoted', updated.user_vote === -1);
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ============================
// Comments
// ============================
async function loadComments(postId) {
  const list = document.getElementById('commentsList');
  try {
    const comments = await API.getComments(postId);
    if (comments.length === 0) {
      list.innerHTML = `
        <div class="empty-state" style="padding:20px;">
          <p style="color:#9ca3af;">No comments yet. Be the first!</p>
        </div>
      `;
      return;
    }
    list.innerHTML = comments.map(c => renderComment(c)).join('');
  } catch (err) {
    list.innerHTML = `<p style="color:#dc2626;">Failed to load comments</p>`;
  }
}

function renderComment(comment, depth = 0) {
  const currentUser = API.getUser();
  const isAuthor = currentUser && currentUser.id === comment.author.id;
  const avatarLetter = comment.author.display_name.charAt(0).toUpperCase();
  const timeAgo = relativeTime(comment.created_at);

  let deleteAction = '';
  if (isAuthor) {
    deleteAction = `<button class="comment-action" onclick="deleteComment(${currentPost.id}, ${comment.id}, this)">Delete</button>`;
  }

  let replyAction = '';
  if (API.isLoggedIn()) {
    replyAction = `<button class="comment-action" onclick="toggleReplyForm(${comment.id}, this)">Reply</button>`;
  }

  let repliesHTML = '';
  if (comment.replies && comment.replies.length > 0) {
    repliesHTML = `
      <div class="comment-replies">
        ${comment.replies.map(r => renderComment(r, depth + 1)).join('')}
      </div>
    `;
  }

  return `
    <div class="comment-item" id="comment-${comment.id}">
      <div class="comment-main">
        <div class="comment-avatar">${avatarLetter}</div>
        <div class="comment-content">
          <div class="comment-header">
            <a class="comment-author" href="profile.html?user=${comment.author.username}">${escapeHTML(comment.author.display_name)}</a>
            <span class="comment-time">${timeAgo}</span>
          </div>
          <div class="comment-text">${escapeHTML(comment.content)}</div>
          <div class="comment-actions-bar">
            ${replyAction}
            ${deleteAction}
          </div>
          <div id="reply-form-${comment.id}"></div>
        </div>
      </div>
      ${repliesHTML}
    </div>
  `;
}

async function submitComment() {
  const input = document.getElementById('commentInput');
  const content = input.value.trim();
  if (!content) return;

  const btn = document.querySelector('.comment-submit-btn');
  btn.disabled = true;

  try {
    await API.createComment(currentPost.id, content);
    input.value = '';
    showToast('Comment added!', 'success');
    loadComments(currentPost.id);
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    btn.disabled = false;
  }
}

function toggleReplyForm(commentId, btn) {
  const container = document.getElementById(`reply-form-${commentId}`);
  if (container.innerHTML) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <div class="reply-form">
      <textarea id="reply-input-${commentId}" placeholder="Write a reply..."></textarea>
      <div class="reply-form-actions">
        <button class="reply-cancel-btn" onclick="document.getElementById('reply-form-${commentId}').innerHTML=''">Cancel</button>
        <button class="reply-submit-btn" onclick="submitReply(${commentId})">Reply</button>
      </div>
    </div>
  `;
  document.getElementById(`reply-input-${commentId}`).focus();
}

async function submitReply(parentId) {
  const input = document.getElementById(`reply-input-${parentId}`);
  const content = input.value.trim();
  if (!content) return;

  try {
    await API.createComment(currentPost.id, content, parentId);
    showToast('Reply added!', 'success');
    loadComments(currentPost.id);
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function deleteComment(postId, commentId, btn) {
  if (!confirm('Delete this comment?')) return;
  try {
    await API.deleteComment(postId, commentId);
    showToast('Comment deleted', 'success');
    loadComments(postId);
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ============================
// Post Actions
// ============================
async function deleteCurrentPost() {
  if (!confirm('Delete this post? This cannot be undone.')) return;
  try {
    await API.deletePost(currentPost.id);
    window.location.href = 'community.html';
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function shareCurrentPost() {
  const url = window.location.href;
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
