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
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', window.scrollY > 500);
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();

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
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(dropdown => {
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

// ===== Accordion (Facts & Myths page) =====
(function() {
  const items = document.querySelectorAll('.accordion-item');
  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all
        items.forEach(i => i.classList.remove('active'));
        // Open clicked (if it was closed)
        if (!isActive) {
          item.classList.add('active');
        }
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

  // Load pledge count
  let pledgeCount = parseInt(localStorage.getItem('veganBitesPledgeCount')) || 1247;
  if (counter) {
    counter.textContent = pledgeCount.toLocaleString();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = form.querySelector('input');
    if (nameInput && nameInput.value.trim()) {
      pledgeCount++;
      localStorage.setItem('veganBitesPledgeCount', pledgeCount);
      if (counter) {
        counter.textContent = pledgeCount.toLocaleString();
      }
      showPageToast('Thank you for pledging! Together we make a difference.');
      form.reset();
    }
  });
})();

// ===== Animated Counters (Our Impact page) =====
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
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
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

// ===== Progress Bars (Our Impact page) =====
(function() {
  const bars = document.querySelectorAll('.progress-bar-fill');
  if (bars.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target.dataset.width;
        entry.target.style.width = target;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();

// ===== Scroll Reveal Animations =====
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Also observe specific card types
  document.querySelectorAll('.info-card, .action-card, .partner-card, .story-card, .stat-card, .progress-card, .resource-card, .timeline-item').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
})();

// ===== Toast Notification =====
function showPageToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== Newsletter Form (shared across pages) =====
(function() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input').value;
    if (email) {
      showPageToast('Thanks for subscribing!');
      form.reset();
    }
  });
})();
