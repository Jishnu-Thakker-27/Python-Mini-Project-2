import json
import os

USERS_FILE = "users.json"
QUIZZES_FILE = "quizzes.json"

DEFAULT_QUESTIONS = [
    {
        "id": 1,
        "category": "Programming",
        "difficulty": "Easy",
        "question": "Which of the following is not a keyword in Python?",
        "options": {
            "A": "val",
            "B": "pass",
            "C": "assert",
            "D": "nonlocal"
        },
        "answer": "A",
        "explanation": "'val' is not a Python keyword. 'pass', 'assert', and 'nonlocal' are reserved keywords."
    },
    {
        "id": 2,
        "category": "Programming",
        "difficulty": "Easy",
        "question": "Which data structure in Python is unordered and mutable?",
        "options": {
            "A": "List",
            "B": "Tuple",
            "C": "Set",
            "D": "Dictionary"
        },
        "answer": "C",
        "explanation": "A Set in Python is unordered and mutable with unique elements."
    },
    {
        "id": 3,
        "category": "Programming",
        "difficulty": "Easy",
        "question": "What does the function type(3.14) return in Python?",
        "options": {
            "A": "<class 'int'>",
            "B": "<class 'float'>",
            "C": "<class 'decimal'>",
            "D": "<class 'num'>"
        },
        "answer": "B",
        "explanation": "Numbers with fractional parts in Python are represented by the float type."
    },
    {
        "id": 4,
        "category": "Programming",
        "difficulty": "Easy",
        "question": "Which symbol is used for single-line comments in Python?",
        "options": {
            "A": "//",
            "B": "/*",
            "C": "--",
            "D": "#"
        },
        "answer": "D",
        "explanation": "In Python, the hash symbol (#) is used to denote single-line comments."
    },
    {
        "id": 5,
        "category": "Programming",
        "difficulty": "Easy",
        "question": "Which built-in function returns the number of items in a list or string in Python?",
        "options": {
            "A": "size()",
            "B": "count()",
            "C": "len()",
            "D": "length()"
        },
        "answer": "C",
        "explanation": "The len() function returns the number of items in an object."
    },
    {
        "id": 6,
        "category": "Programming",
        "difficulty": "Medium",
        "question": "What is the output of bool([]) in Python?",
        "options": {
            "A": "True",
            "B": "False",
            "C": "None",
            "D": "SyntaxError"
        },
        "answer": "B",
        "explanation": "Empty sequences like list [], dict {}, and tuple () evaluate to False in boolean context."
    },
    {
        "id": 7,
        "category": "Programming",
        "difficulty": "Medium",
        "question": "What is the average time complexity of key lookup in a Python dictionary?",
        "options": {
            "A": "O(1)",
            "B": "O(log n)",
            "C": "O(n)",
            "D": "O(n log n)"
        },
        "answer": "A",
        "explanation": "Python dictionaries use hash tables, giving average case O(1) time complexity."
    },
    {
        "id": 8,
        "category": "Programming",
        "difficulty": "Medium",
        "question": "What does the expression [1, 2] * 3 evaluate to in Python?",
        "options": {
            "A": "[3, 6]",
            "B": "[1, 2, 1, 2, 1, 2]",
            "C": "[[1, 2], [1, 2], [1, 2]]",
            "D": "TypeError"
        },
        "answer": "B",
        "explanation": "Multiplying a list by an integer repeats its elements that many times."
    },
    {
        "id": 9,
        "category": "Programming",
        "difficulty": "Medium",
        "question": "How does Python primarily manage dynamic memory allocation?",
        "options": {
            "A": "Manual malloc/free",
            "B": "Reference counting & garbage collection",
            "C": "Static stack only",
            "D": "RAII solely"
        },
        "answer": "B",
        "explanation": "Python uses reference counting supplemented by a cyclic garbage collector."
    },
    {
        "id": 10,
        "category": "Programming",
        "difficulty": "Medium",
        "question": "Which string method converts all uppercase characters in a string to lowercase?",
        "options": {
            "A": "casefold()",
            "B": "lower()",
            "C": "toLower()",
            "D": "down()"
        },
        "answer": "B",
        "explanation": "str.lower() converts all cased characters to lowercase."
    },
    {
        "id": 11,
        "category": "Programming",
        "difficulty": "Hard",
        "question": "What does the keyword 'yield' do in a Python function?",
        "options": {
            "A": "Halts the thread permanently",
            "B": "Suspends execution and returns a generator iterator",
            "C": "Imports modules asynchronously",
            "D": "Throws a custom exception"
        },
        "answer": "B",
        "explanation": "'yield' turns a regular function into a generator, suspending its state and yielding a value."
    },
    {
        "id": 12,
        "category": "Programming",
        "difficulty": "Hard",
        "question": "What does the GIL stand for in CPython, and what is its primary effect?",
        "options": {
            "A": "Global Interpreter Lock, preventing multiple native threads from executing Python bytecodes simultaneously",
            "B": "General Interface Layer for C extensions",
            "C": "Garbage Inspector Log for tracking memory leaks",
            "D": "Graphical Instruction Level in GUI applications"
        },
        "answer": "A",
        "explanation": "The Global Interpreter Lock (GIL) is a mutex that protects access to Python objects, preventing multithreaded bytecode execution."
    },
    {
        "id": 13,
        "category": "Programming",
        "difficulty": "Hard",
        "question": "What occurs if you define a function with a default mutable argument like def append_to(item, target=[]):?",
        "options": {
            "A": "A new list is created on each invocation",
            "B": "The same list is shared across calls that use the default argument",
            "C": "SyntaxError at compile time",
            "D": "Python automatically converts it to a tuple"
        },
        "answer": "B",
        "explanation": "Default arguments are evaluated once when the function is defined, causing mutable defaults to persist."
    },
    {
        "id": 14,
        "category": "Programming",
        "difficulty": "Hard",
        "question": "Which dunder method must an object implement to be invoked as a callable function (obj())?",
        "options": {
            "A": "__invoke__",
            "B": "__exec__",
            "C": "__call__",
            "D": "__run__"
        },
        "answer": "C",
        "explanation": "Implementing __call__ allows instance objects to be called just like functions."
    },
    {
        "id": 15,
        "category": "Programming",
        "difficulty": "Hard",
        "question": "What sorting algorithm does Python's built-in sorted() and list.sort() use under the hood?",
        "options": {
            "A": "Quicksort",
            "B": "Mergesort",
            "C": "Timsort",
            "D": "Heapsort"
        },
        "answer": "C",
        "explanation": "Python uses Timsort, a hybrid stable sorting algorithm derived from merge sort and insertion sort."
    },
    {
        "id": 16,
        "category": "Science",
        "difficulty": "Easy",
        "question": "What is the chemical formula for pure water?",
        "options": {
            "A": "CO2",
            "B": "H2O",
            "C": "NaCl",
            "D": "O2"
        },
        "answer": "B",
        "explanation": "Water consists of two Hydrogen atoms bonded to one Oxygen atom (H2O)."
    },
    {
        "id": 17,
        "category": "Science",
        "difficulty": "Easy",
        "question": "Which planet in our solar system is situated closest to the Sun?",
        "options": {
            "A": "Venus",
            "B": "Mercury",
            "C": "Mars",
            "D": "Earth"
        },
        "answer": "B",
        "explanation": "Mercury is the innermost planet of our solar system."
    },
    {
        "id": 18,
        "category": "Science",
        "difficulty": "Easy",
        "question": "Which gas do green plants primarily absorb from the atmosphere during photosynthesis?",
        "options": {
            "A": "Oxygen",
            "B": "Nitrogen",
            "C": "Carbon Dioxide",
            "D": "Hydrogen"
        },
        "answer": "C",
        "explanation": "Plants absorb Carbon Dioxide (CO2) and release Oxygen during photosynthesis."
    },
    {
        "id": 19,
        "category": "Science",
        "difficulty": "Easy",
        "question": "Which human organ is primarily responsible for pumping oxygenated blood throughout the body?",
        "options": {
            "A": "Lungs",
            "B": "Liver",
            "C": "Heart",
            "D": "Kidneys"
        },
        "answer": "C",
        "explanation": "The heart is the muscular organ that pumps blood through the circulatory system."
    },
    {
        "id": 20,
        "category": "Science",
        "difficulty": "Easy",
        "question": "What is the hardest known natural mineral found on Earth?",
        "options": {
            "A": "Quartz",
            "B": "Diamond",
            "C": "Topaz",
            "D": "Corundum"
        },
        "answer": "B",
        "explanation": "Diamond is rated 10 on the Mohs hardness scale, making it the hardest natural mineral."
    },
    {
        "id": 21,
        "category": "Science",
        "difficulty": "Medium",
        "question": "Which planet in our solar system is famous for its large, prominent ring system?",
        "options": {
            "A": "Jupiter",
            "B": "Saturn",
            "C": "Uranus",
            "D": "Neptune"
        },
        "answer": "B",
        "explanation": "Saturn has the most extensive and visually prominent ring system among the planets."
    },
    {
        "id": 22,
        "category": "Science",
        "difficulty": "Medium",
        "question": "Which organelle is commonly referred to as the powerhouse of eukaryotic cells?",
        "options": {
            "A": "Nucleus",
            "B": "Ribosome",
            "C": "Mitochondria",
            "D": "Endoplasmic Reticulum"
        },
        "answer": "C",
        "explanation": "Mitochondria generate most of the chemical energy needed by cells in the form of ATP."
    },
    {
        "id": 23,
        "category": "Science",
        "difficulty": "Medium",
        "question": "Which subatomic particle carries a negative elementary electric charge?",
        "options": {
            "A": "Proton",
            "B": "Neutron",
            "C": "Electron",
            "D": "Positron"
        },
        "answer": "C",
        "explanation": "Electrons carry a negative elementary charge (-1e)."
    },
    {
        "id": 24,
        "category": "Science",
        "difficulty": "Medium",
        "question": "Approximately what is the speed of light propagating in a vacuum?",
        "options": {
            "A": "150,000 km/s",
            "B": "300,000 km/s",
            "C": "450,000 km/s",
            "D": "600,000 km/s"
        },
        "answer": "B",
        "explanation": "The speed of light in vacuum is exactly 299,792 km/s (roughly 300,000 km/s)."
    },
    {
        "id": 25,
        "category": "Science",
        "difficulty": "Medium",
        "question": "What is the standard SI unit of electrical resistance?",
        "options": {
            "A": "Volt",
            "B": "Ampere",
            "C": "Ohm",
            "D": "Watt"
        },
        "answer": "C",
        "explanation": "The Ohm (symbol: \u03a9) is the SI unit of electrical resistance."
    },
    {
        "id": 26,
        "category": "Science",
        "difficulty": "Hard",
        "question": "Which groundbreaking theoretical framework published by Albert Einstein in 1915 describes gravity as the curvature of spacetime?",
        "options": {
            "A": "Special Relativity",
            "B": "Quantum Electrodynamics",
            "C": "General Relativity",
            "D": "String Theory"
        },
        "answer": "C",
        "explanation": "General Relativity describes gravity not as a force, but as the curvature of spacetime caused by mass and energy."
    },
    {
        "id": 27,
        "category": "Science",
        "difficulty": "Hard",
        "question": "Which metallic element possesses the highest melting point of all elements at standard pressure (approx. 3,422 \u00b0C)?",
        "options": {
            "A": "Titanium",
            "B": "Platinum",
            "C": "Tungsten",
            "D": "Osmium"
        },
        "answer": "C",
        "explanation": "Tungsten (W) has the highest melting point of all metals at 3,422 \u00b0C (6,192 \u00b0F)."
    },
    {
        "id": 28,
        "category": "Science",
        "difficulty": "Hard",
        "question": "Which iron-containing protein in human erythrocytes binds and transports oxygen from the lungs to tissues?",
        "options": {
            "A": "Myoglobin",
            "B": "Hemoglobin",
            "C": "Albumin",
            "D": "Ferritin"
        },
        "answer": "B",
        "explanation": "Hemoglobin is the tetrameric protein in red blood cells that transports oxygen throughout the body."
    },
    {
        "id": 29,
        "category": "Science",
        "difficulty": "Hard",
        "question": "Which gauge boson mediates the strong nuclear force that binds quarks together inside hadrons?",
        "options": {
            "A": "Photon",
            "B": "W Boson",
            "C": "Gluon",
            "D": "Graviton"
        },
        "answer": "C",
        "explanation": "Gluons are the exchange particles responsible for the strong color force between quarks."
    },
    {
        "id": 30,
        "category": "Science",
        "difficulty": "Hard",
        "question": "What thermodynamic phase transition occurs when a substance converts directly from a solid to a gas without passing through a liquid state?",
        "options": {
            "A": "Condensation",
            "B": "Deposition",
            "C": "Sublimation",
            "D": "Evaporation"
        },
        "answer": "C",
        "explanation": "Sublimation is the direct transition from the solid phase to the gas phase (e.g. dry ice)."
    },
    {
        "id": 31,
        "category": "History",
        "difficulty": "Easy",
        "question": "Which ancient country is celebrated for constructing the Great Pyramids of Giza?",
        "options": {
            "A": "Greece",
            "B": "Rome",
            "C": "Egypt",
            "D": "Mesopotamia"
        },
        "answer": "C",
        "explanation": "The Great Pyramids of Giza were built by the ancient civilization of Egypt."
    },
    {
        "id": 32,
        "category": "History",
        "difficulty": "Easy",
        "question": "In which calendar year did World War II formally come to an end?",
        "options": {
            "A": "1939",
            "B": "1941",
            "C": "1945",
            "D": "1950"
        },
        "answer": "C",
        "explanation": "World War II concluded in 1945 following Allied victories in Europe and the Pacific."
    },
    {
        "id": 33,
        "category": "History",
        "difficulty": "Easy",
        "question": "Who served as the very first President of the United States under the Constitution?",
        "options": {
            "A": "Thomas Jefferson",
            "B": "Alexander Hamilton",
            "C": "George Washington",
            "D": "John Adams"
        },
        "answer": "C",
        "explanation": "George Washington served as the first U.S. President from 1789 to 1797."
    },
    {
        "id": 34,
        "category": "History",
        "difficulty": "Easy",
        "question": "Which famous luxury passenger ocean liner sank on its maiden voyage in April 1912 after colliding with an iceberg?",
        "options": {
            "A": "Lusitania",
            "B": "Titanic",
            "C": "Britannic",
            "D": "Queen Mary"
        },
        "answer": "B",
        "explanation": "The RMS Titanic struck an iceberg in the North Atlantic on April 14, 1912."
    },
    {
        "id": 35,
        "category": "History",
        "difficulty": "Easy",
        "question": "Which pre-Columbian South American civilization constructed the mountain citadel of Machu Picchu in Peru?",
        "options": {
            "A": "Aztec",
            "B": "Maya",
            "C": "Inca",
            "D": "Olmec"
        },
        "answer": "C",
        "explanation": "Machu Picchu was built by the Inca Empire in the 15th century under Emperor Pachacuti."
    },
    {
        "id": 36,
        "category": "History",
        "difficulty": "Medium",
        "question": "Which Roman statesman was assassinated on the Ides of March in 44 BC after declaring himself dictator in perpetuity?",
        "options": {
            "A": "Mark Antony",
            "B": "Augustus",
            "C": "Julius Caesar",
            "D": "Nero"
        },
        "answer": "C",
        "explanation": "Julius Caesar was assassinated on March 15, 44 BC by Roman senators led by Brutus and Cassius."
    },
    {
        "id": 37,
        "category": "History",
        "difficulty": "Medium",
        "question": "In which pivotal year did the Berlin Wall open and begin being demolished, signaling the end of the Cold War division in Germany?",
        "options": {
            "A": "1979",
            "B": "1985",
            "C": "1989",
            "D": "1991"
        },
        "answer": "C",
        "explanation": "The Berlin Wall fell on November 9, 1989, paving the way for German reunification."
    },
    {
        "id": 38,
        "category": "History",
        "difficulty": "Medium",
        "question": "Which historic charter of rights was King John of England compelled to seal at Runnymede in 1215?",
        "options": {
            "A": "Bill of Rights",
            "B": "Magna Carta",
            "C": "Declaration of Arbroath",
            "D": "Petition of Right"
        },
        "answer": "B",
        "explanation": "The Magna Carta (1215) established the principle that everyone, even the king, was subject to the law."
    },
    {
        "id": 39,
        "category": "History",
        "difficulty": "Medium",
        "question": "Who was the First Secretary of the Communist Party of the Soviet Union during the 1962 Cuban Missile Crisis?",
        "options": {
            "A": "Joseph Stalin",
            "B": "Leonid Brezhnev",
            "C": "Nikita Khrushchev",
            "D": "Mikhail Gorbachev"
        },
        "answer": "C",
        "explanation": "Nikita Khrushchev led the USSR during the tense October 1962 confrontation with the United States."
    },
    {
        "id": 40,
        "category": "History",
        "difficulty": "Medium",
        "question": "What was the historical network of Eurasian trade routes connecting East Asia with the Mediterranean known as?",
        "options": {
            "A": "Amber Road",
            "B": "Incense Route",
            "C": "Silk Road",
            "D": "King's Highway"
        },
        "answer": "C",
        "explanation": "The Silk Road was the vast trade route network facilitating economic and cultural exchange for centuries."
    },
    {
        "id": 41,
        "category": "History",
        "difficulty": "Hard",
        "question": "Which series of peace treaties negotiated in 1648 concluded the devastating Thirty Years' War and established the modern concept of state sovereignty in Europe?",
        "options": {
            "A": "Treaty of Utrecht",
            "B": "Peace of Westphalia",
            "C": "Treaty of Tordesillas",
            "D": "Congress of Vienna"
        },
        "answer": "B",
        "explanation": "The Peace of Westphalia (1648) ended the Thirty Years' War and laid the foundation for modern international diplomacy."
    },
    {
        "id": 42,
        "category": "History",
        "difficulty": "Hard",
        "question": "At which historic battle in June 1815 was Napoleon Bonaparte decisively defeated by British and Prussian armies?",
        "options": {
            "A": "Battle of Austerlitz",
            "B": "Battle of Leipzig",
            "C": "Battle of Waterloo",
            "D": "Battle of Trafalgar"
        },
        "answer": "C",
        "explanation": "The Battle of Waterloo in Belgium marked the final military defeat of French Emperor Napoleon."
    },
    {
        "id": 43,
        "category": "History",
        "difficulty": "Hard",
        "question": "In 1453, which historic imperial capital fell to the Ottoman forces of Sultan Mehmed II, ending the Byzantine Empire?",
        "options": {
            "A": "Athens",
            "B": "Alexandria",
            "C": "Constantinople",
            "D": "Antioch"
        },
        "answer": "C",
        "explanation": "The Fall of Constantinople in May 1453 marked the end of the Roman Empire's Byzantine successor state."
    },
    {
        "id": 44,
        "category": "History",
        "difficulty": "Hard",
        "question": "Who was the first emperor of a unified China who founded the Qin dynasty and commissioned the Terracotta Army?",
        "options": {
            "A": "Liu Bang",
            "B": "Qin Shi Huang",
            "C": "Wu of Han",
            "D": "Kublai Khan"
        },
        "answer": "B",
        "explanation": "Qin Shi Huang conquered the Warring States and became the first Emperor of unified China in 221 BC."
    },
    {
        "id": 45,
        "category": "History",
        "difficulty": "Hard",
        "question": "Which Scottish-born inventor was awarded the first U.S. patent for the electromagnetic telephone in 1876?",
        "options": {
            "A": "Thomas Edison",
            "B": "Nikola Tesla",
            "C": "Alexander Graham Bell",
            "D": "Guglielmo Marconi"
        },
        "answer": "C",
        "explanation": "Alexander Graham Bell received U.S. Patent 174,465 for the telephone in March 1876."
    },
    {
        "id": 46,
        "category": "General Knowledge",
        "difficulty": "Easy",
        "question": "What is the largest and deepest of the world's five oceanic divisions?",
        "options": {
            "A": "Atlantic Ocean",
            "B": "Indian Ocean",
            "C": "Pacific Ocean",
            "D": "Arctic Ocean"
        },
        "answer": "C",
        "explanation": "The Pacific Ocean covers more than 30% of the Earth's total surface area."
    },
    {
        "id": 47,
        "category": "General Knowledge",
        "difficulty": "Easy",
        "question": "Which is the tallest living terrestrial animal on Earth?",
        "options": {
            "A": "African Elephant",
            "B": "Giraffe",
            "C": "Ostrich",
            "D": "Moose"
        },
        "answer": "B",
        "explanation": "Giraffes can reach heights of up to 5.7 meters (18.7 feet)."
    },
    {
        "id": 48,
        "category": "General Knowledge",
        "difficulty": "Easy",
        "question": "How many days are in a standard leap year in the Gregorian calendar?",
        "options": {
            "A": "364",
            "B": "365",
            "C": "366",
            "D": "367"
        },
        "answer": "C",
        "explanation": "A leap year contains 366 days due to the addition of February 29th."
    },
    {
        "id": 49,
        "category": "General Knowledge",
        "difficulty": "Easy",
        "question": "What is the capital city of Japan?",
        "options": {
            "A": "Kyoto",
            "B": "Osaka",
            "C": "Tokyo",
            "D": "Hiroshima"
        },
        "answer": "C",
        "explanation": "Tokyo is the bustling capital and most populous metropolis of Japan."
    },
    {
        "id": 50,
        "category": "General Knowledge",
        "difficulty": "Easy",
        "question": "How many interlocking rings make up the official symbol of the Olympic Games?",
        "options": {
            "A": "4",
            "B": "5",
            "C": "6",
            "D": "7"
        },
        "answer": "B",
        "explanation": "The Olympic symbol consists of five interlocking rings representing the five continents."
    },
    {
        "id": 51,
        "category": "General Knowledge",
        "difficulty": "Medium",
        "question": "Which is the highest mountain peak above sea level on Earth, situated in the Himalayas?",
        "options": {
            "A": "K2",
            "B": "Kangchenjunga",
            "C": "Mount Everest",
            "D": "Lhotse"
        },
        "answer": "C",
        "explanation": "Mount Everest stands at 8,848.86 meters (29,031.7 ft) above sea level."
    },
    {
        "id": 52,
        "category": "General Knowledge",
        "difficulty": "Medium",
        "question": "What is the official currency unit of the United Kingdom?",
        "options": {
            "A": "Euro",
            "B": "Pound Sterling",
            "C": "Franc",
            "D": "Krona"
        },
        "answer": "B",
        "explanation": "The British pound sterling (GBP, \u00a3) is the official currency of the United Kingdom."
    },
    {
        "id": 53,
        "category": "General Knowledge",
        "difficulty": "Medium",
        "question": "Which is the largest hot desert in the world, covering much of North Africa?",
        "options": {
            "A": "Gobi Desert",
            "B": "Kalahari Desert",
            "C": "Sahara Desert",
            "D": "Arabian Desert"
        },
        "answer": "C",
        "explanation": "The Sahara Desert spans approximately 9.2 million square kilometers in northern Africa."
    },
    {
        "id": 54,
        "category": "General Knowledge",
        "difficulty": "Medium",
        "question": "Which renowned Italian Renaissance master created the masterpiece portrait known as the Mona Lisa?",
        "options": {
            "A": "Michelangelo",
            "B": "Raphael",
            "C": "Leonardo da Vinci",
            "D": "Donatello"
        },
        "answer": "C",
        "explanation": "Leonardo da Vinci painted the Mona Lisa in the early 16th century."
    },
    {
        "id": 55,
        "category": "General Knowledge",
        "difficulty": "Medium",
        "question": "Which country presented the colossal neoclassical sculpture 'Statue of Liberty' as a gift to the United States in the 19th century?",
        "options": {
            "A": "United Kingdom",
            "B": "Spain",
            "C": "France",
            "D": "Italy"
        },
        "answer": "C",
        "explanation": "The Statue of Liberty was a gift of friendship from the people of France, dedicated in 1886."
    },
    {
        "id": 56,
        "category": "General Knowledge",
        "difficulty": "Hard",
        "question": "What is the deepest surveyed oceanic depression on Earth, located in the western Pacific Ocean?",
        "options": {
            "A": "Puerto Rico Trench",
            "B": "Java Trench",
            "C": "Mariana Trench",
            "D": "Tonga Trench"
        },
        "answer": "C",
        "explanation": "The Challenger Deep in the Mariana Trench reaches approximately 10,994 meters (36,070 ft) below sea level."
    },
    {
        "id": 57,
        "category": "General Knowledge",
        "difficulty": "Hard",
        "question": "What is the smallest independent state in the world by both geographic area and population?",
        "options": {
            "A": "Monaco",
            "B": "San Marino",
            "C": "Vatican City",
            "D": "Liechtenstein"
        },
        "answer": "C",
        "explanation": "Vatican City occupies an enclave of only about 0.49 square kilometers in Rome, Italy."
    },
    {
        "id": 58,
        "category": "General Knowledge",
        "difficulty": "Hard",
        "question": "Which is the only mammal capable of true, powered sustained flight?",
        "options": {
            "A": "Flying Squirrel",
            "B": "Sugar Glider",
            "C": "Bat",
            "D": "Colugo"
        },
        "answer": "C",
        "explanation": "Bats (order Chiroptera) are the only mammals capable of sustained, powered aerodynamic flight."
    },
    {
        "id": 59,
        "category": "General Knowledge",
        "difficulty": "Hard",
        "question": "Which river has the largest drainage basin and average water discharge in the world?",
        "options": {
            "A": "Nile River",
            "B": "Yangtze River",
            "C": "Amazon River",
            "D": "Mississippi River"
        },
        "answer": "C",
        "explanation": "The Amazon River carries more water discharge than the next seven largest rivers combined."
    },
    {
        "id": 60,
        "category": "General Knowledge",
        "difficulty": "Hard",
        "question": "Which of the following awards was not part of the original five Nobel Prizes established in 1895 by Alfred Nobel's will, but was founded later in 1968?",
        "options": {
            "A": "Peace",
            "B": "Literature",
            "C": "Economic Sciences",
            "D": "Physiology or Medicine"
        },
        "answer": "C",
        "explanation": "The Sveriges Riksbank Prize in Economic Sciences in Memory of Alfred Nobel was established in 1968."
    }
]
def _load_json(filename, default_data):
    if not os.path.exists(filename):
        with open(filename, "w") as f:
            json.dump(default_data, f, indent=4)
        return default_data
    try:
        with open(filename, "r") as f:
            content = f.read().strip()
            if not content:
                return default_data
            return json.loads(content)
    except (json.JSONDecodeError, FileNotFoundError):
        with open(filename, "w") as f:
            json.dump(default_data, f, indent=4)
        return default_data

def _save_json(filename, data):
    with open(filename, "w") as f:
        json.dump(data, f, indent=4)

def load_users():
    # Seed default admin user
    default_users = [
        {
            "username": "admin",
            "password": "adminpassword",
            "is_admin": True,
            "quizzes_played": 0,
            "total_score": 0,
            "high_score": 0,
            "category_stats": {}
        }
    ]
    return _load_json(USERS_FILE, default_users)

def save_users(users):
    _save_json(USERS_FILE, users)

def load_quizzes():
    return _load_json(QUIZZES_FILE, DEFAULT_QUESTIONS)

def save_quizzes(quizzes):
    _save_json(QUIZZES_FILE, quizzes)
