import { QuizData } from '@vuo/models/QuizTypes';

const mockQuizData: QuizData[] = [
  {
    id: 'food-quiz-001',
    title: 'Delicious Food Quiz',
    questions: [
      {
        id: 'q1',
        type: 'slider',
        question: 'How many minutes does it typically take to cook spaghetti?',
        correctAnswer: ['10'],
      },
      {
        id: 'q2',
        type: 'single-choice',
        question: 'Which cuisine is sushi from?',
        options: ['Chinese', 'Japanese', 'Korean', 'Thai'],
        correctAnswer: ['Japanese'],
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'Which of the following are types of pasta?',
        options: ['Penne', 'Fusilli', 'Ravioli', 'Risotto'],
        correctAnswer: ['Penne', 'Fusilli', 'Ravioli'],
      },
      {
        id: 'q4',
        type: 'text-input',
        question: 'What is the main ingredient in guacamole?',
        correctAnswer: ['avocado'],
      }

    ],
  },
  {
    id: 'temperature-probe-quiz-001',
    title: 'Temperature Probe Quiz',
    questions: [
      {
        id: 'q5',
        type: 'multiple-choice',
        question: 'Why are temperature probes an essential tool for cooking?',
        options: [
          'Makes you look professional',
          'Accuracy',
          'The hole left helps cook the inside',
          'Less time spent constantly checking the temperature',
          'Avoids undercooking and overcooking'
        ],
        correctAnswer: [
          'Accuracy',
          'Less time spent constantly checking the temperature',
          'Avoids undercooking and overcooking'
        ]
      },
      {
        id: 'q6',
        type: 'single-choice',
        question: 'Where should you generally insert a probe when checking internal temperature?',
        options: [
          'Thinnest part',
          'Just under the surface',
          'Right by the bone',
          'Thickest part'
        ],
        correctAnswer: ['Thickest part'],
        feedbackTitle: [
          'The inside skinny',
          'Shallow answer',
          'Bad to the bone',
          'Thick brain!'
        ],
        feedbackMessage: [
          'This part will be the first to cook, so you risk undercooking thicker parts if you measure from here!',
          'Things measure from the outside in, so the outside will be done well before any deeper parts.',
          'The bone will transfer heat faster the the meat. It will show a higher temperature than the meat, so the measurements won\'t actually measure the meat temperature.',
          'The thickest part is the last one to get cooked, so if this part is at the right temperature the rest of the meat must be cooked.'
        ]
      },
      {
        id: 'q7',
        type: 'single-choice',
        question: 'What is the advantage of an oven probe-style thermometer?',
        options: [
          "It doesn't need batteries",
          "It's the smallest type",
          "It's the most accurate",
          'You can leave it in during cooking'
        ],
        correctAnswer: ['You can leave it in during cooking'],
        feedbackTitle: [
          'Not quite',
          'Everyone is different',
          'Not quite accurate',
          'Just forget about it'
        ],
        feedbackMessage: [
          "There are analog and digital probe-style thermometers. Also, other types of thermometer might not require batteries either.",
          "All thermometers come in a different range of sizes. Although there might be smaller options, it is not an intrinsic quality of this type of thermometer.",
          "They are as accurate as any other, depending on the quality of the thermometer.",
          'Leave-in thermometers are great in that they can just be left there to measure while you do something else. Some even might beep when the probe reaches a certain temperature.'
        ]
      }
    ],
  },
  {
    id: 'slice-evaluation-quiz-001',
    title: 'Slice Evaluation Quiz',
    questions: [
      {
        id: 'q8',
        type: 'single-choice',
        question: 'Why is the tomato getting smashed rather than sliced?',
        options: [
          'It missbehaved',
          'The cutting board is the wrong type',
          'Bad chef',
          'Dull Knife'
        ],
        correctAnswer: ['Dull Knife'],
        feedbackMessage: [
          "The tomato looks fresh, unblemished and with the right color. That tomato did not missbehave!",
          'Although some cutting boards might be better for certain tasks, this cutting board is perfect for this job.',
          "Technique plays a part, but in this case something else is not allowing for a sharp cut.",
          'A blunt knife will squish food rather than cut it. It\'s paradoxical, but a sharp knife is always safer than a dull one when cooking.'
        ],
        feedbackTitle: [
          'There ain\'t no way!',
          'Wood is fine',
          "Don't blame yourself",
          'Wicked sharp'
        ]
      },
      {
        id: 'q9',
        type: 'single-choice',
        question: 'What is the best angle to sharpen a chef\'s knife?',
        options: [
          '5 degrees',
          '15 degrees',
          '30 degrees',
          '45 degrees'
        ],
        correctAnswer: ['15 degrees'],
        feedbackMessage: [
          'Too shallow for effective sharpening.',
          'Correct! 15 degrees is ideal for a sharp edge.',
          'Too steep, might damage the blade.',
          'Way too steep for a chef\'s knife.'
        ],
        feedbackTitle: [
          'Too Shallow',
          'Perfect Angle',
          'Too Steep',
          'Excessive Angle'
        ]
      },
      {
        id: 'q10',
        type: 'multiple-choice',
        question: 'Which of these are signs of a dull knife?',
        options: [
          'Difficulty cutting through tomatoes',
          'Smooth, clean cuts',
          'Slipping off the surface of vegetables',
          'Requires more force to cut'
        ],
        correctAnswer: ['Difficulty cutting through tomatoes', 'Slipping off the surface of vegetables', 'Requires more force to cut'],
        feedbackMessage: ['A dull knife struggles with soft foods, slips, and requires more force.'],
      },
      {
        id: 'q11',
        type: 'single-choice',
        question: 'What is the safest way to store knives?',
        options: [
          'In a drawer',
          'On a magnetic strip',
          'In a knife block',
          'Loose in a utensil holder'
        ],
        correctAnswer: ['In a knife block'],
        feedbackMessage: [
          'This can damage the blade and is unsafe.',
          'Magnetic strips are safe but can be risky if not mounted securely.',
          'Correct! Knife blocks protect the blade and are safe.',
          'This is unsafe and can damage the knives.'
        ],
        feedbackTitle: [
          'Unsafe Storage',
          'Secure but Risky',
          'Safe and Secure',
          'Unsafe and Damaging'
        ]
      },
      {
        id: 'q17',
        type: 'single-choice',
        question: 'Why should you avoid using glass cutting boards?',
        options: [
          'They are too heavy',
          'They dull knives quickly',
          'They are too slippery',
          'They are hard to clean'
        ],
        correctAnswer: ['They dull knives quickly'],
        feedbackMessage: [
          'Weight is not the main issue.',
          'Correct! Glass surfaces dull knives faster.',
          'While they can be slippery, dulling is the main concern.',
          'They are actually easy to clean.'
        ],
        feedbackTitle: [
          'Weighty Issue',
          'Knife Dulling',
          'Slippery Surface',
          'Cleaning Ease'
        ]
      }
    ],
  },
  {
    id: 'whisk-evaluation-quiz-001',
    title: 'Whisk Evaluation Quiz',
    questions: [
      {
        id: 'q12',
        type: 'single-choice',
        question: 'You should always move your whisk in a quick, circular motion',
        options: [
          'True',
          'False'
        ],
        correctAnswer: ['False'],
        feedbackMessage: [
          'Different whisking techniques are needed in different recipes.',
          'You need different types of movement and speeds depending on the desired outcome.'
        ],
        feedbackTitle: [
          'Stir crazy',
          'Whisked up'
        ]
      },
      {
        id: 'q13',
        type: 'single-choice',
        question: 'What is the purpose of whisking egg whites?',
        options: [
          'To add flavor',
          'To incorporate air',
          'To change color',
          'To make them heavier'
        ],
        correctAnswer: ['To incorporate air'],
        feedbackMessage: [
          'Whisking doesn\'t add flavor.',
          'Correct! Whisking incorporates air, making them light and fluffy.',
          'Whisking doesn\'t change the color.',
          'Whisking actually makes them lighter.'
        ],
        feedbackTitle: [
          'Flavorless',
          'Airy Delight',
          'Colorless',
          'Light as Air'
        ]
      },
      {
        id: 'q14',
        type: 'multiple-choice',
        question: 'Which tools can be used for whisking?',
        options: [
          'Fork',
          'Balloon whisk',
          'Electric mixer',
          'Rolling pin'
        ],
        correctAnswer: ['Fork', 'Balloon whisk', 'Electric mixer'],
        feedbackMessage: ['A fork, balloon whisk, or electric mixer can be used for whisking, but a rolling pin is not suitable.'],
      },
      {
        id: 'q15',
        type: 'single-choice',
        question: 'What is the best way to clean a whisk?',
        options: [
          'Dishwasher',
          'Hand wash with warm soapy water',
          'Wipe with a damp cloth',
          'Leave it unwashed'
        ],
        correctAnswer: ['Hand wash with warm soapy water'],
        feedbackMessage: [
          'Dishwashers can damage some whisks.',
          'Correct! Hand washing ensures thorough cleaning.',
          'This won\'t clean it properly.',
          'Leaving it unwashed is unhygienic.'
        ],
        feedbackTitle: [
          'Potential Damage',
          'Clean and Safe',
          'Insufficient',
          'Unhygienic'
        ]
      },
      {
        id: 'q16',
        type: 'single-choice',
        question: 'Why is it important to whisk dry ingredients before adding wet ingredients?',
        options: [
          'To make them heavier',
          'To ensure even distribution',
          'To change their color',
          'To add flavor'
        ],
        correctAnswer: ['To ensure even distribution'],
        feedbackMessage: [
          'Whisking doesn\'t change weight.',
          'Correct! It ensures even distribution of ingredients.',
          'Whisking doesn\'t change color.',
          'Whisking doesn\'t add flavor.'
        ],
        feedbackTitle: [
          'Weightless',
          'Even Mix',
          'Colorless',
          'Flavorless'
        ]
      }
    ],
  },
  {
    id: 'knife-skills-001',
    title: 'Essential Knife Skills Quiz',
    questions: [
      {
        id: 'k1',
        type: 'single-choice',
        question: 'What is the proper way to hold a chef\'s knife?',
        options: [
          'Grip the handle tightly with your whole hand',
          'Hold it loosely with your fingertips',
          'Pinch the blade near the handle with thumb and forefinger',
          'Hold it like a tennis racket'
        ],
        correctAnswer: ['Pinch the blade near the handle with thumb and forefinger'],
        feedbackMessage: [
          'A tight grip reduces control and can cause hand fatigue quickly.',
          'This grip is unsafe and gives you very little control over the knife.',
          'This grip (called the pinch grip) gives you the most control and precision while cutting.',
          'This grip gives you poor control and can be dangerous when cutting.'
        ],
        feedbackTitle: [
          'Too tight',
          'Too loose',
          'Perfect pinch',
          'Wrong game'
        ]
      },
      {
        id: 'k2',
        type: 'multiple-choice',
        question: 'Which of these are proper knife safety practices?',
        options: [
          'Always cut away from yourself',
          'Keep your blade sharp',
          'Use a stable cutting board',
          'Catch a falling knife'
        ],
        correctAnswer: ['Always cut away from yourself', 'Keep your blade sharp', 'Use a stable cutting board'],
        feedbackMessage: ['A sharp knife on a stable surface, used with proper technique, is the safest way to cut. Never try to catch a falling knife!']
      },
      {
        id: 'k3',
        type: 'single-choice',
        question: 'What is the "claw" technique used for?',
        options: [
          'Sharpening knives',
          'Protecting your fingers while cutting',
          'Scraping food off the cutting board',
          'Opening cans'
        ],
        correctAnswer: ['Protecting your fingers while cutting'],
        feedbackMessage: [
          'Sharpening requires different techniques.',
          'The claw grip protects your fingertips by keeping them curled while guiding the knife.',
          'Never scrape with the sharp edge of your knife.',
          'Please use a can opener for cans!'
        ],
        feedbackTitle: [
          'Not quite',
          'Perfect',
          'Dangerous',
          'Wrong tool'
        ]
      },
      {
        id: 'k4',
        type: 'text-input',
        question: 'What cutting technique creates very thin, matchstick-sized pieces?',
        correctAnswer: ['julienne'],
        feedbackMessage: ['Julienne is a classic French cutting technique that creates long, thin strips about 1/8 inch thick.']
      },
      {
        id: 'k5',
        type: 'single-choice',
        question: 'When dicing an onion, why do you leave the root end intact?',
        options: [
          'It looks better',
          'It holds the layers together while cutting',
          'It adds more flavor',
          'It makes you cry less'
        ],
        correctAnswer: ['It holds the layers together while cutting'],
        feedbackMessage: [
          'The root end serves a practical purpose.',
          'The root acts as a natural handle and keeps the onion layers together for more controlled cuts.',
          'The root doesn\'t affect the taste.',
          'Crying comes from the sulfur compounds, not the root.'
        ],
        feedbackTitle: [
          'Not about looks',
          'Exactly right',
          'No flavor',
          'If only'
        ]
      }
    ]
  },
  {
    id: 'food-safety-001',
    title: 'Food Safety Essentials',
    questions: [
      {
        id: 'fs1',
        type: 'slider',
        question: 'What is the minimum safe internal temperature (°F) for cooking chicken?',
        correctAnswer: ['165'],
        feedbackMessage: ['165°F (74°C) is the safe minimum internal temperature for chicken to kill harmful bacteria.']
      },
      {
        id: 'fs2',
        type: 'multiple-choice',
        question: 'Which of these need to be refrigerated?',
        options: [
          'Open soy sauce',
          'Ripe bananas',
          'Open mayonnaise',
          'Bread'
        ],
        correctAnswer: ['Open soy sauce', 'Open mayonnaise'],
        feedbackMessage: ['Condiments with eggs (like mayo) and opened fermented products should be refrigerated. Fruits and bread are better stored at room temperature.']
      },
      {
        id: 'fs3',
        type: 'single-choice',
        question: 'How long can cooked food sit at room temperature?',
        options: [
          'Up to 2 hours',
          'Up to 4 hours',
          'Up to 6 hours',
          'Overnight'
        ],
        correctAnswer: ['Up to 2 hours'],
        feedbackMessage: [
          'After 2 hours in the danger zone (40-140°F), bacteria can multiply to dangerous levels.',
          'Food can become unsafe after 2 hours at room temperature.',
          'Bacteria will have multiplied significantly by this time.',
          'Never leave food out overnight: This is very unsafe!'
        ],
        feedbackTitle: [
          'Correct',
          'Too long',
          'Much too long',
          'Never'
        ]
      },
      {
        id: 'fs4',
        type: 'multiple-choice',
        question: 'Which practices help prevent cross-contamination?',
        options: [
          'Using separate cutting boards for raw meat',
          'Washing hands after handling raw meat',
          'Using different utensils for raw and cooked foods',
          'Tasting food with cooking spoons'
        ],
        correctAnswer: ['Using separate cutting boards for raw meat', 'Washing hands after handling raw meat', 'Using different utensils for raw and cooked foods'],
        feedbackMessage: ['Keeping raw and cooked foods separate, along with proper hand washing, are key to preventing foodborne illness.']
      },
      {
        id: 'fs5',
        type: 'single-choice',
        question: 'What\'s the best way to thaw frozen meat?',
        options: [
          'On the counter',
          'In the refrigerator',
          'In hot water',
          'In the microwave on high'
        ],
        correctAnswer: ['In the refrigerator'],
        feedbackMessage: [
          'This puts food in the danger zone for too long.',
          'Slow thawing in the fridge is the safest method.',
          'Hot water can start cooking the outside while the inside is still frozen.',
          'This can partially cook the meat and lead to uneven thawing.'
        ],
        feedbackTitle: [
          'Not safe',
          'Perfect',
          'Risky',
          'Not recommended'
        ]
      }
    ]
  },
  {
    id: 'cooking-methods-001',
    title: 'Cooking Methods Mastery',
    questions: [
      {
        id: 'cm1',
        type: 'single-choice',
        question: 'What\'s the difference between broiling and baking?',
        options: [
          'Broiling uses lower temperature',
          'Broiling uses direct heat from above',
          'Broiling takes longer',
          'There is no difference'
        ],
        correctAnswer: ['Broiling uses direct heat from above'],
        feedbackMessage: [
          'Actually, broiling uses very high heat!',
          'Correct! Broiling uses intense direct heat from above, while baking uses ambient heat all around.',
          'Broiling is actually much faster due to the high heat.',
          'They are quite different cooking methods with different results.'
        ],
        feedbackTitle: [
          'High Heat is Key',
          'Correct!',
          'Speed vs Quality',
          'Important Distinction'
        ]
      },
      {
        id: 'cm2',
        type: 'multiple-choice',
        question: 'Which methods are considered "dry-heat cooking"?',
        options: [
          'Roasting',
          'Grilling',
          'Steaming',
          'Braising'
        ],
        correctAnswer: ['Roasting', 'Grilling'],
        feedbackMessage: ['Dry-heat cooking methods like roasting and grilling don\'t use water or moisture as the primary heat transfer method.'],
      },
      {
        id: 'cm3',
        type: 'single-choice',
        question: 'What is the main purpose of searing meat?',
        options: [
          'To seal in juices',
          'To create flavor through browning',
          'To kill bacteria',
          'To reduce cooking time'
        ],
        correctAnswer: ['To create flavor through browning'],
        feedbackMessage: [
          'Common myth! Searing doesn\'t actually seal in juices.',
          'Correct! The Maillard reaction during searing creates complex flavors and aromas.',
          'While it helps, proper temperature is more important for food safety.',
          'Searing actually adds a bit of time to the cooking process.'
        ],
        feedbackTitle: [
          'Debunking a Myth',
          'Correct!',
          'Food Safety First',
          'Time Management'
        ]
      },
      {
        id: 'cm4',
        type: 'single-choice',
        question: 'Which cooking method is best for tough cuts of meat?',
        options: [
          'Quick high-heat grilling',
          'Pan-frying',
          'Slow braising',
          'Steaming'
        ],
        correctAnswer: ['Slow braising'],
        feedbackMessage: [
          'Tough cuts need time to break down.',
          'This works better for tender cuts.',
          'Perfect! Low and slow cooking breaks down tough connective tissues.',
          'Steaming won\'t help tenderize tough meat effectively.'
        ],
        feedbackTitle: [
          'Time is Key',
          'Wrong Cut Choice',
          'Perfect Method',
          'Ineffective Technique'
        ]
      },
      {
        id: 'cm5',
        type: 'multiple-choice',
        question: 'What are the benefits of blanching vegetables?',
        options: [
          'Preserves color',
          'Softens texture',
          'Makes them last longer in the freezer',
          'Adds flavor'
        ],
        correctAnswer: ['Preserves color', 'Softens texture', 'Makes them last longer in the freezer'],
        feedbackMessage: ['Blanching helps maintain quality in vegetables by setting color, partially cooking them, and preparing them for freezing.'],
      }
    ]
  },
  {
    id: 'kitchen-measurements-001',
    title: 'Kitchen Measurements and Conversions',
    questions: [
      {
        id: 'km1',
        type: 'single-choice',
        question: 'How many tablespoons are in a cup?',
        options: [
          '8 tablespoons',
          '12 tablespoons',
          '16 tablespoons',
          '20 tablespoons'
        ],
        correctAnswer: ['16 tablespoons'],
        feedbackMessage: [
          'That\'s a half cup!',
          'Not quite enough.',
          'Correct! 16 tablespoons = 1 cup, a basic kitchen conversion.',
          'That\'s more than a cup.'
        ]
      },
      {
        id: 'km2',
        type: 'text-input',
        question: 'What\'s the standard weight of 1 cup of all-purpose flour in grams?',
        correctAnswer: ['120'],
        feedbackMessage: ['120 grams is the standard weight for 1 cup of all-purpose flour when using the spoon-and-level method.']
      },
      {
        id: 'km3',
        type: 'single-choice',
        question: 'Which measurement is more accurate?',
        options: [
          'Volume (cups, spoons)',
          'Weight (grams, ounces)',
          'They\'re equally accurate',
          'Depends on the ingredient'
        ],
        correctAnswer: ['Weight (grams, ounces)'],
        feedbackMessage: [
          'Volume can vary based on how ingredients are packed.',
          'Correct! Weight measurements are always consistent and precise.',
          'Weight is consistently more accurate.',
          'While some ingredients are easier to measure by volume, weight is still more accurate.'
        ]
      },
      {
        id: 'km4',
        type: 'multiple-choice',
        question: 'Which of these are correct volume conversions?',
        options: [
          '3 teaspoons = 1 tablespoon',
          '4 cups = 1 quart',
          '2 cups = 1 pint',
          '8 ounces = 1 cup'
        ],
        correctAnswer: ['3 teaspoons = 1 tablespoon', '4 cups = 1 quart', '2 cups = 1 pint'],
        feedbackMessage: ['These are standard U.S. measurement conversions. Note that 8 fluid ounces = 1 cup, but weight ounces vary by ingredient.'],
      },
      {
        id: 'km5',
        type: 'single-choice',
        question: 'Why do professional bakers prefer weight measurements?',
        options: [
          'It\'s faster',
          'It\'s more consistent',
          'It\'s traditional',
          'Scales are cheaper'
        ],
        correctAnswer: ['It\'s more consistent'],
        feedbackMessage: [
          'Weight can actually take longer than volume measurements.',
          'Correct! Weight measurements ensure exact amounts every time, leading to consistent results.',
          'Many traditional recipes actually use volume measurements.',
          'Quality scales can be quite expensive.'
        ],
        feedbackTitle: [
          'Time vs Accuracy',
          'Precision Matters',
          'Modern vs Traditional',
          'Equipment Costs'
        ]
      }
    ]
  },
  {
    id: 'baking-basics-001',
    title: 'Baking Basics Quiz',
    questions: [
      {
        id: 'b1',
        type: 'single-choice',
        question: 'What is the purpose of preheating an oven?',
        options: [
          'To save energy',
          'To ensure even cooking',
          'To make the kitchen warm',
          'To sterilize the oven'
        ],
        correctAnswer: ['To ensure even cooking'],
        feedbackMessage: [
          'Preheating actually uses more energy initially.',
          'Correct! Preheating ensures that food cooks evenly from the start.',
          'While it might warm the kitchen, that\'s not the main purpose.',
          'Ovens are not used for sterilization.'
        ],
        feedbackTitle: [
          'Energy Use',
          'Even Cooking',
          'Incidental Warmth',
          'Not for Sterilization'
        ]
      },
      {
        id: 'b2',
        type: 'multiple-choice',
        question: 'Which ingredients are typically used as leavening agents in baking?',
        options: [
          'Baking soda',
          'Yeast',
          'Salt',
          'Sugar'
        ],
        correctAnswer: ['Baking soda', 'Yeast'],
        feedbackMessage: ['Leavening agents like baking soda and yeast help dough rise by producing gas.'],
      },
      {
        id: 'b3',
        type: 'single-choice',
        question: 'What is the main function of gluten in baking?',
        options: [
          'To add sweetness',
          'To provide structure',
          'To enhance flavor',
          'To increase shelf life'
        ],
        correctAnswer: ['To provide structure'],
        feedbackMessage: [
          'Gluten doesn\'t add sweetness.',
          'Correct! Gluten provides structure and elasticity to baked goods.',
          'Gluten doesn\'t enhance flavor directly.',
          'Gluten doesn\'t affect shelf life.'
        ],
        feedbackTitle: [
          'Not Sweetness',
          'Structural Support',
          'Flavor Neutral',
          'Shelf Life'
        ]
      },
      {
        id: 'b4',
        type: 'single-choice',
        question: 'Why is it important to measure ingredients accurately in baking?',
        options: [
          'To save time',
          'To ensure consistent results',
          'To use fewer ingredients',
          'To make it look professional'
        ],
        correctAnswer: ['To ensure consistent results'],
        feedbackMessage: [
          'Accuracy doesn\'t necessarily save time.',
          'Correct! Accurate measurements ensure the desired outcome in baking.',
          'Using fewer ingredients isn\'t the goal.',
          'While it might look professional, consistency is key.'
        ],
        feedbackTitle: [
          'Time Management',
          'Consistency',
          'Ingredient Use',
          'Professional Appearance'
        ]
      },
      {
        id: 'b5',
        type: 'multiple-choice',
        question: 'Which of these are common types of flour used in baking?',
        options: [
          'All-purpose flour',
          'Bread flour',
          'Cornmeal',
          'Rice flour'
        ],
        correctAnswer: ['All-purpose flour', 'Bread flour', 'Rice flour'],
        feedbackMessage: ['Different flours are used for different textures and flavors in baking.'],
      }
    ]
  },
  {
    id: 'herbs-and-spices-001',
    title: 'Herbs and Spices Quiz',
    questions: [
      {
        id: 'hs1',
        type: 'single-choice',
        question: 'Which herb is commonly used in Italian cuisine for its aromatic leaves?',
        options: [
          'Basil',
          'Cilantro',
          'Mint',
          'Rosemary'
        ],
        correctAnswer: ['Basil'],
        feedbackMessage: [
          'Basil is a staple in Italian dishes like pesto.',
          'Cilantro is more common in Mexican and Asian cuisines.',
          'Mint is often used in desserts and drinks.',
          'Rosemary is used in Mediterranean dishes but not as commonly as basil in Italian cuisine.'
        ],
        feedbackTitle: [
          'Italian Staple',
          'Different Cuisine',
          'Dessert Herb',
          'Mediterranean Flavor'
        ]
      },
      {
        id: 'hs2',
        type: 'multiple-choice',
        question: 'Which spices are known for their warming properties?',
        options: [
          'Cinnamon',
          'Ginger',
          'Turmeric',
          'Paprika'
        ],
        correctAnswer: ['Cinnamon', 'Ginger', 'Turmeric'],
        feedbackMessage: ['Warming spices like cinnamon, ginger, and turmeric are often used in winter dishes.'],
      },
      {
        id: 'hs3',
        type: 'single-choice',
        question: 'What is the main flavor component of saffron?',
        options: [
          'Sweet',
          'Bitter',
          'Savory',
          'Earthy'
        ],
        correctAnswer: ['Earthy'],
        feedbackMessage: [
          'Saffron has a unique earthy flavor.',
          'It\'s not typically bitter.',
          'Saffron is not savory.',
          'Correct! Saffron is known for its earthy taste.'
        ],
        feedbackTitle: [
          'Unique Flavor',
          'Not Bitter',
          'Not Savory',
          'Earthy Taste'
        ]
      },
      {
        id: 'hs4',
        type: 'single-choice',
        question: 'Which spice is derived from the bark of a tree?',
        options: [
          'Nutmeg',
          'Cinnamon',
          'Clove',
          'Cardamom'
        ],
        correctAnswer: ['Cinnamon'],
        feedbackMessage: [
          'Nutmeg is a seed.',
          'Correct! Cinnamon is made from the inner bark of trees.',
          'Clove is a flower bud.',
          'Cardamom is a seed pod.'
        ],
        feedbackTitle: [
          'Seed Spice',
          'Bark Spice',
          'Flower Bud',
          'Seed Pod'
        ]
      },
      {
        id: 'hs5',
        type: 'multiple-choice',
        question: 'Which herbs are commonly used in French cuisine?',
        options: [
          'Thyme',
          'Tarragon',
          'Oregano',
          'Sage'
        ],
        correctAnswer: ['Thyme', 'Tarragon'],
        feedbackMessage: ['Thyme and tarragon are staples in French cooking, often used in sauces and stews.'],
      }
    ]
  },
  {
    id: 'international-cuisines-001',
    title: 'International Cuisines Quiz',
    questions: [
      {
        id: 'ic1',
        type: 'single-choice',
        question: 'Which country is known for its dish "Paella"?',
        options: [
          'Italy',
          'Spain',
          'Greece',
          'France'
        ],
        correctAnswer: ['Spain'],
        feedbackMessage: [
          'Paella is not an Italian dish.',
          'Correct! Paella is a traditional Spanish dish.',
          'Paella is not Greek.',
          'Paella is not French.'
        ],
        feedbackTitle: [
          'Not Italian',
          'Spanish Delight',
          'Not Greek',
          'Not French'
        ]
      },
      {
        id: 'ic2',
        type: 'multiple-choice',
        question: 'Which ingredients are essential in Japanese sushi?',
        options: [
          'Rice',
          'Seaweed',
          'Cheese',
          'Soy sauce'
        ],
        correctAnswer: ['Rice', 'Seaweed', 'Soy sauce'],
        feedbackMessage: ['Rice, seaweed, and soy sauce are key components of sushi.'],
      },
      {
        id: 'ic3',
        type: 'single-choice',
        question: 'What is the main ingredient in the Indian dish "Paneer Tikka"?',
        options: [
          'Chicken',
          'Paneer',
          'Lamb',
          'Fish'
        ],
        correctAnswer: ['Paneer'],
        feedbackMessage: [
          'Paneer Tikka is a vegetarian dish.',
          'Correct! Paneer is the main ingredient.',
          'Paneer Tikka does not contain lamb.',
          'Paneer Tikka does not contain fish.'
        ],
        feedbackTitle: [
          'Vegetarian Dish',
          'Main Ingredient',
          'Not Lamb',
          'Not Fish'
        ]
      },
      {
        id: 'ic4',
        type: 'single-choice',
        question: 'Which cuisine is known for its use of "Kimchi"?',
        options: [
          'Japanese',
          'Korean',
          'Chinese',
          'Thai'
        ],
        correctAnswer: ['Korean'],
        feedbackMessage: [
          'Kimchi is not a staple in Japanese cuisine.',
          'Correct! Kimchi is a traditional Korean dish.',
          'Kimchi is not Chinese.',
          'Kimchi is not Thai.'
        ],
        feedbackTitle: [
          'Not Japanese',
          'Korean Staple',
          'Not Chinese',
          'Not Thai'
        ]
      },
      {
        id: 'ic5',
        type: 'multiple-choice',
        question: 'Which spices are commonly used in Mexican cuisine?',
        options: [
          'Cumin',
          'Coriander',
          'Saffron',
          'Chili powder'
        ],
        correctAnswer: ['Cumin', 'Chili powder'],
        feedbackMessage: ['Cumin and chili powder are frequently used in Mexican dishes.'],
      }
    ]
  },
  {
    id: 'international-cuisines-002',
    title: 'International Cuisines Quiz Part 2',
    questions: [
      {
        id: 'ic6',
        type: 'single-choice',
        question: 'Which country is famous for "Pad Thai"?',
        options: [
          'Vietnam',
          'Thailand',
          'Malaysia',
          'Indonesia'
        ],
        correctAnswer: ['Thailand'],
        feedbackMessage: [
          'Pad Thai is not a Vietnamese dish.',
          'Correct! Pad Thai is a traditional Thai street food.',
          'Pad Thai is not Malaysian.',
          'Pad Thai is not Indonesian.'
        ],
        feedbackTitle: [
          'Not Vietnamese',
          'Thai Classic',
          'Not Malaysian',
          'Not Indonesian'
        ]
      },
      {
        id: 'ic7',
        type: 'multiple-choice',
        question: 'Which ingredients are essential in Italian pesto?',
        options: [
          'Basil',
          'Pine nuts',
          'Parmesan',
          'Tomatoes'
        ],
        correctAnswer: ['Basil', 'Pine nuts', 'Parmesan'],
        feedbackMessage: ['Basil, pine nuts, and Parmesan are the key components of traditional pesto.'],
      },
      {
        id: 'ic8',
        type: 'single-choice',
        question: 'What is the main ingredient in Greek "Moussaka"?',
        options: [
          'Potato',
          'Eggplant',
          'Zucchini',
          'Carrot'
        ],
        correctAnswer: ['Eggplant'],
        feedbackMessage: [
          'Potato is sometimes used but not the main ingredient.',
          'Correct! Eggplant is the key ingredient in Moussaka.',
          'Zucchini is not traditionally used in Moussaka.',
          'Carrot is not used in traditional Moussaka.'
        ],
        feedbackTitle: [
          'Secondary Ingredient',
          'Main Component',
          'Not Traditional',
          'Not Used'
        ]
      },
      {
        id: 'ic9',
        type: 'single-choice',
        question: 'Which cuisine is known for "Couscous"?',
        options: [
          'Greek',
          'Turkish',
          'Moroccan',
          'Lebanese'
        ],
        correctAnswer: ['Moroccan'],
        feedbackMessage: [
          'Couscous is not traditionally Greek.',
          'While used in Turkish cuisine, it\'s not its origin.',
          'Correct! Couscous is a staple of Moroccan cuisine.',
          'While used in Lebanese cuisine, it\'s not its origin.'
        ],
        feedbackTitle: [
          'Not Greek',
          'Not Original',
          'North African Staple',
          'Not Original'
        ]
      },
      {
        id: 'ic10',
        type: 'multiple-choice',
        question: 'Which ingredients are essential in French "Ratatouille"?',
        options: [
          'Eggplant',
          'Zucchini',
          'Tomatoes',
          'Carrots'
        ],
        correctAnswer: ['Eggplant', 'Zucchini', 'Tomatoes'],
        feedbackMessage: ['Eggplant, zucchini, and tomatoes are the key vegetables in traditional Ratatouille.'],
      }
    ]
  },
  {
    id: 'beverage-basics-001',
    title: 'Beverage Basics Quiz',
    questions: [
      {
        id: 'bb1',
        type: 'single-choice',
        question: 'What is the main ingredient in a traditional "Mojito"?',
        options: [
          'Vodka',
          'Rum',
          'Tequila',
          'Gin'
        ],
        correctAnswer: ['Rum'],
        feedbackMessage: [
          'Mojito is not made with vodka.',
          'Correct! Rum is the main ingredient in a Mojito.',
          'Mojito is not made with tequila.',
          'Mojito is not made with gin.'
        ],
        feedbackTitle: [
          'Not Vodka',
          'Rum Base',
          'Not Tequila',
          'Not Gin'
        ]
      },
      {
        id: 'bb2',
        type: 'multiple-choice',
        question: 'Which ingredients are typically found in a "Bloody Mary"?',
        options: [
          'Tomato juice',
          'Vodka',
          'Worcestershire sauce',
          'Milk'
        ],
        correctAnswer: ['Tomato juice', 'Vodka', 'Worcestershire sauce'],
        feedbackMessage: ['A Bloody Mary is made with tomato juice, vodka, and Worcestershire sauce.'],
      },
      {
        id: 'bb3',
        type: 'single-choice',
        question: 'What is the primary flavor of "Earl Grey" tea?',
        options: [
          'Mint',
          'Bergamot',
          'Lemon',
          'Vanilla'
        ],
        correctAnswer: ['Bergamot'],
        feedbackMessage: [
          'Earl Grey is not mint-flavored.',
          'Correct! Bergamot gives Earl Grey its distinctive flavor.',
          'Earl Grey is not lemon-flavored.',
          'Earl Grey is not vanilla-flavored.'
        ],
        feedbackTitle: [
          'Not Mint',
          'Bergamot Flavor',
          'Not Lemon',
          'Not Vanilla'
        ]
      },
      {
        id: 'bb4',
        type: 'single-choice',
        question: 'Which coffee brewing method uses a plunger?',
        options: [
          'Espresso',
          'French Press',
          'Drip Coffee',
          'Cold Brew'
        ],
        correctAnswer: ['French Press'],
        feedbackMessage: [
          'Espresso machines do not use a plunger.',
          'Correct! French Press uses a plunger to separate grounds from the liquid.',
          'Drip coffee does not use a plunger.',
          'Cold brew does not use a plunger.'
        ],
        feedbackTitle: [
          'Not Espresso',
          'Plunger Method',
          'Not Drip',
          'Not Cold Brew'
        ]
      },
      {
        id: 'bb5',
        type: 'multiple-choice',
        question: 'Which drinks are typically served hot?',
        options: [
          'Cappuccino',
          'Iced Tea',
          'Hot Chocolate',
          'Lemonade'
        ],
        correctAnswer: ['Cappuccino', 'Hot Chocolate'],
        feedbackMessage: ['Cappuccino and hot chocolate are traditionally served hot.'],
      }
    ]
  },
  {
    id: 'seafood-cooking-001',
    title: 'Seafood Cooking Quiz',
    questions: [
      {
        id: 'sc1',
        type: 'single-choice',
        question: 'What is the best way to tell if shrimp is cooked?',
        options: [
          'It turns pink and opaque',
          'It floats in water',
          'It smells fishy',
          'It becomes hard'
        ],
        correctAnswer: ['It turns pink and opaque'],
        feedbackMessage: [
          'Correct! Cooked shrimp turns pink and opaque.',
          'Floating is not a reliable indicator.',
          'A fishy smell indicates spoilage, not doneness.',
          'Shrimp should be firm, not hard.'
        ],
        feedbackTitle: [
          'Color and Texture',
          'Not Floating',
          'Spoilage Indicator',
          'Texture Check'
        ]
      },
      {
        id: 'sc2',
        type: 'multiple-choice',
        question: 'Which methods are suitable for cooking salmon?',
        options: [
          'Grilling',
          'Poaching',
          'Deep-frying',
          'Baking'
        ],
        correctAnswer: ['Grilling', 'Poaching', 'Baking'],
        feedbackMessage: ['Salmon can be grilled, poached, or baked for delicious results.'],
      },
      {
        id: 'sc3',
        type: 'single-choice',
        question: 'What is the main benefit of cooking fish en papillote?',
        options: [
          'It adds a smoky flavor',
          'It keeps the fish moist',
          'It makes the fish crispy',
          'It shortens cooking time'
        ],
        correctAnswer: ['It keeps the fish moist'],
        feedbackMessage: [
          'En papillote does not add a smoky flavor.',
          'Correct! Cooking en papillote traps moisture, keeping the fish tender.',
          'En papillote does not make the fish crispy.',
          'Cooking time is not significantly shortened.'
        ],
        feedbackTitle: [
          'Flavor Profile',
          'Moisture Retention',
          'Texture Outcome',
          'Cooking Duration'
        ]
      },
      {
        id: 'sc4',
        type: 'single-choice',
        question: 'Which seafood is commonly used in a "Bouillabaisse"?',
        options: [
          'Lobster',
          'Clams',
          'Crab',
          'Mussels'
        ],
        correctAnswer: ['Mussels'],
        feedbackMessage: [
          'Lobster is not typically used in Bouillabaisse.',
          'Clams are sometimes used, but mussels are more common.',
          'Crab is not a traditional ingredient.',
          'Correct! Mussels are a key ingredient in Bouillabaisse.'
        ],
        feedbackTitle: [
          'Not Lobster',
          'Occasional Ingredient',
          'Not Crab',
          'Traditional Ingredient'
        ]
      },
      {
        id: 'sc5',
        type: 'multiple-choice',
        question: 'Which seafood should be cooked until the shells open?',
        options: [
          'Oysters',
          'Clams',
          'Scallops',
          'Mussels'
        ],
        correctAnswer: ['Clams', 'Mussels'],
        feedbackMessage: ['Clams and mussels should be cooked until their shells open, indicating they are done.'],
      }
    ]
  },
  {
    id: 'vegetarian-cooking-001',
    title: 'Vegetarian Cooking Quiz',
    questions: [
      {
        id: 'vc1',
        type: 'single-choice',
        question: 'What is a common protein source in vegetarian diets?',
        options: [
          'Chicken',
          'Tofu',
          'Beef',
          'Fish'
        ],
        correctAnswer: ['Tofu'],
        feedbackMessage: [
          'Chicken is not vegetarian.',
          'Correct! Tofu is a popular protein source for vegetarians.',
          'Beef is not vegetarian.',
          'Fish is not vegetarian.'
        ],
        feedbackTitle: [
          'Not Vegetarian',
          'Protein Source',
          'Not Vegetarian',
          'Not Vegetarian'
        ]
      },
      {
        id: 'vc2',
        type: 'multiple-choice',
        question: 'Which vegetables are commonly used in vegetarian stir-fry?',
        options: [
          'Broccoli',
          'Carrots',
          'Chicken',
          'Bell peppers'
        ],
        correctAnswer: ['Broccoli', 'Carrots', 'Bell peppers'],
        feedbackMessage: ['Broccoli, carrots, and bell peppers are popular in vegetarian stir-fry dishes.'],
      },
      {
        id: 'vc3',
        type: 'single-choice',
        question: 'What is the main ingredient in a "Caprese Salad"?',
        options: [
          'Lettuce',
          'Tomato',
          'Cucumber',
          'Spinach'
        ],
        correctAnswer: ['Tomato'],
        feedbackMessage: [
          'Lettuce is not the main ingredient.',
          'Correct! Tomato is a key component of Caprese Salad.',
          'Cucumber is not the main ingredient.',
          'Spinach is not the main ingredient.'
        ],
        feedbackTitle: [
          'Not Lettuce',
          'Key Ingredient',
          'Not Cucumber',
          'Not Spinach'
        ]
      },
      {
        id: 'vc4',
        type: 'single-choice',
        question: 'Which grain is commonly used in vegetarian dishes for its high protein content?',
        options: [
          'Rice',
          'Quinoa',
          'Barley',
          'Oats'
        ],
        correctAnswer: ['Quinoa'],
        feedbackMessage: [
          'Rice is not particularly high in protein.',
          'Correct! Quinoa is a high-protein grain.',
          'Barley is not high in protein.',
          'Oats are nutritious but not as high in protein as quinoa.'
        ],
        feedbackTitle: [
          'Low Protein',
          'High Protein',
          'Low Protein',
          'Moderate Protein'
        ]
      },
      {
        id: 'vc5',
        type: 'multiple-choice',
        question: 'Which legumes are often used in vegetarian cooking?',
        options: [
          'Lentils',
          'Chickpeas',
          'Beef',
          'Pork'
        ],
        correctAnswer: ['Lentils', 'Chickpeas'],
        feedbackMessage: ['Lentils and chickpeas are versatile legumes used in many vegetarian dishes.'],
      }
    ]
  },
  {
    id: 'dessert-delights-001',
    title: 'Dessert Delights Quiz',
    questions: [
      {
        id: 'dd1',
        type: 'single-choice',
        question: 'What is the main ingredient in a traditional "Tiramisu"?',
        options: [
          'Chocolate',
          'Mascarpone cheese',
          'Vanilla',
          'Strawberries'
        ],
        correctAnswer: ['Mascarpone cheese'],
        feedbackMessage: [
          'Chocolate is used, but not the main ingredient.',
          'Correct! Mascarpone cheese is essential for Tiramisu.',
          'Vanilla is used for flavor, but not the main ingredient.',
          'Strawberries are not typically used in Tiramisu.'
        ],
        feedbackTitle: [
          'Not Main Ingredient',
          'Essential Ingredient',
          'Flavoring',
          'Not Typical'
        ]
      },
      {
        id: 'dd2',
        type: 'multiple-choice',
        question: 'Which desserts are typically served cold?',
        options: [
          'Ice cream',
          'Cheesecake',
          'Brownies',
          'Pavlova'
        ],
        correctAnswer: ['Ice cream', 'Cheesecake'],
        feedbackMessage: ['Ice cream and cheesecake are usually served cold.'],
      },
      {
        id: 'dd3',
        type: 'single-choice',
        question: 'What is the main flavor of a "Black Forest Cake"?',
        options: [
          'Vanilla',
          'Cherry',
          'Lemon',
          'Almond'
        ],
        correctAnswer: ['Cherry'],
        feedbackMessage: [
          'Vanilla is not the main flavor.',
          'Correct! Cherry is the signature flavor of Black Forest Cake.',
          'Lemon is not the main flavor.',
          'Almond is not the main flavor.'
        ],
        feedbackTitle: [
          'Not Vanilla',
          'Signature Flavor',
          'Not Lemon',
          'Not Almond'
        ]
      },
      {
        id: 'dd4',
        type: 'single-choice',
        question: 'Which ingredient is essential for making "Meringue"?',
        options: [
          'Egg yolks',
          'Egg whites',
          'Butter',
          'Flour'
        ],
        correctAnswer: ['Egg whites'],
        feedbackMessage: [
          'Egg yolks are not used in meringue.',
          'Correct! Egg whites are whipped to create meringue.',
          'Butter is not used in meringue.',
          'Flour is not used in meringue.'
        ],
        feedbackTitle: [
          'Not Yolks',
          'Whipped Whites',
          'Not Butter',
          'Not Flour'
        ]
      },
      {
        id: 'dd5',
        type: 'multiple-choice',
        question: 'Which fruits are commonly used in "Fruit Tart"?',
        options: [
          'Apples',
          'Berries',
          'Bananas',
          'Pineapple'
        ],
        correctAnswer: ['Berries', 'Apples'],
        feedbackMessage: ['Berries and apples are popular choices for fruit tarts.'],
      }
    ]
  },
  {
    id: 'peeling-tutorial-001',
    title: 'Peeling Tutorial Quiz',
    questions: [
      {
        id: 'pt1',
        type: 'single-choice',
        question: 'What is the best tool for peeling a potato?',
        options: [
          'Chef\'s knife',
          'Paring knife',
          'Peeler',
          'Serrated knife'
        ],
        correctAnswer: ['Peeler'],
        feedbackMessage: [
          'A chef\'s knife is too large for precise peeling.',
          'A paring knife can work, but a peeler is more efficient.',
          'Correct! A peeler is designed for this task.',
          'A serrated knife is not suitable for peeling.'
        ],
        feedbackTitle: [
          'Too Large',
          'Alternative Option',
          'Perfect Tool',
          'Wrong Tool'
        ]
      },
      {
        id: 'pt2',
        type: 'multiple-choice',
        question: 'Which fruits are commonly peeled before eating?',
        options: [
          'Banana',
          'Apple',
          'Orange',
          'Grapes'
        ],
        correctAnswer: ['Banana', 'Orange'],
        feedbackMessage: ['Bananas and oranges are typically peeled before eating.'],
      },
      {
        id: 'pt3',
        type: 'single-choice',
        question: 'What is the benefit of blanching tomatoes before peeling?',
        options: [
          'Adds flavor',
          'Loosens the skin',
          'Changes color',
          'Increases sweetness'
        ],
        correctAnswer: ['Loosens the skin'],
        feedbackMessage: [
          'Blanching doesn\'t add flavor.',
          'Correct! Blanching loosens the skin for easy peeling.',
          'Blanching doesn\'t change the color significantly.',
          'Blanching doesn\'t increase sweetness.'
        ],
        feedbackTitle: [
          'Flavor Neutral',
          'Skin Loosening',
          'Color Stability',
          'Sweetness Unchanged'
        ]
      },
      {
        id: 'pt4',
        type: 'single-choice',
        question: 'Which vegetable is often peeled to remove bitterness?',
        options: [
          'Carrot',
          'Cucumber',
          'Eggplant',
          'Potato'
        ],
        correctAnswer: ['Eggplant'],
        feedbackMessage: [
          'Carrots are usually peeled for texture.',
          'Cucumbers are peeled for preference, not bitterness.',
          'Correct! Peeling eggplant can reduce bitterness.',
          'Potatoes are peeled for texture and appearance.'
        ],
        feedbackTitle: [
          'Texture Preference',
          'Preference',
          'Bitterness Reduction',
          'Texture and Appearance'
        ]
      },
      {
        id: 'pt5',
        type: 'multiple-choice',
        question: 'Which tools can be used to peel ginger?',
        options: [
          'Spoon',
          'Peeler',
          'Paring knife',
          'Grater'
        ],
        correctAnswer: ['Spoon', 'Peeler', 'Paring knife'],
        feedbackMessage: ['A spoon, peeler, or paring knife can be used to peel ginger effectively.'],
      }
    ]
  },
  {
    id: 'hand-bubbles-001',
    title: 'Hand Bubbles Quiz',
    questions: [
      {
        id: 'hb1',
        type: 'single-choice',
        question: 'What is the main ingredient in making hand bubbles?',
        options: [
          'Water',
          'Soap',
          'Oil',
          'Salt'
        ],
        correctAnswer: ['Soap'],
        feedbackMessage: [
          'Water is necessary but not the main ingredient.',
          'Correct! Soap is essential for creating bubbles.',
          'Oil is not used in bubble making.',
          'Salt is not used in bubble making.'
        ],
        feedbackTitle: [
          'Necessary but Not Main',
          'Essential Ingredient',
          'Not Used',
          'Not Used'
        ]
      },
      {
        id: 'hb2',
        type: 'multiple-choice',
        question: 'Which additives can improve bubble longevity?',
        options: [
          'Glycerin',
          'Corn syrup',
          'Vinegar',
          'Baking soda'
        ],
        correctAnswer: ['Glycerin', 'Corn syrup'],
        feedbackMessage: ['Glycerin and corn syrup can help bubbles last longer.'],
      },
      {
        id: 'hb3',
        type: 'single-choice',
        question: 'What is the best way to create large bubbles?',
        options: [
          'Use a small wand',
          'Use a large wand',
          'Blow quickly',
          'Blow slowly'
        ],
        correctAnswer: ['Use a large wand'],
        feedbackMessage: [
          'A small wand creates smaller bubbles.',
          'Correct! A large wand helps create large bubbles.',
          'Blowing quickly can burst bubbles.',
          'Blowing slowly helps but a large wand is key.'
        ],
        feedbackTitle: [
          'Small Bubbles',
          'Large Bubbles',
          'Burst Risk',
          'Helpful but Not Key'
        ]
      },
      {
        id: 'hb4',
        type: 'single-choice',
        question: 'Why do bubbles pop?',
        options: [
          'Evaporation',
          'Gravity',
          'Wind',
          'All of the above'
        ],
        correctAnswer: ['All of the above'],
        feedbackMessage: [
          'Evaporation weakens the bubble film.',
          'Gravity pulls the liquid down, thinning the top.',
          'Wind can break the bubble film.',
          'Correct! All these factors contribute to bubbles popping.'
        ],
        feedbackTitle: [
          'Weakening Factor',
          'Thinning Factor',
          'Breaking Factor',
          'Comprehensive Answer'
        ]
      },
      {
        id: 'hb5',
        type: 'multiple-choice',
        question: 'Which conditions are best for bubble making?',
        options: [
          'Humid weather',
          'Windy weather',
          'Dry weather',
          'Calm weather'
        ],
        correctAnswer: ['Humid weather', 'Calm weather'],
        feedbackMessage: ['Humid and calm weather are ideal for bubble making.'],
      }
    ]
  },
  {
    id: 'remove-garlic-smell-001',
    title: 'Remove Garlic Smell Quiz',
    questions: [
      {
        id: 'rgs1',
        type: 'single-choice',
        question: 'What is a common method to remove garlic smell from hands?',
        options: [
          'Rubbing with lemon',
          'Washing with soap',
          'Rubbing with salt',
          'All of the above'
        ],
        correctAnswer: ['All of the above'],
        feedbackMessage: [
          'Lemon can neutralize odors.',
          'Soap helps remove oils.',
          'Salt acts as an abrasive.',
          'Correct! All these methods can help remove garlic smell.'
        ],
        feedbackTitle: [
          'Neutralizing',
          'Oil Removal',
          'Abrasive Action',
          'Comprehensive Solution'
        ]
      },
      {
        id: 'rgs2',
        type: 'multiple-choice',
        question: 'Which kitchen items can help remove garlic smell?',
        options: [
          'Stainless steel',
          'Baking soda',
          'Vinegar',
          'Plastic wrap'
        ],
        correctAnswer: ['Stainless steel', 'Baking soda'],
        feedbackMessage: ['Stainless steel and baking soda are effective in removing garlic smell.'],
      },
      {
        id: 'rgs3',
        type: 'single-choice',
        question: 'Why does stainless steel help remove garlic smell?',
        options: [
          'It absorbs the smell',
          'It neutralizes sulfur compounds',
          'It masks the smell',
          'It doesn\'t help'
        ],
        correctAnswer: ['It neutralizes sulfur compounds'],
        feedbackMessage: [
          'Stainless steel doesn\'t absorb smells.',
          'Correct! It neutralizes sulfur compounds responsible for the smell.',
          'It doesn\'t mask the smell.',
          'It actually helps!'
        ],
        feedbackTitle: [
          'Not Absorption',
          'Neutralization',
          'Not Masking',
          'Effective'
        ]
      },
      {
        id: 'rgs4',
        type: 'single-choice',
        question: 'What is a quick fix for garlic breath?',
        options: [
          'Chewing parsley',
          'Drinking water',
          'Eating bread',
          'All of the above'
        ],
        correctAnswer: ['Chewing parsley'],
        feedbackMessage: [
          'Parsley can help neutralize odors.',
          'Water doesn\'t effectively remove garlic breath.',
          'Bread doesn\'t neutralize odors.',
          'Chewing parsley is the most effective.'
        ],
        feedbackTitle: [
          'Neutralizing',
          'Ineffective',
          'Ineffective',
          'Most Effective'
        ]
      },
      {
        id: 'rgs5',
        type: 'multiple-choice',
        question: 'Which foods can help mask garlic breath?',
        options: [
          'Mint',
          'Apple',
          'Coffee',
          'Chocolate'
        ],
        correctAnswer: ['Mint', 'Apple'],
        feedbackMessage: ['Mint and apple can help mask garlic breath.'],
      }
    ]
  },
  {
    id: 'boiling-myth-busting-001',
    title: 'Boiling Myth Busting Quiz',
    questions: [
      {
        id: 'bmb1',
        type: 'single-choice',
        question: 'Does adding salt to water make it boil faster?',
        options: [
          'Yes',
          'No',
          'Depends on the amount',
          'Only with a lid'
        ],
        correctAnswer: ['No'],
        feedbackMessage: [
          'Salt actually raises the boiling point slightly.',
          'Correct! Salt doesn\'t make water boil faster.',
          'The amount of salt doesn\'t significantly affect boiling speed.',
          'A lid helps retain heat, but salt doesn\'t speed up boiling.'
        ],
        feedbackTitle: [
          'Boiling Point Effect',
          'Correct Answer',
          'Minimal Effect',
          'Heat Retention'
        ]
      },
      {
        id: 'bmb2',
        type: 'multiple-choice',
        question: 'Which factors can affect boiling time?',
        options: [
          'Altitude',
          'Pot size',
          'Water volume',
          'Type of stove'
        ],
        correctAnswer: ['Altitude', 'Water volume', 'Type of stove'],
        feedbackMessage: ['Altitude, water volume, and stove type can affect boiling time.'],
      },
      {
        id: 'bmb3',
        type: 'single-choice',
        question: 'What is the effect of a lid on boiling water?',
        options: [
          'Increases boiling point',
          'Decreases boiling time',
          'Adds flavor',
          'Prevents evaporation'
        ],
        correctAnswer: ['Decreases boiling time'],
        feedbackMessage: [
          'A lid doesn\'t change the boiling point.',
          'Correct! A lid helps retain heat, reducing boiling time.',
          'A lid doesn\'t add flavor.',
          'A lid reduces evaporation but doesn\'t prevent it entirely.'
        ],
        feedbackTitle: [
          'Boiling Point Unchanged',
          'Heat Retention',
          'Flavor Neutral',
          'Evaporation Reduction'
        ]
      },
      {
        id: 'bmb4',
        type: 'single-choice',
        question: 'Does stirring water affect its boiling time?',
        options: [
          'Yes, it speeds it up',
          'Yes, it slows it down',
          'No, it has no effect',
          'Only if it\'s salted'
        ],
        correctAnswer: ['No, it has no effect'],
        feedbackMessage: [
          'Stirring doesn\'t speed up boiling.',
          'Stirring doesn\'t slow down boiling.',
          'Correct! Stirring doesn\'t affect boiling time.',
          'Salt doesn\'t change the effect of stirring.'
        ],
        feedbackTitle: [
          'No Speed Effect',
          'No Slow Effect',
          'Correct Answer',
          'Salt Irrelevant'
        ]
      },
      {
        id: 'bmb5',
        type: 'multiple-choice',
        question: 'Which myths about boiling water are false?',
        options: [
          'Cold water boils faster',
          'Salt makes water boil faster',
          'Boiling removes all impurities',
          'Boiling makes water safe to drink'
        ],
        correctAnswer: ['Cold water boils faster', 'Salt makes water boil faster', 'Boiling removes all impurities'],
        feedbackMessage: ['Cold water doesn\'t boil faster, salt doesn\'t speed up boiling, and boiling doesn\'t remove all impurities.'],
      }
    ]
  },
  {
    id: 'leidenfrost-effect-001',
    title: 'Leidenfrost Effect Quiz',
    questions: [
      {
        id: 'le1',
        type: 'single-choice',
        question: 'What is the Leidenfrost effect?',
        options: [
          'Water boiling at a lower temperature',
          'Water skittering on a hot surface',
          'Water evaporating instantly',
          'Water freezing instantly'
        ],
        correctAnswer: ['Water skittering on a hot surface'],
        feedbackMessage: [
          'The Leidenfrost effect doesn\'t lower boiling temperature.',
          'Correct! It describes water skittering on a hot surface.',
          'It doesn\'t cause instant evaporation.',
          'It doesn\'t cause instant freezing.'
        ],
        feedbackTitle: [
          'Temperature Unchanged',
          'Correct Description',
          'Evaporation Unrelated',
          'Freezing Unrelated'
        ]
      },
      {
        id: 'le2',
        type: 'multiple-choice',
        question: 'Which conditions are necessary for the Leidenfrost effect?',
        options: [
          'High surface temperature',
          'Low surface temperature',
          'Water droplets',
          'Oil droplets'
        ],
        correctAnswer: ['High surface temperature', 'Water droplets'],
        feedbackMessage: ['A high surface temperature and water droplets are necessary for the Leidenfrost effect.'],
      },
      {
        id: 'le3',
        type: 'single-choice',
        question: 'What happens to water droplets during the Leidenfrost effect?',
        options: [
          'They evaporate instantly',
          'They form a vapor layer',
          'They freeze',
          'They boil'
        ],
        correctAnswer: ['They form a vapor layer'],
        feedbackMessage: [
          'They don\'t evaporate instantly.',
          'Correct! A vapor layer forms, allowing droplets to skitter.',
          'They don\'t freeze.',
          'They don\'t boil.'
        ],
        feedbackTitle: [
          'Evaporation Unrelated',
          'Vapor Layer Formation',
          'Freezing Unrelated',
          'Boiling Unrelated'
        ]
      },
      {
        id: 'le4',
        type: 'single-choice',
        question: 'What is a practical application of the Leidenfrost effect?',
        options: [
          'Cooking pancakes',
          'Testing pan heat',
          'Boiling water',
          'Freezing food'
        ],
        correctAnswer: ['Testing pan heat'],
        feedbackMessage: [
          'The effect isn\'t used in cooking pancakes.',
          'Correct! It\'s used to test if a pan is hot enough.',
          'It\'s not used in boiling water.',
          'It\'s not used in freezing food.'
        ],
        feedbackTitle: [
          'Pancake Cooking Unrelated',
          'Heat Testing',
          'Boiling Unrelated',
          'Freezing Unrelated'
        ]
      },
      {
        id: 'le5',
        type: 'multiple-choice',
        question: 'Which materials can demonstrate the Leidenfrost effect?',
        options: [
          'Water',
          'Oil',
          'Alcohol',
          'Mercury'
        ],
        correctAnswer: ['Water', 'Alcohol'],
        feedbackMessage: ['Water and alcohol can demonstrate the Leidenfrost effect.'],
      }
    ]
  },
  {
    id: 'pan-sauce-001',
    title: 'Pan Sauce Quiz',
    questions: [
      {
        id: 'ps1',
        type: 'single-choice',
        question: 'What is the first step in making a pan sauce?',
        options: [
          'Add cream',
          'Deglaze the pan',
          'Add butter',
          'Add herbs'
        ],
        correctAnswer: ['Deglaze the pan'],
        feedbackMessage: [
          'Cream is added later.',
          'Correct! Deglazing the pan is the first step.',
          'Butter is added later.',
          'Herbs are added later.'
        ],
        feedbackTitle: [
          'Cream Later',
          'Deglazing First',
          'Butter Later',
          'Herbs Later'
        ]
      },
      {
        id: 'ps2',
        type: 'multiple-choice',
        question: 'Which liquids can be used to deglaze a pan?',
        options: [
          'Wine',
          'Broth',
          'Water',
          'Juice'
        ],
        correctAnswer: ['Wine', 'Broth', 'Water'],
        feedbackMessage: ['Wine, broth, and water are commonly used to deglaze a pan.'],
      },
      {
        id: 'ps3',
        type: 'single-choice',
        question: 'What is the purpose of deglazing?',
        options: [
          'Add flavor',
          'Thicken sauce',
          'Add color',
          'Add aroma'
        ],
        correctAnswer: ['Add flavor'],
        feedbackMessage: [
          'Correct! Deglazing adds flavor by incorporating browned bits.',
          'Deglazing doesn\'t thicken sauce.',
          'Deglazing doesn\'t add color.',
          'Deglazing doesn\'t add aroma.'
        ],
        feedbackTitle: [
          'Flavor Addition',
          'Thickening Unrelated',
          'Color Unrelated',
          'Aroma Unrelated'
        ]
      },
      {
        id: 'ps4',
        type: 'single-choice',
        question: 'What is a common thickening agent for pan sauces?',
        options: [
          'Flour',
          'Sugar',
          'Salt',
          'Vinegar'
        ],
        correctAnswer: ['Flour'],
        feedbackMessage: [
          'Correct! Flour is often used to thicken pan sauces.',
          'Sugar isn\'t used for thickening.',
          'Salt isn\'t used for thickening.',
          'Vinegar isn\'t used for thickening.'
        ],
        feedbackTitle: [
          'Thickening Agent',
          'Sugar Unrelated',
          'Salt Unrelated',
          'Vinegar Unrelated'
        ]
      },
      {
        id: 'ps5',
        type: 'multiple-choice',
        question: 'Which ingredients can enhance the flavor of a pan sauce?',
        options: [
          'Herbs',
          'Spices',
          'Cream',
          'Butter'
        ],
        correctAnswer: ['Herbs', 'Spices', 'Cream', 'Butter'],
        feedbackMessage: ['Herbs, spices, cream, and butter can enhance the flavor of a pan sauce.'],
      }
    ]
  },
  {
    id: 'salt-differentiation-001',
    title: 'Salt Differentiation Quiz',
    questions: [
      {
        id: 'sd1',
        type: 'single-choice',
        question: 'What is the main difference between table salt and kosher salt?',
        options: [
          'Flavor',
          'Texture',
          'Color',
          'Aroma'
        ],
        correctAnswer: ['Texture'],
        feedbackMessage: [
          'Flavor is similar between the two.',
          'Correct! Texture is the main difference.',
          'Color is similar between the two.',
          'Aroma is similar between the two.'
        ],
        feedbackTitle: [
          'Flavor Similarity',
          'Texture Difference',
          'Color Similarity',
          'Aroma Similarity'
        ]
      },
      {
        id: 'sd2',
        type: 'multiple-choice',
        question: 'Which salts are commonly used in cooking?',
        options: [
          'Table salt',
          'Kosher salt',
          'Sea salt',
          'Epsom salt'
        ],
        correctAnswer: ['Table salt', 'Kosher salt', 'Sea salt'],
        feedbackMessage: ['Table salt, kosher salt, and sea salt are commonly used in cooking.'],
      },
      {
        id: 'sd3',
        type: 'single-choice',
        question: 'What is a characteristic of sea salt?',
        options: [
          'Fine texture',
          'Large crystals',
          'Sweet flavor',
          'No minerals'
        ],
        correctAnswer: ['Large crystals'],
        feedbackMessage: [
          'Sea salt typically has larger crystals.',
          'Correct! Sea salt is known for its large crystals.',
          'Sea salt doesn\'t have a sweet flavor.',
          'Sea salt contains minerals.'
        ],
        feedbackTitle: [
          'Crystal Size',
          'Correct Characteristic',
          'Flavor Unrelated',
          'Mineral Content'
        ]
      },
      {
        id: 'sd4',
        type: 'single-choice',
        question: 'Which salt is best for baking?',
        options: [
          'Table salt',
          'Kosher salt',
          'Sea salt',
          'Himalayan salt'
        ],
        correctAnswer: ['Table salt'],
        feedbackMessage: [
          'Correct! Table salt is best for baking due to its fine texture.',
          'Kosher salt is better for seasoning.',
          'Sea salt is better for finishing.',
          'Himalayan salt is better for finishing.'
        ],
        feedbackTitle: [
          'Baking Choice',
          'Seasoning Choice',
          'Finishing Choice',
          'Finishing Choice'
        ]
      },
      {
        id: 'sd5',
        type: 'multiple-choice',
        question: 'Which salts are used for finishing dishes?',
        options: [
          'Fleur de sel',
          'Maldon salt',
          'Table salt',
          'Kosher salt'
        ],
        correctAnswer: ['Fleur de sel', 'Maldon salt'],
        feedbackMessage: ['Fleur de sel and Maldon salt are used for finishing dishes.'],
      }
    ]
  },
  {
    id: 'even-salting-001',
    title: 'Even Salting Quiz',
    questions: [
      {
        id: 'es1',
        type: 'single-choice',
        question: 'What is the purpose of even salting?',
        options: [
          'Adds flavor',
          'Enhances texture',
          'Adds color',
          'Adds aroma'
        ],
        correctAnswer: ['Adds flavor'],
        feedbackMessage: [
          'Correct! Even salting ensures consistent flavor.',
          'Even salting doesn\'t enhance texture.',
          'Even salting doesn\'t add color.',
          'Even salting doesn\'t add aroma.'
        ],
        feedbackTitle: [
          'Flavor Consistency',
          'Texture Unrelated',
          'Color Unrelated',
          'Aroma Unrelated'
        ]
      },
      {
        id: 'es2',
        type: 'multiple-choice',
        question: 'Which techniques help achieve even salting?',
        options: [
          'Sprinkling from a height',
          'Using a salt shaker',
          'Using a salt cellar',
          'Using a spoon'
        ],
        correctAnswer: ['Sprinkling from a height', 'Using a salt shaker'],
        feedbackMessage: ['Sprinkling from a height and using a salt shaker help achieve even salting.'],
      },
      {
        id: 'es3',
        type: 'single-choice',
        question: 'What is a common mistake when salting food?',
        options: [
          'Using too much salt',
          'Using too little salt',
          'Salting unevenly',
          'All of the above'
        ],
        correctAnswer: ['All of the above'],
        feedbackMessage: [
          'Using too much salt is a common mistake.',
          'Using too little salt is a common mistake.',
          'Salting unevenly is a common mistake.',
          'Correct! All these are common mistakes.'
        ],
        feedbackTitle: [
          'Over-salting',
          'Under-salting',
          'Uneven Salting',
          'Common Mistakes'
        ]
      },
      {
        id: 'es4',
        type: 'single-choice',
        question: 'What is the benefit of salting from a height?',
        options: [
          'Adds flavor',
          'Enhances texture',
          'Ensures even distribution',
          'Adds aroma'
        ],
        correctAnswer: ['Ensures even distribution'],
        feedbackMessage: [
          'Salting from a height doesn\'t add flavor.',
          'Salting from a height doesn\'t enhance texture.',
          'Correct! It ensures even distribution.',
          'Salting from a height doesn\'t add aroma.'
        ],
        feedbackTitle: [
          'Flavor Unrelated',
          'Texture Unrelated',
          'Distribution Benefit',
          'Aroma Unrelated'
        ]
      },
      {
        id: 'es5',
        type: 'multiple-choice',
        question: 'Which foods benefit from even salting?',
        options: [
          'Steak',
          'Salad',
          'Soup',
          'Bread'
        ],
        correctAnswer: ['Steak', 'Salad', 'Soup'],
        feedbackMessage: ['Steak, salad, and soup benefit from even salting.'],
      }
    ]
  },
  {
    id: 'finishing-salt-testing-001',
    title: 'Finishing Salt Testing Quiz',
    questions: [
      {
        id: 'fst1',
        type: 'single-choice',
        question: 'What is the purpose of finishing salt?',
        options: [
          'Adds flavor',
          'Enhances texture',
          'Adds color',
          'Adds aroma'
        ],
        correctAnswer: ['Adds flavor'],
        feedbackMessage: [
          'Correct! Finishing salt adds a burst of flavor.',
          'Finishing salt doesn\'t enhance texture.',
          'Finishing salt doesn\'t add color.',
          'Finishing salt doesn\'t add aroma.'
        ],
        feedbackTitle: [
          'Flavor Burst',
          'Texture Unrelated',
          'Color Unrelated',
          'Aroma Unrelated'
        ]
      },
      {
        id: 'fst2',
        type: 'multiple-choice',
        question: 'Which salts are used as finishing salts?',
        options: [
          'Fleur de sel',
          'Maldon salt',
          'Table salt',
          'Kosher salt'
        ],
        correctAnswer: ['Fleur de sel', 'Maldon salt'],
        feedbackMessage: ['Fleur de sel and Maldon salt are used as finishing salts.'],
      },
      {
        id: 'fst3',
        type: 'single-choice',
        question: 'What is a characteristic of finishing salt?',
        options: [
          'Fine texture',
          'Large crystals',
          'Sweet flavor',
          'No minerals'
        ],
        correctAnswer: ['Large crystals'],
        feedbackMessage: [
          'Finishing salt typically has large crystals.',
          'Correct! Finishing salt is known for its large crystals.',
          'Finishing salt doesn\'t have a sweet flavor.',
          'Finishing salt contains minerals.'
        ],
        feedbackTitle: [
          'Crystal Size',
          'Correct Characteristic',
          'Flavor Unrelated',
          'Mineral Content'
        ]
      },
      {
        id: 'fst4',
        type: 'single-choice',
        question: 'Which dishes benefit from finishing salt?',
        options: [
          'Steak',
          'Salad',
          'Soup',
          'All of the above'
        ],
        correctAnswer: ['All of the above'],
        feedbackMessage: [
          'Steak benefits from finishing salt.',
          'Salad benefits from finishing salt.',
          'Soup benefits from finishing salt.',
          'Correct! All these dishes benefit from finishing salt.'
        ],
        feedbackTitle: [
          'Steak Benefit',
          'Salad Benefit',
          'Soup Benefit',
          'Comprehensive Benefit'
        ]
      },
      {
        id: 'fst5',
        type: 'multiple-choice',
        question: 'Which factors affect the choice of finishing salt?',
        options: [
          'Texture',
          'Flavor',
          'Color',
          'Aroma'
        ],
        correctAnswer: ['Texture', 'Flavor'],
        feedbackMessage: ['Texture and flavor affect the choice of finishing salt.'],
      }
    ]
  },
  {
    id: 'boil-over-prevention-001',
    title: 'Boil Over Prevention Quiz',
    questions: [
      {
        id: 'bop1',
        type: 'single-choice',
        question: 'What is a common method to prevent boil over?',
        options: [
          'Add salt',
          'Use a larger pot',
          'Stir constantly',
          'Add oil'
        ],
        correctAnswer: ['Use a larger pot'],
        feedbackMessage: [
          'Salt doesn\'t prevent boil over.',
          'Correct! A larger pot helps prevent boil over.',
          'Stirring helps but isn\'t always practical.',
          'Oil doesn\'t prevent boil over.'
        ],
        feedbackTitle: [
          'Salt Unrelated',
          'Larger Pot Benefit',
          'Stirring Help',
          'Oil Unrelated'
        ]
      },
      {
        id: 'bop2',
        type: 'multiple-choice',
        question: 'Which techniques help prevent boil over?',
        options: [
          'Use a wooden spoon',
          'Reduce heat',
          'Add a lid',
          'Add a pinch of salt'
        ],
        correctAnswer: ['Use a wooden spoon', 'Reduce heat'],
        feedbackMessage: ['Using a wooden spoon and reducing heat help prevent boil over.'],
      },
      {
        id: 'bop3',
        type: 'single-choice',
        question: 'What is a sign that a pot is about to boil over?',
        options: [
          'Bubbling',
          'Foaming',
          'Steam',
          'All of the above'
        ],
        correctAnswer: ['Foaming'],
        feedbackMessage: [
          'Bubbling is normal.',
          'Correct! Foaming indicates a boil over is imminent.',
          'Steam is normal.',
          'Foaming is the key sign.'
        ],
        feedbackTitle: [
          'Normal Bubbling',
          'Foaming Sign',
          'Normal Steam',
          'Key Sign'
        ]
      },
      {
        id: 'bop4',
        type: 'single-choice',
        question: 'What is the effect of adding oil to boiling water?',
        options: [
          'Prevents boil over',
          'Adds flavor',
          'Prevents sticking',
          'All of the above'
        ],
        correctAnswer: ['Prevents sticking'],
        feedbackMessage: [
          'Oil doesn\'t prevent boil over.',
          'Oil doesn\'t add flavor.',
          'Correct! Oil helps prevent sticking.',
          'Oil doesn\'t achieve all these effects.'
        ],
        feedbackTitle: [
          'Boil Over Unrelated',
          'Flavor Unrelated',
          'Sticking Prevention',
          'Limited Effect'
        ]
      },
      {
        id: 'bop5',
        type: 'multiple-choice',
        question: 'Which foods are prone to boil over?',
        options: [
          'Pasta',
          'Rice',
          'Potatoes',
          'Soup'
        ],
        correctAnswer: ['Pasta', 'Rice', 'Soup'],
        feedbackMessage: ['Pasta, rice, and soup are prone to boil over.'],
      }
    ]
  },
  {
    id: 'bag-mixing-001',
    title: 'Bag Mixing Quiz',
    questions: [
      {
        id: 'bm1',
        type: 'single-choice',
        question: 'What is the purpose of bag mixing?',
        options: [
          'Adds flavor',
          'Ensures even coating',
          'Adds color',
          'Adds aroma'
        ],
        correctAnswer: ['Ensures even coating'],
        feedbackMessage: [
          'Bag mixing doesn\'t add flavor.',
          'Correct! It ensures even coating of ingredients.',
          'Bag mixing doesn\'t add color.',
          'Bag mixing doesn\'t add aroma.'
        ],
        feedbackTitle: [
          'Flavor Unrelated',
          'Even Coating',
          'Color Unrelated',
          'Aroma Unrelated'
        ]
      },
      {
        id: 'bm2',
        type: 'multiple-choice',
        question: 'Which foods are commonly mixed in a bag?',
        options: [
          'Chicken',
          'Vegetables',
          'Fish',
          'Pasta'
        ],
        correctAnswer: ['Chicken', 'Vegetables', 'Fish'],
        feedbackMessage: ['Chicken, vegetables, and fish are commonly mixed in a bag.'],
      },
      {
        id: 'bm3',
        type: 'single-choice',
        question: 'What is a benefit of bag mixing?',
        options: [
          'Reduces mess',
          'Adds flavor',
          'Adds texture',
          'Adds aroma'
        ],
        correctAnswer: ['Reduces mess'],
        feedbackMessage: [
          'Correct! Bag mixing reduces mess.',
          'Bag mixing doesn\'t add flavor.',
          'Bag mixing doesn\'t add texture.',
          'Bag mixing doesn\'t add aroma.'
        ],
        feedbackTitle: [
          'Mess Reduction',
          'Flavor Unrelated',
          'Texture Unrelated',
          'Aroma Unrelated'
        ]
      },
      {
        id: 'bm4',
        type: 'single-choice',
        question: 'What is a common mistake when bag mixing?',
        options: [
          'Using too much liquid',
          'Using too little liquid',
          'Over-mixing',
          'Under-mixing'
        ],
        correctAnswer: ['Using too much liquid'],
        feedbackMessage: [
          'Correct! Using too much liquid can dilute flavors.',
          'Using too little liquid isn\'t a common mistake.',
          'Over-mixing isn\'t a common mistake.',
          'Under-mixing isn\'t a common mistake.'
        ],
        feedbackTitle: [
          'Dilution Risk',
          'Liquid Unrelated',
          'Mixing Unrelated',
          'Mixing Unrelated'
        ]
      },
      {
        id: 'bm5',
        type: 'multiple-choice',
        question: 'Which tools can be used for bag mixing?',
        options: [
          'Hands',
          'Spoon',
          'Whisk',
          'Tongs'
        ],
        correctAnswer: ['Hands', 'Tongs'],
        feedbackMessage: ['Hands and tongs are commonly used for bag mixing.'],
      }
    ]
  },
  {
    id: 'tool-switch-001',
    title: 'Tool Switch Quiz',
    questions: [
      {
        id: 'ts1',
        type: 'single-choice',
        question: 'What is the purpose of switching tools in cooking?',
        options: [
          'Adds flavor',
          'Enhances efficiency',
          'Adds color',
          'Adds aroma'
        ],
        correctAnswer: ['Enhances efficiency'],
        feedbackMessage: [
          'Switching tools doesn\'t add flavor.',
          'Correct! It enhances efficiency in the kitchen.',
          'Switching tools doesn\'t add color.',
          'Switching tools doesn\'t add aroma.'
        ],
        feedbackTitle: [
          'Flavor Unrelated',
          'Efficiency Boost',
          'Color Unrelated',
          'Aroma Unrelated'
        ]
      },
      {
        id: 'ts2',
        type: 'multiple-choice',
        question: 'Which tools are commonly switched during cooking?',
        options: [
          'Knife',
          'Spoon',
          'Whisk',
          'Tongs'
        ],
        correctAnswer: ['Knife', 'Spoon', 'Whisk', 'Tongs'],
        feedbackMessage: ['Knife, spoon, whisk, and tongs are commonly switched during cooking.'],
      },
      {
        id: 'ts3',
        type: 'single-choice',
        question: 'What is a benefit of using the right tool for the job?',
        options: [
          'Reduces mess',
          'Adds flavor',
          'Adds texture',
          'Adds aroma'
        ],
        correctAnswer: ['Reduces mess'],
        feedbackMessage: [
          'Correct! Using the right tool reduces mess.',
          'Using the right tool doesn\'t add flavor.',
          'Using the right tool doesn\'t add texture.',
          'Using the right tool doesn\'t add aroma.'
        ],
        feedbackTitle: [
          'Mess Reduction',
          'Flavor Unrelated',
          'Texture Unrelated',
          'Aroma Unrelated'
        ]
      },
      {
        id: 'ts4',
        type: 'single-choice',
        question: 'What is a common mistake when switching tools?',
        options: [
          'Using the wrong tool',
          'Using too many tools',
          'Using too few tools',
          'Not switching tools'
        ],
        correctAnswer: ['Using the wrong tool'],
        feedbackMessage: [
          'Correct! Using the wrong tool can lead to inefficiency.',
          'Using too many tools isn\'t a common mistake.',
          'Using too few tools isn\'t a common mistake.',
          'Not switching tools isn\'t a common mistake.'
        ],
        feedbackTitle: [
          'Inefficiency Risk',
          'Tool Unrelated',
          'Tool Unrelated',
          'Tool Unrelated'
        ]
      },
      {
        id: 'ts5',
        type: 'multiple-choice',
        question: 'Which factors affect tool choice in cooking?',
        options: [
          'Task',
          'Ingredient',
          'Time',
          'Skill level'
        ],
        correctAnswer: ['Task', 'Ingredient', 'Skill level'],
        feedbackMessage: ['Task, ingredient, and skill level affect tool choice in cooking.'],
      }
    ]
  },
  {
    id: 'make-sauce-decoration-001',
    title: 'Make Sauce Decoration Quiz',
    questions: [
      {
        id: 'msd1',
        type: 'single-choice',
        question: 'What is the purpose of sauce decoration?',
        options: [
          'Adds flavor',
          'Enhances presentation',
          'Adds texture',
          'Adds aroma'
        ],
        correctAnswer: ['Enhances presentation'],
        feedbackMessage: [
          'Sauce decoration doesn\'t add flavor.',
          'Correct! It enhances the presentation of a dish.',
          'It doesn\'t add texture.',
          'It doesn\'t add aroma.'
        ],
        feedbackTitle: [
          'Not Flavor',
          'Presentation Boost',
          'Not Texture',
          'Not Aroma'
        ]
      },
      {
        id: 'msd2',
        type: 'multiple-choice',
        question: 'Which sauces are commonly used for decoration?',
        options: [
          'Chocolate sauce',
          'Caramel sauce',
          'Tomato sauce',
          'Soy sauce'
        ],
        correctAnswer: ['Chocolate sauce', 'Caramel sauce'],
        feedbackMessage: ['Chocolate sauce and caramel sauce are commonly used for decoration.'],
      },
      {
        id: 'msd3',
        type: 'single-choice',
        question: 'What is a common tool for sauce decoration?',
        options: [
          'Spoon',
          'Whisk',
          'Knife',
          'Piping bag'
        ],
        correctAnswer: ['Piping bag'],
        feedbackMessage: [
          'A spoon is not precise enough for decoration.',
          'A whisk is not used for decoration.',
          'A knife is not used for decoration.',
          'Correct! A piping bag allows for precise decoration.'
        ],
        feedbackTitle: [
          'Not Precise',
          'Not Used',
          'Not Used',
          'Precision Tool'
        ]
      },
      {
        id: 'msd4',
        type: 'single-choice',
        question: 'What is the benefit of using a squeeze bottle for sauce decoration?',
        options: [
          'Adds flavor',
          'Increases precision',
          'Enhances texture',
          'Adds aroma'
        ],
        correctAnswer: ['Increases precision'],
        feedbackMessage: [
          'A squeeze bottle doesn\'t add flavor.',
          'Correct! It increases precision in decoration.',
          'It doesn\'t enhance texture.',
          'It doesn\'t add aroma.'
        ],
        feedbackTitle: [
          'Not Flavor',
          'Precision Boost',
          'Not Texture',
          'Not Aroma'
        ]
      },
      {
        id: 'msd5',
        type: 'multiple-choice',
        question: 'Which dishes benefit from sauce decoration?',
        options: [
          'Desserts',
          'Salads',
          'Soups',
          'Steaks'
        ],
        correctAnswer: ['Desserts', 'Salads'],
        feedbackMessage: ['Desserts and salads benefit from the visual appeal of sauce decoration.'],
      }
    ]
  },
  {
    id: 'oven-calibration-001',
    title: 'Oven Calibration Quiz',
    questions: [
      {
        id: 'oc1',
        type: 'single-choice',
        question: 'What is the purpose of oven calibration?',
        options: [
          'Adds flavor',
          'Ensures accurate temperature',
          'Enhances texture',
          'Adds aroma'
        ],
        correctAnswer: ['Ensures accurate temperature'],
        feedbackMessage: [
          'Oven calibration doesn\'t add flavor.',
          'Correct! It ensures the oven is at the correct temperature.',
          'It doesn\'t enhance texture.',
          'It doesn\'t add aroma.'
        ],
        feedbackTitle: [
          'Not Flavor',
          'Temperature Accuracy',
          'Not Texture',
          'Not Aroma'
        ]
      },
      {
        id: 'oc2',
        type: 'multiple-choice',
        question: 'Which tools are used for oven calibration?',
        options: [
          'Oven thermometer',
          'Meat thermometer',
          'Digital thermometer',
          'Candy thermometer'
        ],
        correctAnswer: ['Oven thermometer', 'Digital thermometer'],
        feedbackMessage: ['An oven thermometer and digital thermometer are used for oven calibration.'],
      },
      {
        id: 'oc3',
        type: 'single-choice',
        question: 'How often should an oven be calibrated?',
        options: [
          'Once a month',
          'Once a year',
          'Every six months',
          'Every two years'
        ],
        correctAnswer: ['Once a year'],
        feedbackMessage: [
          'Once a month is too frequent.',
          'Correct! Once a year is a good practice.',
          'Every six months is more frequent than necessary.',
          'Every two years may be too infrequent.'
        ],
        feedbackTitle: [
          'Too Frequent',
          'Good Practice',
          'More Frequent',
          'Too Infrequent'
        ]
      },
      {
        id: 'oc4',
        type: 'single-choice',
        question: 'What is a sign that an oven needs calibration?',
        options: [
          'Uneven cooking',
          'Burnt food',
          'Longer cooking times',
          'All of the above'
        ],
        correctAnswer: ['All of the above'],
        feedbackMessage: [
          'Uneven cooking can indicate calibration issues.',
          'Burnt food can indicate calibration issues.',
          'Longer cooking times can indicate calibration issues.',
          'Correct! All these signs can indicate the need for calibration.'
        ],
        feedbackTitle: [
          'Calibration Issue',
          'Calibration Issue',
          'Calibration Issue',
          'Comprehensive Sign'
        ]
      },
      {
        id: 'oc5',
        type: 'multiple-choice',
        question: 'Which factors can affect oven calibration?',
        options: [
          'Age of the oven',
          'Type of oven',
          'Frequency of use',
          'Type of food cooked'
        ],
        correctAnswer: ['Age of the oven', 'Type of oven', 'Frequency of use'],
        feedbackMessage: ['The age, type, and frequency of use can affect oven calibration.'],
      }
    ]
  },
  {
    id: 'oil-temperature-check-001',
    title: 'Oil Temperature Check Quiz',
    questions: [
      {
        id: 'otc1',
        type: 'single-choice',
        question: 'What is the purpose of checking oil temperature?',
        options: [
          'Adds flavor',
          'Ensures proper cooking',
          'Enhances texture',
          'Adds aroma'
        ],
        correctAnswer: ['Ensures proper cooking'],
        feedbackMessage: [
          'Checking oil temperature doesn\'t add flavor.',
          'Correct! It ensures food is cooked properly.',
          'It doesn\'t enhance texture.',
          'It doesn\'t add aroma.'
        ],
        feedbackTitle: [
          'Not Flavor',
          'Proper Cooking',
          'Not Texture',
          'Not Aroma'
        ]
      },
      {
        id: 'otc2',
        type: 'multiple-choice',
        question: 'Which tools can be used to check oil temperature?',
        options: [
          'Candy thermometer',
          'Meat thermometer',
          'Digital thermometer',
          'Oven thermometer'
        ],
        correctAnswer: ['Candy thermometer', 'Digital thermometer'],
        feedbackMessage: ['A candy thermometer and digital thermometer can be used to check oil temperature.'],
      },
      {
        id: 'otc3',
        type: 'single-choice',
        question: 'What is the ideal temperature range for frying?',
        options: [
          '250-300°F',
          '325-375°F',
          '400-450°F',
          '475-500°F'
        ],
        correctAnswer: ['325-375°F'],
        feedbackMessage: [
          '250-300°F is too low for frying.',
          'Correct! 325-375°F is ideal for frying.',
          '400-450°F is too high for most frying.',
          '475-500°F is too high for frying.'
        ],
        feedbackTitle: [
          'Too Low',
          'Ideal Range',
          'Too High',
          'Too High'
        ]
      },
      {
        id: 'otc4',
        type: 'single-choice',
        question: 'What is a sign that oil is too hot?',
        options: [
          'Food cooks too quickly',
          'Oil smokes',
          'Food is burnt',
          'All of the above'
        ],
        correctAnswer: ['All of the above'],
        feedbackMessage: [
          'Food cooking too quickly can indicate high oil temperature.',
          'Smoking oil can indicate high temperature.',
          'Burnt food can indicate high oil temperature.',
          'Correct! All these signs can indicate oil is too hot.'
        ],
        feedbackTitle: [
          'High Temperature',
          'High Temperature',
          'High Temperature',
          'Comprehensive Sign'
        ]
      },
      {
        id: 'otc5',
        type: 'multiple-choice',
        question: 'Which factors can affect oil temperature?',
        options: [
          'Type of oil',
          'Amount of oil',
          'Size of pot',
          'Type of food'
        ],
        correctAnswer: ['Type of oil', 'Amount of oil', 'Size of pot'],
        feedbackMessage: ['The type, amount, and size of the pot can affect oil temperature.'],
      }
    ]
  },

  {
    id: "67334bb63711d8e7d6350dff",
    title: "Grilling Techniques Quiz",
    questions: [
      {
        "type": "slider",
        "question": "How many minutes per side should you grill a 1-inch thick beefsteak for medium-rare?",
        "options": [],
        "min": 1,
        "max": 10,
        "correctAnswer": [
          "4"
        ],
        "feedbackTitle": [],
        "feedbackMessage": [],
        id: "67334bb63711d8e7d6350e01"
      },
      {
        "type": "single-choice",
        "question": "What is the ideal internal temperature for a medium-rare beefsteak?",
        "options": [
          "120°F",
          "130°F",
          "140°F",
          "150°F"
        ],
        "min": 0,
        "max": 0,
        "correctAnswer": [
          "130°F"
        ],
        "feedbackTitle": [],
        feedbackMessage: [],
        id: "67334bb63711d8e7d6350e02"
      },
      {
        "type": "multiple-choice",
        "question": "Which of the following are important steps in grilling a beefsteak?",
        "options": [
          "Preheat the grill",
          "Season the steak",
          "Use a meat thermometer",
          "Boil the steak"
        ],
        "min": 0,
        "max": 0,
        "correctAnswer": [
          "Preheat the grill",
          "Season the steak",
          "Use a meat thermometer"
        ],
        "feedbackTitle": [],
        feedbackMessage: [],
        id: "67334bb63711d8e7d6350e03"
      },
      {
        "type": "text-input",
        "question": "What is the term for the dark, flavorful crust that forms on a steak when grilled?",
        "options": [],
        "min": 0,
        "max": 0,
        "correctAnswer": [
          "sear"
        ],
        "feedbackTitle": [],
        "feedbackMessage": [],
        id: "67334bb63711d8e7d6350e04"
      }
    ],
  }
];

export default mockQuizData;


