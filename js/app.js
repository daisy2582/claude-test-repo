// ===== Recipe Data =====
const recipes = [
  // === BREAKFAST ===
  {
    id: 1,
    title: "Avocado Toast with Chickpea Scramble",
    emoji: "🥑",
    category: "breakfast",
    time: "15 min",
    servings: 2,
    difficulty: "Easy",
    bgClass: "bg-breakfast",
    tags: ["High-Protein", "Under 20 Min"],
    nutrition: { calories: 380, protein: 14, carbs: 42, fat: 18 },
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
    id: 6,
    title: "Berry Bliss Smoothie Bowl",
    emoji: "🍓",
    category: "breakfast",
    time: "10 min",
    servings: 1,
    difficulty: "Easy",
    bgClass: "bg-breakfast",
    tags: ["Gluten-Free", "Under 20 Min", "Kid-Friendly"],
    nutrition: { calories: 320, protein: 8, carbs: 58, fat: 10 },
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
      "Eat immediately with a spoon!"
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
    tags: ["Kid-Friendly", "Nut-Free"],
    nutrition: { calories: 210, protein: 5, carbs: 38, fat: 4 },
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
      "Pour in plant-based milk, maple syrup, and vanilla extract. Stir until you have a smooth batter.",
      "Let the batter rest for 5 minutes.",
      "Heat a non-stick pan over medium heat and add coconut oil.",
      "Pour 1/4 cup batter per pancake. Cook until bubbles form (about 2-3 minutes).",
      "Flip and cook 1-2 minutes more until golden.",
      "Stack and serve with maple syrup, berries, and nut butter."
    ]
  },
  {
    id: 10,
    title: "Tofu Breakfast Burrito",
    emoji: "🌯",
    category: "breakfast",
    time: "20 min",
    servings: 2,
    difficulty: "Easy",
    bgClass: "bg-breakfast",
    tags: ["High-Protein", "Under 20 Min"],
    nutrition: { calories: 420, protein: 22, carbs: 45, fat: 16 },
    ingredients: [
      "1 block firm tofu, crumbled",
      "2 large flour tortillas",
      "1/2 cup black beans",
      "1/2 avocado, sliced",
      "1/4 cup salsa",
      "1 tbsp nutritional yeast",
      "1/2 tsp turmeric",
      "1/2 tsp cumin",
      "Salt and pepper to taste",
      "Hot sauce (optional)"
    ],
    instructions: [
      "Crumble tofu into a hot pan with a little oil.",
      "Add turmeric, cumin, salt, and pepper. Cook 5-7 minutes until slightly golden.",
      "Stir in nutritional yeast and black beans. Heat through.",
      "Warm tortillas in a dry pan for 30 seconds each side.",
      "Fill each tortilla with tofu scramble, avocado slices, and salsa.",
      "Roll up tightly, tucking in the sides.",
      "Serve with hot sauce if desired."
    ]
  },

  // === LUNCH ===
  {
    id: 2,
    title: "Rainbow Buddha Bowl",
    emoji: "🥗",
    category: "lunch",
    time: "25 min",
    servings: 2,
    difficulty: "Easy",
    bgClass: "bg-lunch",
    tags: ["Gluten-Free", "High-Protein"],
    nutrition: { calories: 450, protein: 18, carbs: 52, fat: 20 },
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
      "Cook quinoa according to package directions and let cool slightly.",
      "Prepare all vegetables: shred cabbage, julienne carrots, halve tomatoes, slice avocado.",
      "Make tahini dressing: whisk tahini, soy sauce, maple syrup, lime juice, and 2 tbsp water.",
      "Divide quinoa between two bowls as the base.",
      "Arrange vegetables in colorful sections around the bowl.",
      "Add a dollop of hummus to each bowl.",
      "Drizzle with tahini dressing and sprinkle with sesame seeds.",
      "Toss gently or enjoy each section separately!"
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
    tags: ["High-Protein"],
    nutrition: { calories: 480, protein: 16, carbs: 58, fat: 22 },
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
      "Add chickpeas, onion, garlic, parsley, cumin, and coriander to a food processor. Pulse until combined but slightly chunky.",
      "Mix in the flour. Refrigerate for 15 minutes.",
      "Form into small patties (about 3 per wrap).",
      "Pan-fry 3-4 minutes per side until golden and crispy.",
      "Make tahini sauce: whisk tahini, lemon juice, garlic, and water until smooth.",
      "Warm tortilla wraps in a dry pan.",
      "Layer each wrap with lettuce, falafel, tomato, cucumber, and pickled onions.",
      "Drizzle with tahini sauce, roll up tightly, and enjoy!"
    ]
  },
  {
    id: 11,
    title: "Asian Peanut Noodle Salad",
    emoji: "🍜",
    category: "lunch",
    time: "15 min",
    servings: 2,
    difficulty: "Easy",
    bgClass: "bg-lunch",
    tags: ["Under 20 Min", "Kid-Friendly"],
    nutrition: { calories: 420, protein: 14, carbs: 52, fat: 18 },
    ingredients: [
      "200g rice noodles",
      "1 cup shredded carrots",
      "1 cup edamame",
      "1 red bell pepper, sliced",
      "1/4 cup peanuts, crushed",
      "3 tbsp peanut butter",
      "2 tbsp soy sauce",
      "1 tbsp rice vinegar",
      "1 tbsp maple syrup",
      "1 tsp sesame oil",
      "Fresh cilantro and lime"
    ],
    instructions: [
      "Cook rice noodles according to package and rinse under cold water.",
      "Whisk together peanut butter, soy sauce, rice vinegar, maple syrup, and sesame oil.",
      "Toss noodles with the peanut sauce.",
      "Add shredded carrots, edamame, and bell pepper.",
      "Top with crushed peanuts and fresh cilantro.",
      "Squeeze lime juice over and serve cold or at room temperature."
    ]
  },
  {
    id: 12,
    title: "Loaded Sweet Potato",
    emoji: "🍠",
    category: "lunch",
    time: "45 min",
    servings: 2,
    difficulty: "Easy",
    bgClass: "bg-lunch",
    tags: ["Gluten-Free", "High-Protein"],
    nutrition: { calories: 390, protein: 15, carbs: 58, fat: 12 },
    ingredients: [
      "2 large sweet potatoes",
      "1 can black beans, drained",
      "1/2 cup corn kernels",
      "1/2 avocado, diced",
      "2 tbsp salsa",
      "2 tbsp vegan sour cream",
      "1 tsp cumin",
      "Salt and pepper",
      "Fresh cilantro",
      "Lime wedges"
    ],
    instructions: [
      "Preheat oven to 200C/400F. Pierce sweet potatoes with a fork.",
      "Bake for 40-45 minutes until soft inside.",
      "Heat black beans with cumin, salt, and pepper.",
      "Cut sweet potatoes open and fluff the insides.",
      "Load with black beans, corn, avocado, salsa, and sour cream.",
      "Garnish with cilantro and serve with lime wedges."
    ]
  },

  // === DINNER ===
  {
    id: 3,
    title: "Creamy Tomato Basil Pasta",
    emoji: "🍝",
    category: "dinner",
    time: "30 min",
    servings: 4,
    difficulty: "Medium",
    bgClass: "bg-dinner",
    tags: ["Kid-Friendly"],
    nutrition: { calories: 520, protein: 16, carbs: 68, fat: 20 },
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
      "Cook pasta according to package. Reserve 1 cup pasta water before draining.",
      "Blend soaked cashews with 1/2 cup water until completely smooth.",
      "Heat olive oil, saute garlic 1 minute until fragrant.",
      "Add crushed tomatoes, oregano, red pepper flakes. Simmer 10 minutes.",
      "Stir in cashew cream and nutritional yeast until smooth.",
      "Add cooked pasta and toss. Add pasta water as needed.",
      "Tear in fresh basil leaves and toss gently.",
      "Serve topped with pine nuts and extra basil."
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
    tags: ["Gluten-Free", "High-Protein"],
    nutrition: { calories: 480, protein: 18, carbs: 42, fat: 28 },
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
      "Press tofu 15 minutes, cube, and pan-fry until golden. Set aside.",
      "Add coconut milk splash and curry paste to the pan. Stir-fry 2 minutes.",
      "Pour in remaining coconut milk, soy sauce, and maple syrup.",
      "Add broccoli and bell pepper first. Simmer 5 minutes.",
      "Add zucchini and snap peas. Cook 3-4 minutes until tender-crisp.",
      "Return tofu to curry. Squeeze in lime juice.",
      "Taste and adjust seasoning.",
      "Serve over jasmine rice with fresh Thai basil."
    ]
  },
  {
    id: 13,
    title: "Mushroom Risotto",
    emoji: "🍄",
    category: "dinner",
    time: "40 min",
    servings: 4,
    difficulty: "Medium",
    bgClass: "bg-dinner",
    tags: ["Gluten-Free"],
    nutrition: { calories: 440, protein: 10, carbs: 62, fat: 16 },
    ingredients: [
      "1.5 cups arborio rice",
      "300g mixed mushrooms, sliced",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "1/2 cup white wine",
      "4 cups vegetable broth, warm",
      "3 tbsp nutritional yeast",
      "2 tbsp olive oil",
      "1 tbsp vegan butter",
      "Fresh thyme and parsley",
      "Salt and pepper"
    ],
    instructions: [
      "Heat olive oil and saute mushrooms until golden, about 5 minutes. Set aside.",
      "In the same pan, saute onion until soft. Add garlic for 1 minute.",
      "Add arborio rice and stir 2 minutes until lightly toasted.",
      "Pour in white wine and stir until absorbed.",
      "Add warm broth one ladle at a time, stirring frequently, waiting for each to absorb.",
      "Continue for 18-20 minutes until rice is creamy and al dente.",
      "Stir in mushrooms, nutritional yeast, and vegan butter.",
      "Season with salt, pepper, fresh thyme, and parsley."
    ]
  },
  {
    id: 14,
    title: "Black Bean Tacos",
    emoji: "🌮",
    category: "dinner",
    time: "20 min",
    servings: 4,
    difficulty: "Easy",
    bgClass: "bg-dinner",
    tags: ["Under 20 Min", "Gluten-Free", "Kid-Friendly"],
    nutrition: { calories: 380, protein: 14, carbs: 52, fat: 14 },
    ingredients: [
      "8 small corn tortillas",
      "2 cans black beans, drained",
      "1 cup corn kernels",
      "1 avocado, sliced",
      "1/2 cup diced tomatoes",
      "1/4 cup red onion, diced",
      "1 lime",
      "1 tsp cumin",
      "1 tsp smoked paprika",
      "Fresh cilantro",
      "Hot sauce"
    ],
    instructions: [
      "Heat black beans with cumin, smoked paprika, salt, and pepper.",
      "Lightly mash some beans for texture, leaving others whole.",
      "Warm corn tortillas in a dry pan until pliable.",
      "Fill each tortilla with seasoned black beans.",
      "Top with corn, diced tomatoes, red onion, and avocado slices.",
      "Squeeze lime juice over the top.",
      "Garnish with fresh cilantro and hot sauce."
    ]
  },

  // === DESSERTS ===
  {
    id: 5,
    title: "Chocolate Peanut Butter Cups",
    emoji: "🍫",
    category: "desserts",
    time: "20 min",
    servings: 12,
    difficulty: "Easy",
    bgClass: "bg-desserts",
    tags: ["Gluten-Free", "Under 20 Min"],
    nutrition: { calories: 160, protein: 4, carbs: 14, fat: 10 },
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
      "Melt dark chocolate chips with coconut oil until smooth.",
      "Spoon 1 tbsp melted chocolate into each liner, coating the bottom.",
      "Freeze for 10 minutes until set.",
      "Mix peanut butter with maple syrup and sea salt.",
      "Add 1 tsp peanut butter mixture on each chocolate base.",
      "Pour remaining chocolate over to cover completely.",
      "Sprinkle flaky sea salt. Freeze 15 minutes until set.",
      "Store in the fridge."
    ]
  },
  {
    id: 9,
    title: "No-Bake Mango Cheesecake",
    emoji: "🥭",
    category: "desserts",
    time: "30 min",
    servings: 8,
    difficulty: "Medium",
    bgClass: "bg-desserts",
    tags: ["Gluten-Free"],
    nutrition: { calories: 340, protein: 8, carbs: 32, fat: 22 },
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
      "Process almonds until crumbly. Add dates, coconut oil, and salt. Process until sticky.",
      "Press base into a lined 8-inch springform pan. Freeze while making filling.",
      "Drain cashews and blend with mango flesh.",
      "Add coconut cream, maple syrup, coconut oil, lime juice, and vanilla.",
      "Blend 2-3 minutes until silky smooth.",
      "Pour filling over base and smooth the top.",
      "Freeze at least 4 hours or overnight.",
      "Remove 20 minutes before serving. Top with mango and mint."
    ]
  },
  {
    id: 15,
    title: "Coconut Chia Pudding",
    emoji: "🥥",
    category: "desserts",
    time: "10 min",
    servings: 2,
    difficulty: "Easy",
    bgClass: "bg-desserts",
    tags: ["Gluten-Free", "Under 20 Min", "Nut-Free"],
    nutrition: { calories: 280, protein: 6, carbs: 32, fat: 16 },
    ingredients: [
      "1/3 cup chia seeds",
      "1 cup coconut milk",
      "2 tbsp maple syrup",
      "1/2 tsp vanilla extract",
      "Fresh fruit for topping",
      "Toasted coconut flakes",
      "Granola"
    ],
    instructions: [
      "Mix chia seeds, coconut milk, maple syrup, and vanilla in a jar.",
      "Stir well, making sure no clumps remain.",
      "Cover and refrigerate for at least 4 hours or overnight.",
      "Stir again before serving.",
      "Top with fresh fruit, toasted coconut, and granola.",
      "Enjoy cold!"
    ]
  },
  {
    id: 16,
    title: "Vegan Brownie Bites",
    emoji: "🍪",
    category: "desserts",
    time: "25 min",
    servings: 16,
    difficulty: "Easy",
    bgClass: "bg-desserts",
    tags: ["Kid-Friendly"],
    nutrition: { calories: 140, protein: 3, carbs: 20, fat: 6 },
    ingredients: [
      "1 can black beans, drained and rinsed",
      "1/3 cup cocoa powder",
      "1/3 cup maple syrup",
      "3 tbsp coconut oil, melted",
      "1 tsp vanilla extract",
      "1/2 cup oat flour",
      "1/2 tsp baking powder",
      "Pinch of salt",
      "1/3 cup vegan chocolate chips"
    ],
    instructions: [
      "Preheat oven to 175C/350F. Line a baking pan with parchment.",
      "Blend black beans, cocoa powder, maple syrup, coconut oil, and vanilla until smooth.",
      "Mix in oat flour, baking powder, and salt.",
      "Fold in chocolate chips.",
      "Pour into pan and spread evenly.",
      "Bake 18-20 minutes until set but still fudgy.",
      "Cool completely before cutting into bites."
    ]
  },

  // === SMOOTHIES ===
  {
    id: 17,
    title: "Tropical Green Smoothie",
    emoji: "🥝",
    category: "smoothies",
    time: "5 min",
    servings: 1,
    difficulty: "Easy",
    bgClass: "bg-smoothies",
    tags: ["Gluten-Free", "Under 20 Min", "Nut-Free"],
    nutrition: { calories: 240, protein: 4, carbs: 52, fat: 3 },
    ingredients: [
      "1 cup spinach",
      "1 frozen banana",
      "1/2 cup frozen mango",
      "1/2 cup pineapple chunks",
      "1 cup coconut water",
      "1 tbsp flax seeds",
      "Squeeze of lime"
    ],
    instructions: [
      "Add spinach and coconut water to the blender first.",
      "Blend until spinach is fully broken down.",
      "Add frozen banana, mango, and pineapple.",
      "Add flax seeds and a squeeze of lime.",
      "Blend on high until smooth and creamy.",
      "Pour into a glass and enjoy immediately!"
    ]
  },
  {
    id: 18,
    title: "Chocolate Protein Shake",
    emoji: "🍫",
    category: "smoothies",
    time: "5 min",
    servings: 1,
    difficulty: "Easy",
    bgClass: "bg-smoothies",
    tags: ["High-Protein", "Under 20 Min", "Gluten-Free"],
    nutrition: { calories: 350, protein: 22, carbs: 42, fat: 12 },
    ingredients: [
      "1 frozen banana",
      "2 tbsp cocoa powder",
      "2 tbsp peanut butter",
      "1 scoop vegan protein powder",
      "1 cup oat milk",
      "1 tbsp maple syrup",
      "Pinch of cinnamon",
      "Ice cubes"
    ],
    instructions: [
      "Add all ingredients to a high-speed blender.",
      "Blend on high for 60 seconds until smooth and creamy.",
      "Add more oat milk if too thick, or more ice if too thin.",
      "Pour into a glass.",
      "Enjoy as a post-workout recovery drink!"
    ]
  },
  {
    id: 19,
    title: "Berry Beet Power Smoothie",
    emoji: "🫐",
    category: "smoothies",
    time: "5 min",
    servings: 1,
    difficulty: "Easy",
    bgClass: "bg-smoothies",
    tags: ["Gluten-Free", "Under 20 Min", "Nut-Free"],
    nutrition: { calories: 220, protein: 5, carbs: 48, fat: 2 },
    ingredients: [
      "1/2 cup frozen mixed berries",
      "1/2 small cooked beet, chopped",
      "1 frozen banana",
      "1 cup almond milk",
      "1 tbsp hemp seeds",
      "1 tsp honey or maple syrup"
    ],
    instructions: [
      "Add almond milk and beet to the blender first.",
      "Blend until beet is smooth.",
      "Add frozen berries, banana, hemp seeds, and sweetener.",
      "Blend on high until vibrant and smooth.",
      "Pour into a glass and enjoy the natural energy boost!"
    ]
  },
  {
    id: 20,
    title: "Matcha Banana Smoothie",
    emoji: "🍵",
    category: "smoothies",
    time: "5 min",
    servings: 1,
    difficulty: "Easy",
    bgClass: "bg-smoothies",
    tags: ["Gluten-Free", "Under 20 Min"],
    nutrition: { calories: 280, protein: 6, carbs: 48, fat: 8 },
    ingredients: [
      "1 tsp matcha powder",
      "1 frozen banana",
      "1/2 cup frozen mango",
      "1 cup oat milk",
      "1 tbsp almond butter",
      "1 tsp vanilla extract",
      "1 tbsp maple syrup"
    ],
    instructions: [
      "Add matcha powder and a splash of warm oat milk. Whisk to dissolve.",
      "Add remaining oat milk, frozen banana, mango, almond butter, vanilla, and maple syrup.",
      "Blend on high until smooth and creamy.",
      "Pour into a glass.",
      "Enjoy the calm, sustained energy from matcha!"
    ]
  },

  // === SNACKS ===
  {
    id: 21,
    title: "Crispy Baked Chickpeas",
    emoji: "🫘",
    category: "snacks",
    time: "35 min",
    servings: 4,
    difficulty: "Easy",
    bgClass: "bg-snacks",
    tags: ["Gluten-Free", "High-Protein", "Nut-Free"],
    nutrition: { calories: 180, protein: 10, carbs: 24, fat: 6 },
    ingredients: [
      "2 cans chickpeas, drained and patted dry",
      "2 tbsp olive oil",
      "1 tsp smoked paprika",
      "1/2 tsp garlic powder",
      "1/2 tsp cumin",
      "1/4 tsp cayenne pepper",
      "Salt to taste"
    ],
    instructions: [
      "Preheat oven to 200C/400F.",
      "Pat chickpeas very dry with paper towels (key to crispiness!).",
      "Toss with olive oil and all spices.",
      "Spread in a single layer on a lined baking sheet.",
      "Bake 25-30 minutes, shaking pan halfway, until golden and crunchy.",
      "Let cool completely for maximum crunch.",
      "Store in an open container to maintain crispiness."
    ]
  },
  {
    id: 22,
    title: "Energy Date Balls",
    emoji: "🟤",
    category: "snacks",
    time: "15 min",
    servings: 12,
    difficulty: "Easy",
    bgClass: "bg-snacks",
    tags: ["Gluten-Free", "Under 20 Min"],
    nutrition: { calories: 120, protein: 3, carbs: 16, fat: 6 },
    ingredients: [
      "1 cup pitted Medjool dates",
      "1/2 cup rolled oats",
      "1/4 cup peanut butter",
      "2 tbsp cocoa powder",
      "2 tbsp coconut flakes",
      "1 tbsp chia seeds",
      "Pinch of salt"
    ],
    instructions: [
      "Add all ingredients to a food processor.",
      "Pulse until mixture comes together and is sticky.",
      "If too dry, add 1-2 tsp water.",
      "Roll into 12 balls using your hands.",
      "Optionally roll in extra coconut flakes or cocoa powder.",
      "Refrigerate for 30 minutes to firm up.",
      "Store in the fridge for up to 2 weeks."
    ]
  },
  {
    id: 23,
    title: "Guacamole & Veggie Sticks",
    emoji: "🥑",
    category: "snacks",
    time: "10 min",
    servings: 4,
    difficulty: "Easy",
    bgClass: "bg-snacks",
    tags: ["Gluten-Free", "Under 20 Min", "Nut-Free", "Kid-Friendly"],
    nutrition: { calories: 200, protein: 3, carbs: 14, fat: 16 },
    ingredients: [
      "2 ripe avocados",
      "1 lime, juiced",
      "1/4 cup red onion, finely diced",
      "1 small tomato, diced",
      "1/4 cup fresh cilantro, chopped",
      "1 jalapeno, seeded and minced (optional)",
      "Salt to taste",
      "Carrot sticks, celery, bell pepper strips for dipping"
    ],
    instructions: [
      "Cut avocados in half, remove pit, and scoop into a bowl.",
      "Mash with a fork to desired chunkiness.",
      "Add lime juice, red onion, tomato, cilantro, and jalapeno.",
      "Mix gently and season with salt.",
      "Serve immediately with fresh veggie sticks.",
      "Press plastic wrap directly on surface to store and prevent browning."
    ]
  },
  {
    id: 24,
    title: "Spiced Trail Mix",
    emoji: "🥜",
    category: "snacks",
    time: "15 min",
    servings: 8,
    difficulty: "Easy",
    bgClass: "bg-snacks",
    tags: ["Gluten-Free", "Under 20 Min"],
    nutrition: { calories: 220, protein: 6, carbs: 18, fat: 16 },
    ingredients: [
      "1 cup mixed nuts (almonds, cashews, walnuts)",
      "1/2 cup pumpkin seeds",
      "1/2 cup dried cranberries",
      "1/4 cup dark chocolate chips",
      "1/4 cup coconut flakes",
      "1 tbsp maple syrup",
      "1/2 tsp cinnamon",
      "1/4 tsp cayenne pepper",
      "Pinch of sea salt"
    ],
    instructions: [
      "Preheat oven to 175C/350F.",
      "Toss nuts and pumpkin seeds with maple syrup, cinnamon, cayenne, and salt.",
      "Spread on a lined baking sheet.",
      "Bake 10-12 minutes until fragrant and lightly toasted.",
      "Let cool completely.",
      "Mix in dried cranberries, chocolate chips, and coconut flakes.",
      "Store in an airtight container for up to 2 weeks."
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

// ===== State =====
let favorites = JSON.parse(localStorage.getItem("veganBitesFavorites")) || [];
let ratings = JSON.parse(localStorage.getItem("veganBitesRatings")) || {};
let currentSearchTerm = "";
let activeTagFilter = "";

// ===== Cooking Timer State =====
let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;
let timerRecipeTitle = "";

// ===== Render Recipe Cards =====
function renderRecipes(filter = "all", searchTerm = "") {
  let filtered = recipes;

  if (filter === "favorites") {
    filtered = recipes.filter(r => favorites.includes(r.id));
  } else if (filter !== "all") {
    filtered = recipes.filter(r => r.category === filter);
  }

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(r =>
      r.title.toLowerCase().includes(term) ||
      r.category.toLowerCase().includes(term) ||
      r.ingredients.some(i => i.toLowerCase().includes(term)) ||
      (r.tags && r.tags.some(t => t.toLowerCase().includes(term)))
    );
  }

  if (activeTagFilter) {
    filtered = filtered.filter(r => r.tags && r.tags.includes(activeTagFilter));
  }

  recipeGrid.innerHTML = "";

  if (filtered.length === 0) {
    recipeGrid.innerHTML = `
      <div class="no-results" style="grid-column: 1 / -1;">
        <span class="no-results-emoji">🔍</span>
        <p>${filter === "favorites" ? "No favorites yet -- start exploring and tap the heart!" : "No recipes found. Try a different search term."}</p>
      </div>
    `;
    return;
  }

  filtered.forEach((recipe, index) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.setAttribute("data-category", recipe.category);
    card.style.transitionDelay = `${index * 0.06}s`;

    const isFav = favorites.includes(recipe.id);
    const avgRating = ratings[recipe.id] || 0;
    const starsDisplay = avgRating > 0 ? "★".repeat(avgRating) + "☆".repeat(5 - avgRating) : "";

    const tagsHtml = recipe.tags ? recipe.tags.map(t =>
      `<span class="dietary-tag" data-tag="${t}">${t}</span>`
    ).join("") : "";

    card.innerHTML = `
      <div class="recipe-card-image ${recipe.bgClass}">
        <span>${recipe.emoji}</span>
        <button class="favorite-btn ${isFav ? "favorited" : ""}" data-id="${recipe.id}" aria-label="Toggle favorite">
          ${isFav ? "❤️" : "🤍"}
        </button>
      </div>
      <div class="recipe-card-body">
        <span class="recipe-category-tag">${recipe.category}</span>
        ${starsDisplay ? `<span class="recipe-stars">${starsDisplay}</span>` : ""}
        <h3>${recipe.title}</h3>
        ${tagsHtml ? `<div class="recipe-tags">${tagsHtml}</div>` : ""}
        <div class="recipe-meta">
          <span>⏱ ${recipe.time}</span>
          <span>🍽 ${recipe.servings} servings</span>
          <span>📊 ${recipe.difficulty}</span>
        </div>
        <div class="recipe-nutrition-mini">
          <span class="nut-badge nut-cal">${recipe.nutrition.calories} cal</span>
          <span class="nut-badge nut-protein">${recipe.nutrition.protein}g protein</span>
        </div>
        <button class="btn btn-primary view-recipe-btn" data-id="${recipe.id}">View Recipe</button>
      </div>
    `;

    recipeGrid.appendChild(card);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.classList.add("visible");
      });
    });
  });

  // Event listeners
  document.querySelectorAll(".view-recipe-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      createRipple(e);
      openModal(Number(btn.dataset.id));
    });
  });

  document.querySelectorAll(".favorite-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(Number(btn.dataset.id));
    });
  });

  document.querySelectorAll(".dietary-tag").forEach(tag => {
    tag.addEventListener("click", (e) => {
      e.stopPropagation();
      const tagName = tag.dataset.tag;
      if (activeTagFilter === tagName) {
        activeTagFilter = "";
        showToast("Filter cleared");
      } else {
        activeTagFilter = tagName;
        showToast("Filtering: " + tagName);
      }
      const activeFilter = document.querySelector(".filter-btn.active").dataset.filter;
      renderRecipes(activeFilter, currentSearchTerm);
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

  // Nutrition info
  const nutritionArea = document.getElementById("modalNutrition");
  if (nutritionArea && recipe.nutrition) {
    nutritionArea.innerHTML = `
      <div class="nutrition-grid">
        <div class="nutrition-item nut-cal"><strong>${recipe.nutrition.calories}</strong><small>Calories</small></div>
        <div class="nutrition-item nut-protein"><strong>${recipe.nutrition.protein}g</strong><small>Protein</small></div>
        <div class="nutrition-item nut-carbs"><strong>${recipe.nutrition.carbs}g</strong><small>Carbs</small></div>
        <div class="nutrition-item nut-fat"><strong>${recipe.nutrition.fat}g</strong><small>Fat</small></div>
      </div>
    `;
  }

  // Star rating
  const ratingArea = document.getElementById("modalRating");
  if (ratingArea) {
    const current = ratings[recipe.id] || 0;
    ratingArea.innerHTML = `
      <div class="star-rating" data-recipe-id="${recipe.id}">
        ${[1,2,3,4,5].map(i => `<span class="star ${i <= current ? 'filled' : ''}" data-value="${i}">★</span>`).join("")}
        <span class="rating-text">${current > 0 ? current + '/5' : 'Rate this recipe'}</span>
      </div>
    `;
    ratingArea.querySelectorAll(".star").forEach(star => {
      star.addEventListener("click", () => {
        const val = Number(star.dataset.value);
        const rid = Number(star.parentElement.dataset.recipeId);
        ratings[rid] = val;
        localStorage.setItem("veganBitesRatings", JSON.stringify(ratings));
        openModal(rid);
        showToast("⭐ Rated " + val + "/5!");
        const activeFilter = document.querySelector(".filter-btn.active").dataset.filter;
        renderRecipes(activeFilter, currentSearchTerm);
      });
    });
  }

  modalIngredients.innerHTML = recipe.ingredients.map(i => `<li>${i}</li>`).join("");
  modalInstructions.innerHTML = recipe.instructions.map(s => `<li>${s}</li>`).join("");

  // Timer
  const timerArea = document.getElementById("modalTimer");
  if (timerArea) {
    const mins = parseInt(recipe.time) || 10;
    timerArea.innerHTML = `
      <div class="timer-controls">
        <h3>⏲️ Cooking Timer</h3>
        <div class="timer-row">
          <input type="number" id="timerMinutes" value="${mins}" min="1" max="180" class="timer-input"> <span>min</span>
          <button class="btn btn-primary timer-start-btn" id="timerStartBtn">Start</button>
          <button class="btn btn-outline timer-pause-btn" id="timerPauseBtn" style="display:none;">Pause</button>
          <button class="btn btn-outline timer-reset-btn" id="timerResetBtn" style="display:none;">Reset</button>
        </div>
        <div class="timer-display" id="timerDisplay" style="display:none;">00:00</div>
      </div>
    `;
    timerRecipeTitle = recipe.title;
    setupTimerEvents();
  }

  recipeModal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Focus trap
  const modal = recipeModal.querySelector('.modal');
  const focusable = modal.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])');
  if (focusable.length > 0) focusable[0].focus();
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

// ===== Timer =====
function setupTimerEvents() {
  const startBtn = document.getElementById("timerStartBtn");
  const pauseBtn = document.getElementById("timerPauseBtn");
  const resetBtn = document.getElementById("timerResetBtn");
  const display = document.getElementById("timerDisplay");
  const minInput = document.getElementById("timerMinutes");

  if (!startBtn) return;

  startBtn.addEventListener("click", () => {
    if (!timerRunning) {
      timerSeconds = parseInt(minInput.value) * 60;
      timerRunning = true;
      startBtn.style.display = "none";
      pauseBtn.style.display = "inline-flex";
      resetBtn.style.display = "inline-flex";
      display.style.display = "block";
      minInput.disabled = true;
      runTimer(display);
    }
  });

  pauseBtn.addEventListener("click", () => {
    if (timerRunning) {
      timerRunning = false;
      clearInterval(timerInterval);
      pauseBtn.textContent = "Resume";
    } else {
      timerRunning = true;
      pauseBtn.textContent = "Pause";
      runTimer(display);
    }
  });

  resetBtn.addEventListener("click", () => {
    timerRunning = false;
    clearInterval(timerInterval);
    timerSeconds = 0;
    display.textContent = "00:00";
    display.style.display = "none";
    startBtn.style.display = "inline-flex";
    pauseBtn.style.display = "none";
    resetBtn.style.display = "none";
    pauseBtn.textContent = "Pause";
    minInput.disabled = false;
    hideMiniTimer();
  });
}

function runTimer(display) {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      display.textContent = "Done!";
      playTimerBeep();
      showToast("⏲️ Timer done for " + timerRecipeTitle + "!");
      hideMiniTimer();
      return;
    }
    timerSeconds--;
    const m = Math.floor(timerSeconds / 60);
    const s = timerSeconds % 60;
    const timeStr = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    display.textContent = timeStr;
    updateMiniTimer(timeStr);
  }, 1000);
}

function playTimerBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      gain.gain.value = 0.3;
      osc.start(ctx.currentTime + i * 0.3);
      osc.stop(ctx.currentTime + i * 0.3 + 0.2);
    }
  } catch (e) { /* audio not supported */ }
}

function updateMiniTimer(timeStr) {
  let mini = document.getElementById("miniTimer");
  if (!mini) {
    mini = document.createElement("div");
    mini.id = "miniTimer";
    mini.className = "mini-timer";
    document.body.appendChild(mini);
  }
  mini.textContent = "⏲️ " + timeStr;
  mini.style.display = "block";
}

function hideMiniTimer() {
  const mini = document.getElementById("miniTimer");
  if (mini) mini.style.display = "none";
}

// ===== Print Recipe =====
function printRecipe() {
  const recipe = recipes.find(r => r.title === modalTitle.textContent);
  if (!recipe) return;
  const printWin = window.open("", "_blank");
  printWin.document.write(`
    <!DOCTYPE html>
    <html><head><title>${recipe.title} - Vegan Bites</title>
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 40px auto; padding: 0 20px; color: #333; }
      h1 { font-size: 1.8rem; margin-bottom: 8px; }
      .meta { color: #666; margin-bottom: 20px; }
      h2 { font-size: 1.2rem; margin-top: 24px; color: #2d8a4e; }
      ul, ol { padding-left: 20px; }
      li { margin-bottom: 6px; line-height: 1.6; }
      .nutrition { display: flex; gap: 16px; margin: 12px 0; }
      .nutrition span { background: #f0f0f0; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; }
      .footer { margin-top: 40px; border-top: 1px solid #ddd; padding-top: 12px; font-size: 0.8rem; color: #999; }
    </style></head><body>
    <h1>${recipe.emoji} ${recipe.title}</h1>
    <div class="meta">⏱ ${recipe.time} | 🍽 ${recipe.servings} servings | 📊 ${recipe.difficulty}</div>
    <div class="nutrition">
      <span>${recipe.nutrition.calories} cal</span>
      <span>${recipe.nutrition.protein}g protein</span>
      <span>${recipe.nutrition.carbs}g carbs</span>
      <span>${recipe.nutrition.fat}g fat</span>
    </div>
    <h2>Ingredients</h2>
    <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
    <h2>Instructions</h2>
    <ol>${recipe.instructions.map(s => `<li>${s}</li>`).join("")}</ol>
    <div class="footer">Printed from Vegan Bites | veganbites.com</div>
    </body></html>
  `);
  printWin.document.close();
  printWin.print();
}

// ===== Share Recipe =====
function shareRecipe() {
  const recipe = recipes.find(r => r.title === modalTitle.textContent);
  if (!recipe) return;
  const text = `Check out this vegan recipe: ${recipe.title} ${recipe.emoji} - from Vegan Bites!`;
  const url = window.location.href;

  if (navigator.share) {
    navigator.share({ title: recipe.title, text: text, url: url }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text + " " + url).then(() => {
      showToast("📋 Recipe link copied to clipboard!");
    }).catch(() => {
      showToast("Share: " + text);
    });
  }
}

// ===== Favorites =====
function toggleFavorite(id) {
  const index = favorites.indexOf(id);
  if (index === -1) {
    favorites.push(id);
    showToast("❤️ Added to favorites!");
    createHeartBurst();
  } else {
    favorites.splice(index, 1);
    showToast("💔 Removed from favorites");
  }
  localStorage.setItem("veganBitesFavorites", JSON.stringify(favorites));
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

// ===== Theme Picker =====
(function() {
  const picker = document.getElementById('themePicker');
  if (!picker) return;

  const saved = localStorage.getItem('veganBitesAccent') || 'green';
  applyAccentTheme(saved);

  picker.querySelectorAll('.theme-color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.accent;
      applyAccentTheme(theme);
      localStorage.setItem('veganBitesAccent', theme);
      showToast("🎨 Theme changed!");
    });
  });
})();

function applyAccentTheme(theme) {
  const themes = {
    green: { primary: '#2d8a4e', primaryDark: '#1e6b3a', primaryLight: '#e8f5e9' },
    purple: { primary: '#7b1fa2', primaryDark: '#4a148c', primaryLight: '#f3e5f5' },
    orange: { primary: '#e65100', primaryDark: '#bf360c', primaryLight: '#fff3e0' },
    blue: { primary: '#1565c0', primaryDark: '#0d47a1', primaryLight: '#e3f2fd' }
  };
  const t = themes[theme] || themes.green;
  document.documentElement.style.setProperty('--primary', t.primary);
  document.documentElement.style.setProperty('--primary-dark', t.primaryDark);
  document.documentElement.style.setProperty('--primary-light', t.primaryLight);

  document.querySelectorAll('.theme-color-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`.theme-color-btn[data-accent="${theme}"]`);
  if (activeBtn) activeBtn.classList.add('active');
}

// ===== Scroll Effects =====
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");

  if (window.scrollY > 500) backToTopBtn.classList.add("visible");
  else backToTopBtn.classList.remove("visible");

  updateActiveNav();
  updateScrollProgress();
});

// ===== Scroll Progress Bar =====
function updateScrollProgress() {
  const bar = document.getElementById("scrollProgressBar");
  if (!bar) return;
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
  bar.style.width = scrolled + "%";
}

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

// ===== Testimonials Carousel =====
(function() {
  const track = document.getElementById("testimonialTrack");
  const prevBtn = document.getElementById("testimonialPrev");
  const nextBtn = document.getElementById("testimonialNext");
  if (!track) return;

  let pos = 0;
  let autoScroll;
  const cards = track.querySelectorAll(".testimonial-card");
  const cardCount = cards.length;

  function getCardWidth() {
    const card = cards[0];
    if (!card) return 320;
    return card.offsetWidth + 24;
  }

  function scrollTo(index) {
    pos = index;
    if (pos >= cardCount) pos = 0;
    if (pos < 0) pos = cardCount - 1;
    track.style.transform = `translateX(-${pos * getCardWidth()}px)`;
  }

  function startAuto() {
    autoScroll = setInterval(() => scrollTo(pos + 1), 4000);
  }

  function stopAuto() {
    clearInterval(autoScroll);
  }

  if (nextBtn) nextBtn.addEventListener("click", () => { stopAuto(); scrollTo(pos + 1); startAuto(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { stopAuto(); scrollTo(pos - 1); startAuto(); });

  track.addEventListener("mouseenter", stopAuto);
  track.addEventListener("mouseleave", startAuto);

  startAuto();
})();

// ===== Micro-interactions: Ripple =====
function createRipple(e) {
  const btn = e.currentTarget;
  const ripple = document.createElement("span");
  ripple.className = "ripple-effect";
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
  ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

// ===== Micro-interactions: Heart Burst =====
function createHeartBurst() {
  const emojis = ["❤️", "💚", "💛", "💜", "🧡"];
  for (let i = 0; i < 6; i++) {
    const el = document.createElement("div");
    el.className = "heart-burst";
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = (50 + (Math.random() - 0.5) * 60) + "%";
    el.style.animationDelay = (i * 0.1) + "s";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  }
}

// ===== Scroll Animations =====
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

  document.querySelectorAll(".category-card, .about-card, .testimonial-card").forEach(el => {
    el.classList.add("animate-on-scroll");
    observer.observe(el);
  });
}

// ===== Cookie Consent =====
(function() {
  if (localStorage.getItem("veganBitesCookieConsent")) return;
  const banner = document.getElementById("cookieConsent");
  if (!banner) return;
  banner.style.display = "flex";

  const acceptBtn = document.getElementById("cookieAccept");
  const declineBtn = document.getElementById("cookieDecline");

  if (acceptBtn) acceptBtn.addEventListener("click", () => {
    localStorage.setItem("veganBitesCookieConsent", "accepted");
    banner.style.display = "none";
  });
  if (declineBtn) declineBtn.addEventListener("click", () => {
    localStorage.setItem("veganBitesCookieConsent", "declined");
    banner.style.display = "none";
  });
})();

// ===== PWA Service Worker Registration =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

// ===== Page Transition =====
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");
});

// ===== Initialize =====
document.addEventListener("DOMContentLoaded", () => {
  renderRecipes();
  initScrollAnimations();
  updateScrollProgress();

  // Apply saved accent
  const savedAccent = localStorage.getItem('veganBitesAccent') || 'green';
  applyAccentTheme(savedAccent);
});
