// ===== Recipe Data =====
const recipes = [
  {
    id: 1,
    title: "Avocado Toast with Chickpea Scramble",
    emoji: "🥑",
    category: "breakfast",
    time: "15 min",
    servings: 2,
    difficulty: "Easy",
    bgClass: "bg-breakfast",
    ingredients: [
      "2 slices sourdough bread",
      "1 ripe avocado",
      "1 can chickpeas, drained",
      "1 tbsp olive oil",
      "1/2 tsp turmeric",
      "1/2 tsp garlic powder",
      "Salt and pepper to taste",
      "Cherry tomatoes, halved",
      "Fresh cilantro for garnish",
      "Squeeze of lemon juice"
    ],
    instructions: [
      "Toast the sourdough bread until golden and crispy.",
      "Heat olive oil in a pan over medium heat. Add drained chickpeas and mash lightly with a fork.",
      "Season the chickpeas with turmeric, garlic powder, salt, and pepper. Cook for 5 minutes, stirring occasionally.",
      "Mash the avocado with a fork, adding lemon juice, salt, and pepper.",
      "Spread the mashed avocado generously on each toast.",
      "Top with the chickpea scramble, cherry tomatoes, and fresh cilantro.",
      "Serve immediately and enjoy your protein-packed breakfast!"
    ]
  },
  {
    id: 2,
    title: "Rainbow Buddha Bowl",
    emoji: "🥗",
    category: "lunch",
    time: "25 min",
    servings: 2,
    difficulty: "Easy",
    bgClass: "bg-lunch",
    ingredients: [
      "1 cup cooked quinoa",
      "1 cup shredded red cabbage",
      "1 large carrot, julienned",
      "1 cup edamame, shelled",
      "1 avocado, sliced",
      "1/2 cup cherry tomatoes, halved",
      "1/4 cup hummus",
      "2 tbsp tahini",
      "1 tbsp soy sauce",
      "1 tbsp maple syrup",
      "Juice of 1 lime",
      "Sesame seeds for garnish"
    ],
    instructions: [
      "Cook quinoa according to package directions and let it cool slightly.",
      "Prepare all vegetables: shred cabbage, julienne carrots, halve tomatoes, and slice avocado.",
      "Make the tahini dressing by whisking together tahini, soy sauce, maple syrup, lime juice, and 2 tbsp water.",
      "Divide the quinoa between two bowls as the base.",
      "Arrange the vegetables in colorful sections around the bowl: cabbage, carrots, edamame, tomatoes, and avocado.",
      "Add a dollop of hummus to each bowl.",
      "Drizzle generously with the tahini dressing and sprinkle with sesame seeds.",
      "Toss gently before eating, or enjoy each section separately!"
    ]
  },
  {
    id: 3,
    title: "Creamy Tomato Basil Pasta",
    emoji: "🍝",
    category: "dinner",
    time: "30 min",
    servings: 4,
    difficulty: "Medium",
    bgClass: "bg-dinner",
    ingredients: [
      "400g penne pasta",
      "1 can (400g) crushed tomatoes",
      "1 cup raw cashews, soaked 2 hours",
      "3 cloves garlic, minced",
      "1 tbsp olive oil",
      "1/4 cup nutritional yeast",
      "1 cup fresh basil leaves",
      "1 tsp dried oregano",
      "1/2 tsp red pepper flakes",
      "Salt and pepper to taste",
      "Pine nuts for garnish"
    ],
    instructions: [
      "Cook pasta according to package directions. Reserve 1 cup of pasta water before draining.",
      "Blend soaked cashews with 1/2 cup water until completely smooth and creamy.",
      "Heat olive oil in a large pan. Saute garlic for 1 minute until fragrant.",
      "Add crushed tomatoes, oregano, red pepper flakes, salt, and pepper. Simmer for 10 minutes.",
      "Stir in the cashew cream and nutritional yeast. Mix until smooth and creamy.",
      "Add the cooked pasta and toss well. Add pasta water as needed for desired consistency.",
      "Remove from heat, tear in fresh basil leaves, and toss gently.",
      "Serve topped with pine nuts and extra basil. Enjoy!"
    ]
  },
  {
    id: 4,
    title: "Thai Coconut Curry",
    emoji: "🍛",
    category: "dinner",
    time: "35 min",
    servings: 4,
    difficulty: "Medium",
    bgClass: "bg-dinner",
    ingredients: [
      "1 can (400ml) coconut milk",
      "2 tbsp Thai red curry paste",
      "1 block firm tofu, cubed",
      "1 red bell pepper, sliced",
      "1 cup broccoli florets",
      "1 zucchini, sliced",
      "1 cup snap peas",
      "2 tbsp soy sauce",
      "1 tbsp maple syrup",
      "Juice of 1 lime",
      "Fresh Thai basil",
      "Cooked jasmine rice for serving"
    ],
    instructions: [
      "Press tofu for 15 minutes, then cut into cubes. Pan-fry in a little oil until golden on all sides. Set aside.",
      "In the same pan, add a splash of coconut milk and the curry paste. Stir-fry for 2 minutes until fragrant.",
      "Pour in the remaining coconut milk, soy sauce, and maple syrup. Stir to combine.",
      "Add broccoli and bell pepper first (they take longer). Simmer for 5 minutes.",
      "Add zucchini and snap peas. Cook for another 3-4 minutes until tender-crisp.",
      "Return the tofu to the curry. Squeeze in lime juice and stir gently.",
      "Taste and adjust seasoning as needed.",
      "Serve over fluffy jasmine rice, garnished with fresh Thai basil."
    ]
  },
  {
    id: 5,
    title: "Chocolate Peanut Butter Cups",
    emoji: "🍫",
    category: "desserts",
    time: "20 min",
    servings: 12,
    difficulty: "Easy",
    bgClass: "bg-desserts",
    ingredients: [
      "1 cup dark chocolate chips (vegan)",
      "1/2 cup creamy peanut butter",
      "2 tbsp maple syrup",
      "1 tbsp coconut oil",
      "Pinch of sea salt",
      "Flaky sea salt for topping"
    ],
    instructions: [
      "Line a muffin tin with 12 paper liners.",
      "Melt the dark chocolate chips with coconut oil in a microwave or double boiler, stirring until smooth.",
      "Spoon 1 tablespoon of melted chocolate into each liner, tilting to coat the bottom evenly.",
      "Place the tin in the freezer for 10 minutes until the chocolate sets.",
      "Mix peanut butter with maple syrup and a pinch of sea salt until smooth.",
      "Add 1 teaspoon of the peanut butter mixture on top of each chocolate base.",
      "Pour remaining melted chocolate over the peanut butter to cover completely.",
      "Sprinkle flaky sea salt on top. Freeze for 15 minutes until set.",
      "Store in the fridge. Let sit at room temperature for 2 minutes before eating."
    ]
  },
  {
    id: 6,
    title: "Berry Bliss Smoothie Bowl",
    emoji: "🍓",
    category: "breakfast",
    time: "10 min",
    servings: 1,
    difficulty: "Easy",
    bgClass: "bg-breakfast",
    ingredients: [
      "1 cup frozen mixed berries",
      "1 frozen banana",
      "1/2 cup plant-based milk",
      "1 tbsp almond butter",
      "1 tbsp chia seeds",
      "Toppings: granola, fresh berries, coconut flakes, sliced banana, hemp seeds"
    ],
    instructions: [
      "Add frozen berries, frozen banana, plant-based milk, and almond butter to a blender.",
      "Blend on high until thick and creamy. The consistency should be thicker than a regular smoothie (add milk sparingly).",
      "Pour the smoothie base into a bowl.",
      "Arrange your toppings in rows: granola, fresh berries, coconut flakes, sliced banana, and hemp seeds.",
      "Sprinkle chia seeds over the top.",
      "Eat immediately with a spoon — enjoy the contrast of creamy base and crunchy toppings!"
    ]
  },
  {
    id: 7,
    title: "Mediterranean Falafel Wrap",
    emoji: "🌯",
    category: "lunch",
    time: "30 min",
    servings: 4,
    difficulty: "Medium",
    bgClass: "bg-lunch",
    ingredients: [
      "1 can (400g) chickpeas, drained",
      "1/2 onion, roughly chopped",
      "3 cloves garlic",
      "1 cup fresh parsley",
      "1 tsp cumin",
      "1 tsp coriander",
      "2 tbsp flour",
      "4 large tortilla wraps",
      "1 cup shredded lettuce",
      "1 tomato, diced",
      "1/2 cucumber, sliced",
      "Pickled red onions",
      "Tahini sauce: 3 tbsp tahini, lemon juice, garlic, water"
    ],
    instructions: [
      "Add chickpeas, onion, garlic, parsley, cumin, and coriander to a food processor. Pulse until combined but still slightly chunky.",
      "Mix in the flour. The mixture should hold together when pressed. Refrigerate for 15 minutes.",
      "Form the mixture into small patties (about 3 per wrap).",
      "Heat oil in a pan over medium-high heat. Cook falafel for 3-4 minutes per side until golden and crispy.",
      "Make the tahini sauce: whisk tahini, lemon juice, minced garlic, and water until smooth and drizzly.",
      "Warm the tortilla wraps in a dry pan for 30 seconds each side.",
      "Layer each wrap with lettuce, falafel, tomato, cucumber, and pickled red onions.",
      "Drizzle generously with tahini sauce, roll up tightly, and enjoy!"
    ]
  },
  {
    id: 8,
    title: "Fluffy Banana Oat Pancakes",
    emoji: "🥞",
    category: "breakfast",
    time: "20 min",
    servings: 8,
    difficulty: "Easy",
    bgClass: "bg-breakfast",
    ingredients: [
      "2 ripe bananas, mashed",
      "1.5 cups oat flour (blended oats)",
      "1 cup plant-based milk",
      "2 tbsp maple syrup",
      "1 tsp baking powder",
      "1 tsp vanilla extract",
      "1/2 tsp cinnamon",
      "Pinch of salt",
      "Coconut oil for cooking",
      "Toppings: maple syrup, fresh berries, banana slices, nut butter"
    ],
    instructions: [
      "In a large bowl, mash the bananas until smooth.",
      "Add oat flour, baking powder, cinnamon, and salt. Mix to combine.",
      "Pour in plant-based milk, maple syrup, and vanilla extract. Stir until you have a smooth batter. Don't overmix.",
      "Let the batter rest for 5 minutes (it will thicken slightly).",
      "Heat a non-stick pan over medium heat and add a small amount of coconut oil.",
      "Pour 1/4 cup of batter per pancake. Cook until bubbles form on the surface (about 2-3 minutes).",
      "Flip carefully and cook for another 1-2 minutes until golden brown.",
      "Stack the pancakes and serve with maple syrup, fresh berries, banana slices, and a drizzle of nut butter."
    ]
  },
  {
    id: 9,
    title: "No-Bake Mango Cheesecake",
    emoji: "🍋",
    category: "desserts",
    time: "30 min",
    servings: 8,
    difficulty: "Medium",
    bgClass: "bg-desserts",
    ingredients: [
      "Base: 1.5 cups almonds, 1 cup pitted dates, 2 tbsp coconut oil, pinch of salt",
      "Filling: 2 cups raw cashews (soaked 4 hours), 2 ripe mangos",
      "1/2 cup coconut cream",
      "1/4 cup maple syrup",
      "1/4 cup coconut oil, melted",
      "Juice of 2 limes",
      "1 tsp vanilla extract",
      "Fresh mango slices and mint for garnish"
    ],
    instructions: [
      "Process almonds in a food processor until crumbly. Add dates, coconut oil, and salt. Process until the mixture sticks together.",
      "Press the base firmly into a lined 8-inch springform pan. Place in the freezer while making the filling.",
      "Drain the soaked cashews and add to a blender with chopped mango flesh.",
      "Add coconut cream, maple syrup, melted coconut oil, lime juice, and vanilla.",
      "Blend on high for 2-3 minutes until completely smooth and silky.",
      "Pour the filling over the base and smooth the top with a spatula.",
      "Freeze for at least 4 hours or overnight until firm.",
      "Remove from freezer 20 minutes before serving. Top with fresh mango slices and mint.",
      "Slice and serve. Store leftovers in the freezer."
    ]
  }
];

// ===== DOM Elements =====
const recipeGrid = document.getElementById("recipeGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navbar = document.getElementById("navbar");
const backToTopBtn = document.getElementById("backToTop");
const recipeModal = document.getElementById("recipeModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalEmoji = document.getElementById("modalEmoji");
const modalMeta = document.getElementById("modalMeta");
const modalIngredients = document.getElementById("modalIngredients");
const modalInstructions = document.getElementById("modalInstructions");
const newsletterForm = document.getElementById("newsletterForm");
const toast = document.getElementById("toast");
const recipeSearch = document.getElementById("recipeSearch");
const surpriseBtn = document.getElementById("surpriseBtn");

// ===== Favorites State =====
let favorites = JSON.parse(localStorage.getItem("veganBitesFavorites")) || [];

// ===== Current search term =====
let currentSearchTerm = "";

// ===== Render Recipe Cards =====
function renderRecipes(filter = "all", searchTerm = "") {
  let filtered = recipes;

  // Apply category filter
  if (filter === "favorites") {
    filtered = recipes.filter(r => favorites.includes(r.id));
  } else if (filter !== "all") {
    filtered = recipes.filter(r => r.category === filter);
  }

  // Apply search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(r =>
      r.title.toLowerCase().includes(term) ||
      r.category.toLowerCase().includes(term) ||
      r.ingredients.some(i => i.toLowerCase().includes(term))
    );
  }

  recipeGrid.innerHTML = "";

  if (filtered.length === 0) {
    recipeGrid.innerHTML = `
      <div class="no-results" style="grid-column: 1 / -1;">
        <span class="no-results-emoji">🔍</span>
        <p>${filter === "favorites" ? "No favorites yet — start exploring and tap the heart!" : "No recipes found. Try a different search term."}</p>
      </div>
    `;
    return;
  }

  filtered.forEach((recipe, index) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.setAttribute("data-category", recipe.category);
    card.style.transitionDelay = `${index * 0.08}s`;

    const isFav = favorites.includes(recipe.id);

    card.innerHTML = `
      <div class="recipe-card-image ${recipe.bgClass}">
        <span>${recipe.emoji}</span>
        <button class="favorite-btn ${isFav ? "favorited" : ""}" data-id="${recipe.id}" aria-label="Toggle favorite">
          ${isFav ? "❤️" : "🤍"}
        </button>
      </div>
      <div class="recipe-card-body">
        <span class="recipe-category-tag">${recipe.category}</span>
        <h3>${recipe.title}</h3>
        <div class="recipe-meta">
          <span>⏱ ${recipe.time}</span>
          <span>🍽 ${recipe.servings} servings</span>
          <span>📊 ${recipe.difficulty}</span>
        </div>
        <button class="btn btn-primary view-recipe-btn" data-id="${recipe.id}">View Recipe</button>
      </div>
    `;

    recipeGrid.appendChild(card);

    // Trigger scroll animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.classList.add("visible");
      });
    });
  });

  // Attach event listeners
  document.querySelectorAll(".view-recipe-btn").forEach(btn => {
    btn.addEventListener("click", () => openModal(Number(btn.dataset.id)));
  });

  document.querySelectorAll(".favorite-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(Number(btn.dataset.id));
    });
  });
}

// ===== Filter Recipes =====
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderRecipes(btn.dataset.filter, currentSearchTerm);
  });
});

// Category cards also filter
document.querySelectorAll(".category-card").forEach(card => {
  card.addEventListener("click", () => {
    const category = card.dataset.category;
    document.getElementById("recipes").scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      filterButtons.forEach(b => b.classList.remove("active"));
      const matchingBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
      if (matchingBtn) {
        matchingBtn.classList.add("active");
        renderRecipes(category, currentSearchTerm);
      } else {
        document.querySelector('.filter-btn[data-filter="all"]').classList.add("active");
        renderRecipes("all", currentSearchTerm);
      }
    }, 400);
  });
});

// ===== Search =====
if (recipeSearch) {
  recipeSearch.addEventListener("input", (e) => {
    currentSearchTerm = e.target.value.trim();
    const activeFilter = document.querySelector(".filter-btn.active").dataset.filter;
    renderRecipes(activeFilter, currentSearchTerm);
  });
}

// ===== Surprise Me =====
if (surpriseBtn) {
  surpriseBtn.addEventListener("click", () => {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    openModal(randomRecipe.id);
    showToast("🎲 Random pick: " + randomRecipe.title + "!");
  });
}

// ===== Modal =====
function openModal(id) {
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;

  modalEmoji.textContent = recipe.emoji;
  modalTitle.textContent = recipe.title;
  modalMeta.innerHTML = `
    <span>⏱ ${recipe.time}</span>
    <span>🍽 ${recipe.servings} servings</span>
    <span>📊 ${recipe.difficulty}</span>
  `;

  modalIngredients.innerHTML = recipe.ingredients.map(i => `<li>${i}</li>`).join("");
  modalInstructions.innerHTML = recipe.instructions.map(s => `<li>${s}</li>`).join("");

  recipeModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  recipeModal.classList.remove("active");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
recipeModal.addEventListener("click", (e) => {
  if (e.target === recipeModal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ===== Favorites =====
function toggleFavorite(id) {
  const index = favorites.indexOf(id);
  if (index === -1) {
    favorites.push(id);
    showToast("❤️ Added to favorites!");
  } else {
    favorites.splice(index, 1);
    showToast("💔 Removed from favorites");
  }
  localStorage.setItem("veganBitesFavorites", JSON.stringify(favorites));

  // Re-render to update heart icons
  const activeFilter = document.querySelector(".filter-btn.active").dataset.filter;
  renderRecipes(activeFilter, currentSearchTerm);
}

// ===== Toast Notification =====
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// ===== Hamburger Menu =====
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu on link click
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// ===== Dropdown Menu (for mobile) =====
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

// Close mobile menu when clicking dropdown links
document.querySelectorAll('.nav-dropdown-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

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

// ===== Navbar Scroll Effect =====
window.addEventListener("scroll", () => {
  // Navbar shadow
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Back to top visibility
  if (window.scrollY > 500) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }

  // Active nav link based on scroll position
  updateActiveNav();
});

// ===== Back to Top =====
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Active Nav Link =====
function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < top + height) {
      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// ===== Newsletter Form =====
newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = newsletterForm.querySelector("input").value;
  if (email) {
    showToast("🎉 Thanks for subscribing!");
    newsletterForm.reset();
  }
});

// ===== Scroll Animations (Intersection Observer) =====
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".category-card, .about-card").forEach(el => {
    el.classList.add("animate-on-scroll");
    observer.observe(el);
  });
}

// ===== Initialize =====
document.addEventListener("DOMContentLoaded", () => {
  renderRecipes();
  initScrollAnimations();
});
