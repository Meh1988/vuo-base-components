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
        correctAnswer: 10,
      },
      {
        id: 'q2',
        type: 'single-choice',
        question: 'Which cuisine is sushi from?',
        options: ['Chinese', 'Japanese', 'Korean', 'Thai'],
        correctAnswer: 'Japanese',
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
        correctAnswer: 'avocado',
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
        correctAnswer: 'Thickest part',
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
        correctAnswer: 'You can leave it in during cooking',
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
        correctAnswer: 'Dull Knife',
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
        correctAnswer: 'False',
        feedbackMessage: [
          'Different whisking techniques are needed in different recipes.',
          'You need different types of movement and speeds depending on the desired outcome.'
        ],
        feedbackTitle: [
          'Stir crazy',
          'Whisked up'
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
        correctAnswer: 'Pinch the blade near the handle with thumb and forefinger',
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
        feedbackMessage: 'A sharp knife on a stable surface, used with proper technique, is the safest way to cut. Never try to catch a falling knife!'
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
        correctAnswer: 'Protecting your fingers while cutting',
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
        correctAnswer: 'julienne',
        feedbackMessage: 'Julienne is a classic French cutting technique that creates long, thin strips about 1/8 inch thick.'
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
        correctAnswer: 'It holds the layers together while cutting',
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
        correctAnswer: 165,
        feedbackMessage: '165°F (74°C) is the safe minimum internal temperature for chicken to kill harmful bacteria.'
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
        feedbackMessage: 'Condiments with eggs (like mayo) and opened fermented products should be refrigerated. Fruits and bread are better stored at room temperature.'
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
        correctAnswer: 'Up to 2 hours',
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
        feedbackMessage: 'Keeping raw and cooked foods separate, along with proper hand washing, are key to preventing foodborne illness.'
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
        correctAnswer: 'In the refrigerator',
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
        correctAnswer: 'Broiling uses direct heat from above',
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
        feedbackMessage: 'Dry-heat cooking methods like roasting and grilling don\'t use water or moisture as the primary heat transfer method.'
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
        correctAnswer: 'To create flavor through browning',
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
        correctAnswer: 'Slow braising',
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
        feedbackMessage: 'Blanching helps maintain quality in vegetables by setting color, partially cooking them, and preparing them for freezing.',
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
        correctAnswer: '16 tablespoons',
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
        correctAnswer: '120',
        feedbackMessage: '120 grams is the standard weight for 1 cup of all-purpose flour when using the spoon-and-level method.'
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
        correctAnswer: 'Weight (grams, ounces)',
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
        feedbackMessage: 'These are standard U.S. measurement conversions. Note that 8 fluid ounces = 1 cup, but weight ounces vary by ingredient.',
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
        correctAnswer: 'It\'s more consistent',
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
  }
];

export default mockQuizData;
