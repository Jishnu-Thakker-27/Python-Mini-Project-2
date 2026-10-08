import { Contender, Question, UserStats } from '../types';

export const AETHER_LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1VLG1EEL74GEZu32N1HcaHpntMZNqTHuBXtqZFN0dzGlqH-zMlWoHTwaFVy1mP9f454NxooPxJgKKOhz1_s6ZV3rpOtftzXVYB9Nvs9Zkybp4OvcEX_gErjfpJupuxPyedcTH_AJB0qOclyH0TgKElUpHSVn6s3pvqFxm-8yjKp9JtOuUi9FC1H7AeNhn6BrFzlJtRY8jhUovmIVEpTl9lUPf4fVx3Ra5ungyxuniSTSvgLG1ixR1tLaZU';

export const USER_AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA9gHgGbh8_tPQzIsblnGdSHbU5MVtlwGLg96zb9x5ENAeYCYmBjnD2IvyE9P12pVn1A94lfF--03uZ8_sO0m9ltPlvcdAVRt9gfVnAERURluzs1qgSLHeNlRxj-Ve9mbtObCExZS6r4hU76i0mHyKgzWkVKz4gTEV_UQ-8oyNrgqq6vp8FdaYrfT88ge4sJ_aGDKcZsLqDNERsX5XPCzheu8zLk4pFHsUFBISn7hTZ_RTE40ImyzGh';

export const INITIAL_USER_STATS: UserStats = {
  name: 'Alex Mercer',
  email: 'alex.mercer@aether.io',
  title: 'Master Strategist',
  rank: 4,
  points: 1840,
  streak: 5,
  quizzesTaken: 142,
  weeklyGoal: {
    completed: 24,
    total: 30,
  },
  accuracy: 88,
  avatarUrl: USER_AVATAR_URL,
  pastQuizzes: [
    {
      title: 'Quantum Realism',
      timeAgo: 'Yesterday',
      score: '10/10',
      totalQuestions: 10,
      correctCount: 10,
    },
    {
      title: 'Aero Astrophysics',
      timeAgo: '3 days ago',
      score: '13/15',
      totalQuestions: 15,
      correctCount: 13,
    },
    {
      title: 'Orbital Mechanics & Chaos',
      timeAgo: 'Last week',
      score: '8/10',
      totalQuestions: 10,
      correctCount: 8,
    },
  ],
};

export const CONTENDERS_LIST: Contender[] = [
  {
    rank: 1,
    name: 'Elena R.',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBMklliXwc-NZHD6LDY6mBTL1ozfpQA5FfXlNfOqq8Wuu3nuelyjdJRICoCp4vItk462Q8hGj8V--qxUKZDYVhnBqTnKlkR8XKo1cgpItXDnW4ZZxvrooWNo5PYD7B2jTYY3V8qEjwcSuqIyAubpKxQlkplkFp9O0TL8PQx26sWKdGzO83xWqqUxzr3OLBGqH3hCRU5u9G7cO-yFCg-aaOXZp0_XlMhoXvxQlCl5QV6k9kjLpn7rkiE',
    quizzes: 48,
    accuracy: 98,
    points: 2450,
    tier: 'Grandmaster',
  },
  {
    rank: 2,
    name: 'Kenji Sato',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDGb_QwIXIgIN9ed1Ff2Nqz94Jc72p8pf2cQl8-pZ07TbMktgzdVv9fCN3wYETo5iq8esTXHEGnDuToAqPbNlFYE4bkrkrGnPm_Ko4wgCamghkoJgRQYtH63jAwE1Q5EZ125W1KyVUqU95ulkpmM1OVBr7DVu-XS_zjSWMyxroiKhco9_HMWPZbDOZoYUx8xXWEMrSHOMjU1I9-Tk2aABQxHwry2qs_JvBANoew5aX8fZ4aU88_1Ip6',
    quizzes: 39,
    accuracy: 92,
    points: 2210,
    tier: 'Ascendant',
  },
  {
    rank: 3,
    name: 'Maya Patel',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAjrEXA6g9dqZYlmklwzPz5YyQFI_BPMzZ4YEbly3E0iVcwd-CdRkYnlHllgx7yzpf5qzRgg6uNWGvA4KCmvG_YS99LmWBop-IXOygZhXSD5H0o_D7jwfF5uEQo7OVCnvnWRTYUSXlBAC8Sz7hptjEjRHHe-miiI5fxxPDbscKGN0aEwS67p1X6kLRTp8JH6z2oG7QryK0Ovd0Lwl7oRk8vCn12-G9ZYha2ob2mv3CKOO3zZ3JdbzDX',
    quizzes: 34,
    accuracy: 89,
    points: 2040,
    tier: 'Ascendant',
  },
  {
    rank: 4,
    name: 'Alex Mercer',
    avatarUrl: USER_AVATAR_URL,
    quizzes: 24,
    accuracy: 88,
    points: 1840,
    tier: 'Master Strategist',
    isUser: true,
  },
  {
    rank: 5,
    name: "Liam O'Connor",
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDxDaWp6CpSwRXax7hz17YV3toHovmU0W7P0eaIxXHTawIKWnxXywVM07LH3YkZm903BYu5BVQb3rI-jv-cNUvRKAunq4FvjDI5w40d-_15LKHQb8xUJeqgjUnpy1PZFVyaxU8NShwrR7B7V4Ddt0Vc8NSqDi8MUNohoJTJ3UdIy5-N56RzXSOtwfX2kDUXGa09yhuXxQqyiCgUT0KBOO3X0hBkyfbZPdDdf8NEf9WJtlT8YZiN28qm',
    quizzes: 21,
    accuracy: 84,
    points: 1790,
    tier: 'Challenger',
  },
  {
    rank: 6,
    name: 'Sophia Chen',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAVSIbXqiaC6LEWV3sU090AQkGgewmWIGjpYZHekEi8Y9yuSWFXia2fOiSGemWqyx4kuQPkUsVyoiMnymTddYlRYLzxH2H9gkDcrH78XMEvLnZrT_oqL9VEhovm92M5G75rmTaf6R3E0nVmhHzwxoYOs9Vdt7pUQdfoohmcE6DLB_4cH3-cK6YDX_m2-7IA_kOw-0ApcbipZ9E0YcM856bkahayrqZRtpStGXQWvXDjIVEoQ6RbLilL',
    quizzes: 19,
    accuracy: 86,
    points: 1720,
    tier: 'Challenger',
  },
  {
    rank: 7,
    name: 'Marcus Vance',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCvYd1rezR_ljKiPIxOCAFB_ciSP_HNSMjyB48Ggr6bVNMUWiZCElgQcLrjiFADdT82nbnZnxSwDDIwljHJE-QVE39XRoL2pZ6PSo6u5mIK_1QOL9p2pJa02O_UchxskryLrNdJ9z1BYuGIPQ1Q5dTOiPLKO_YEpsYcHs-WyFu0c2kfEJr5X9UJ8dBVy5I-6cNtrVJ9sdcXZPMtFLb6ERmm9vFoKFerPhFk_irARfv1nhj1EVLDuFGg',
    quizzes: 18,
    accuracy: 81,
    points: 1680,
    tier: 'Challenger',
  },
  {
    rank: 8,
    name: 'Clara Lindqvist',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDPPXdUaWfw5n1yDbEsUDytO3cAmTfkQAPUumHVxgqsTIlUkfEjEXyIKxNhR3Ja3nRDC1s5Duo24mZXyRknS-XNOUuyeXPQktTcZl6LXuckCNrh_7fa7UZ0aZ-qbvsYtGaK5EelfuSHkxsGpVsnb4qiMbtKGl-msCDkfjLQh7FfUTiVqcdocr4iPfWu-ih3H2pTR4nL23BtVgXhv4bFz6754HIW33HraH7QCHuLtqhPIB5IAvkzFo11',
    quizzes: 17,
    accuracy: 79,
    points: 1610,
    tier: 'Challenger',
  },
  {
    rank: 9,
    name: 'Tariq Al-Mansoor',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ_KD_LG8bS6y_jgjCUVPyBPAhMcGipCc6FeMfaU8Lf6-nAdJtbmtPvOjokRma-8QSG3Ia-CAOkLBmgVZk18tGOrfHcZ3rcMHMbvqxEzBkjkjYpyyMFgb0gUMOfO50Ar4l6knK48RWoULE0-AVFZXUZEOlPC3H7S8fk-aHoTEQVYRhyqt1n2h2TKdF0-7R2-frRPImTdqF9_N9umQffJkTBQrK0cx6l7TXprUs7WpEJQl40AyC9VwR',
    quizzes: 16,
    accuracy: 83,
    points: 1590,
    tier: 'Challenger',
  },
  {
    rank: 10,
    name: 'Zoe Martinez',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuALG4CPFoh9EDmbnpFQQtiU4P2Ldiita4MNUZhOQd-dasxE2A_hJ5KXBNdzEk6gaxoYa_s5jnRcoWhnV1B6S7PvpQ9WASztjUm9tn539s2UM9KiL81CUZV2uAhyB8fludwjr_SbPCI0ydPUcj9e_0xzP5KPnnWL7Ukuq2NMGmEhn0SxsXqPvUfHLwI3davHKZmw62Svb5P351QdWZSim7nayTqw8_AWfAwwNEyLZaX8QqDzrMvwW0p6',
    quizzes: 15,
    accuracy: 76,
    points: 1540,
    tier: 'Challenger',
  },
];

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    domain: 'Science & Astronomy',
    category: 'Solar Energetics',
    question: 'Through which primary nuclear fusion reaction does the Sun produce the vast majority of its luminosity?',
    difficulty: 'Standard Difficulty',
    options: [
      { letter: 'A', text: 'Proton-proton (p-p) chain reaction' },
      { letter: 'B', text: 'Carbon-Nitrogen-Oxygen (CNO) cycle' },
      { letter: 'C', text: 'Triple-alpha helium burning process' },
      { letter: 'D', text: 'Silicon flash photo-disintegration' },
    ],
    correctAnswer: 'A',
    hint: {
      title: 'Stellar Fusion Hint',
      description: 'Stars with masses comparable to our Sun rely on hydrogen nuclei fusing directly into helium nuclei via electroweak interactions.',
      formula: '4 ¹H → ⁴He + 2e⁺ + 2νₑ + 26.7 MeV',
    },
    pointsReward: 100,
  },
  {
    id: 2,
    domain: 'Science & Astronomy',
    category: 'Celestial Mechanics',
    question: "What is the name of the gravitational balance points where a third small mass can orbit synchronously with two large bodies?",
    difficulty: 'Standard Difficulty',
    options: [
      { letter: 'A', text: 'Keplerian Nodes' },
      { letter: 'B', text: 'Lagrange Points (L1 - L5)' },
      { letter: 'C', text: 'Roche Lobes' },
      { letter: 'D', text: 'Schwarzschild Radii' },
    ],
    correctAnswer: 'B',
    hint: {
      title: 'Orbital Geometry',
      description: 'Named after Joseph-Louis Lagrange in 1772, these 5 positions balance centripetal acceleration with combined gravitational attraction.',
    },
    pointsReward: 110,
  },
  {
    id: 3,
    domain: 'Science & Astronomy',
    category: 'Relativity & Time',
    question: 'According to general relativity, how does a deeper gravitational well affect the passage of time relative to a distant observer?',
    difficulty: 'Standard Difficulty',
    options: [
      { letter: 'A', text: 'Time flows strictly faster' },
      { letter: 'B', text: 'Time halts completely at all altitudes' },
      { letter: 'C', text: 'Gravitational time dilation causes clocks to tick slower' },
      { letter: 'D', text: 'Time oscillates with inverse square velocity' },
    ],
    correctAnswer: 'C',
    hint: {
      title: 'Spacetime Curvature',
      description: 'Higher spacetime curvature causes worldlines to stretch, resulting in redshifted frequencies and dilated clock ticks.',
      formula: 't₀ = t_f √(1 - 2GM/rc²)',
    },
    pointsReward: 115,
  },
  {
    id: 4,
    domain: 'Science & Astronomy',
    category: 'Planetary Atmospheres',
    question: 'Which gas comprises roughly 95% of Mars’ thin atmospheric blanket?',
    difficulty: 'Standard Difficulty',
    options: [
      { letter: 'A', text: 'Molecular Nitrogen (N₂)' },
      { letter: 'B', text: 'Carbon Dioxide (CO₂)' },
      { letter: 'C', text: 'Argon (Ar)' },
      { letter: 'D', text: 'Methane (CH₄)' },
    ],
    correctAnswer: 'B',
    hint: {
      title: 'Martian Composition',
      description: 'The rust-colored planet possesses a surface pressure around 6.1 millibars, overwhelmingly saturated with oxidized carbon.',
    },
    pointsReward: 100,
  },
  {
    id: 5,
    domain: 'Science & Astronomy',
    category: 'Cosmic Microwave Background',
    question: 'What is the blackbody equilibrium temperature of the Cosmic Microwave Background radiation today?',
    difficulty: 'Standard Difficulty',
    options: [
      { letter: 'A', text: 'Approximately 2.73 Kelvin' },
      { letter: 'B', text: 'Approximately 4.15 Kelvin' },
      { letter: 'C', text: '0.00 Kelvin absolute' },
      { letter: 'D', text: '12.4 Kelvin' },
    ],
    correctAnswer: 'A',
    hint: {
      title: 'Cosmic Remnant',
      description: 'The faint residual glow of the Big Bang recombination epoch measured precisely by COBE and Planck satellite missions.',
      formula: 'T ≈ 2.7255 K',
    },
    pointsReward: 120,
  },
  {
    id: 6,
    domain: 'Science & Astronomy',
    category: 'Astrophysics • Optics',
    question: 'What phenomenon causes the sky to appear blue during clear daylight on Earth?',
    difficulty: 'Standard Difficulty',
    options: [
      { letter: 'A', text: 'Rayleigh scattering of sunlight by atmospheric gas molecules' },
      { letter: 'B', text: 'Reflection from ocean waters across planetary mirrors' },
      { letter: 'C', text: 'High altitude ozone photochemical fluorescence' },
      { letter: 'D', text: 'Refraction through hexagonal ice crystals in the troposphere' },
    ],
    correctAnswer: 'A',
    hint: {
      title: 'Telescope Hint',
      description: 'Notice the inverse relationship between wavelength and dispersion probability. Shorter light wavelengths spread far more readily across airborne molecules.',
      formula: 'I ∝ 1/λ⁴',
    },
    pointsReward: 120,
  },
  {
    id: 7,
    domain: 'Science & Astronomy',
    category: 'Galactic Structure',
    question: 'What is the supermassive black hole located at the gravitational center of the Milky Way galaxy?',
    difficulty: 'Standard Difficulty',
    options: [
      { letter: 'A', text: 'Cygnus X-1' },
      { letter: 'B', text: 'Sagittarius A*' },
      { letter: 'C', text: 'Messier 87*' },
      { letter: 'D', text: 'Centaurus A' },
    ],
    correctAnswer: 'B',
    hint: {
      title: 'Galactic Nucleus',
      description: 'Observed by Reinhard Genzel and Andrea Ghez by tracking S-star orbits, harboring approximately 4.15 million solar masses.',
    },
    pointsReward: 125,
  },
  {
    id: 8,
    domain: 'Science & Astronomy',
    category: 'Quantum Electrodynamics',
    question: 'Which gauge boson is the fundamental mediator of the electromagnetic interaction between charged particles?',
    difficulty: 'Standard Difficulty',
    options: [
      { letter: 'A', text: 'Gluon' },
      { letter: 'B', text: 'W and Z bosons' },
      { letter: 'C', text: 'Photon (γ)' },
      { letter: 'D', text: 'Higgs boson' },
    ],
    correctAnswer: 'C',
    hint: {
      title: 'Carrier Particles',
      description: 'Massless, spin-1 vector boson traveling at the constant speed c in vacuum, possessing U(1) gauge symmetry.',
    },
    pointsReward: 130,
  },
  {
    id: 9,
    domain: 'Science & Astronomy',
    category: 'Exoplanetary Science',
    question: 'What method has discovered the greatest number of confirmed exoplanets to date (e.g., Kepler & TESS missions)?',
    difficulty: 'Standard Difficulty',
    options: [
      { letter: 'A', text: 'Transit photometry (dip in host star brightness)' },
      { letter: 'B', text: 'Direct coronagraphic imaging' },
      { letter: 'C', text: 'Pulsar timing anomaly calculation' },
      { letter: 'D', text: 'Gravitational microlensing only' },
    ],
    correctAnswer: 'A',
    hint: {
      title: 'Light Curves',
      description: 'Occurs when an orbiting exoplanet crosses the line of sight between the observer and its parent star.',
      formula: 'ΔF / F ≈ (R_p / R_star)²',
    },
    pointsReward: 135,
  },
  {
    id: 10,
    domain: 'Science & Astronomy',
    category: 'Cosmological Destiny',
    question: 'What mysterious component accounts for approximately 68% of the total energy density of the observable universe, accelerating cosmic expansion?',
    difficulty: 'Standard Difficulty',
    options: [
      { letter: 'A', text: 'Baryonic matter' },
      { letter: 'B', text: 'Cold Dark Matter (WIMPs)' },
      { letter: 'C', text: 'Dark Energy (Cosmological Constant Λ)' },
      { letter: 'D', text: 'Relativistic neutrino flux' },
    ],
    correctAnswer: 'C',
    hint: {
      title: 'Cosmic Expansion',
      description: 'Discovered in 1998 through observations of distant Type Ia supernovae, creating a repulsive negative pressure.',
      formula: 'w = P/ρ ≈ -1',
    },
    pointsReward: 150,
  },
];
