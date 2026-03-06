// ===== Shared JS for Content Pages =====

// ===== Mobile Menu =====
(function() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link, .nav-dropdown-menu a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
    if (backToTopBtn) backToTopBtn.classList.toggle('visible', window.scrollY > 500);
    updateScrollProgress();
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();

// ===== Scroll Progress =====
function updateScrollProgress() {
  const bar = document.getElementById('scrollProgressBar');
  if (!bar) return;
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  bar.style.width = (height > 0 ? (winScroll / height) * 100 : 0) + '%';
}

// ===== Dark Mode Toggle =====
(function() {
  const toggle = document.getElementById('darkModeToggle');
  if (!toggle) return;

  const savedTheme = localStorage.getItem('veganBitesTheme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  toggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('veganBitesTheme', next);
    toggle.textContent = next === 'dark' ? '☀️' : '🌙';
  });
})();

// ===== Dropdown Menu (for mobile) =====
(function() {
  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('open');
        }
      });
    }
  });
})();

// ===== Accordion =====
(function() {
  const items = document.querySelectorAll('.accordion-item');
  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        items.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });
})();

// ===== Resource Filters =====
(function() {
  const filterBtns = document.querySelectorAll('.resource-filter-btn');
  const cards = document.querySelectorAll('.resource-card');
  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

// ===== Pledge Form =====
(function() {
  const form = document.getElementById('pledgeForm');
  const counter = document.getElementById('pledgeCount');
  if (!form) return;

  let pledgeCount = parseInt(localStorage.getItem('veganBitesPledgeCount')) || 1247;
  if (counter) counter.textContent = pledgeCount.toLocaleString();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = form.querySelector('input');
    if (nameInput && nameInput.value.trim()) {
      pledgeCount++;
      localStorage.setItem('veganBitesPledgeCount', pledgeCount);
      if (counter) counter.textContent = pledgeCount.toLocaleString();
      showPageToast('Thank you for pledging! Together we make a difference.');
      form.reset();
    }
  });
})();

// ===== Animated Counters =====
(function() {
  const counters = document.querySelectorAll('.counter-value');
  if (counters.length === 0) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
})();

// ===== Progress Bars =====
(function() {
  const bars = document.querySelectorAll('.progress-bar-fill');
  if (bars.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();

// ===== Scroll Reveal =====
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
  document.querySelectorAll('.info-card, .action-card, .partner-card, .story-card, .stat-card, .progress-card, .resource-card, .timeline-item, .blog-card').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
})();

// ===== Toast =====
function showPageToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== Newsletter Form =====
(function() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input').value;
    if (email) { showPageToast('Thanks for subscribing!'); form.reset(); }
  });
})();

// ===== Blog Article Expand =====
(function() {
  document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('expanded');
    });
  });
})();

// ===== Contact Form =====
(function() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showPageToast('Message sent! We will get back to you soon.');
    form.reset();
  });
})();

// ===== Challenge Tracker =====
(function() {
  const days = document.querySelectorAll('.challenge-day');
  if (days.length === 0) return;

  let completed = JSON.parse(localStorage.getItem('veganBitesChallenge')) || [];

  function updateProgress() {
    const fill = document.querySelector('.challenge-progress-fill');
    const text = document.querySelector('.challenge-progress-text');
    const pct = Math.round((completed.length / 30) * 100);
    if (fill) fill.style.width = pct + '%';
    if (text) text.textContent = completed.length + '/30 days completed (' + pct + '%)';

    // Milestones
    document.querySelectorAll('.milestone').forEach(m => {
      const req = parseInt(m.dataset.days);
      if (completed.length >= req) m.classList.add('earned');
      else m.classList.remove('earned');
    });
  }

  days.forEach(day => {
    const dayNum = parseInt(day.dataset.day);
    if (completed.includes(dayNum)) day.classList.add('completed');

    day.addEventListener('click', () => {
      if (completed.includes(dayNum)) {
        completed = completed.filter(d => d !== dayNum);
        day.classList.remove('completed');
      } else {
        completed.push(dayNum);
        day.classList.add('completed');
      }
      localStorage.setItem('veganBitesChallenge', JSON.stringify(completed));
      updateProgress();
    });
  });

  updateProgress();
})();

// ===== Meal Planner =====
(function() {
  const planner = document.getElementById('mealPlannerGrid');
  if (!planner) return;

  let plannerData = JSON.parse(localStorage.getItem('veganBitesMealPlan')) || {};

  // Restore saved values
  planner.querySelectorAll('select').forEach(sel => {
    const key = sel.dataset.day + '-' + sel.dataset.meal;
    if (plannerData[key]) sel.value = plannerData[key];

    sel.addEventListener('change', () => {
      plannerData[key] = sel.value;
      localStorage.setItem('veganBitesMealPlan', JSON.stringify(plannerData));
    });
  });

  // Generate Shopping List
  const genBtn = document.getElementById('generateShoppingList');
  const clearBtn = document.getElementById('clearMealPlan');
  const listDiv = document.getElementById('shoppingList');

  if (genBtn && listDiv) {
    genBtn.addEventListener('click', () => {
      const allIngredients = new Set();
      Object.values(plannerData).forEach(recipeName => {
        if (!recipeName) return;
        // We don't have access to recipe data on sub-pages, so show recipe names
        allIngredients.add(recipeName);
      });

      if (allIngredients.size === 0) {
        showPageToast('Add some recipes to your plan first!');
        return;
      }

      listDiv.style.display = 'block';
      const ul = listDiv.querySelector('ul');
      ul.innerHTML = '';
      allIngredients.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
      });
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      plannerData = {};
      localStorage.removeItem('veganBitesMealPlan');
      planner.querySelectorAll('select').forEach(sel => sel.value = '');
      if (listDiv) listDiv.style.display = 'none';
      showPageToast('Meal plan cleared!');
    });
  }
})();

// ===== Cookie Consent =====
(function() {
  if (localStorage.getItem('veganBitesCookieConsent')) return;
  const banner = document.getElementById('cookieConsent');
  if (!banner) return;
  banner.style.display = 'flex';

  const acceptBtn = document.getElementById('cookieAccept');
  const declineBtn = document.getElementById('cookieDecline');

  if (acceptBtn) acceptBtn.addEventListener('click', () => {
    localStorage.setItem('veganBitesCookieConsent', 'accepted');
    banner.style.display = 'none';
  });
  if (declineBtn) declineBtn.addEventListener('click', () => {
    localStorage.setItem('veganBitesCookieConsent', 'declined');
    banner.style.display = 'none';
  });
})();

// ===== Page Transition =====
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-loaded');
});
