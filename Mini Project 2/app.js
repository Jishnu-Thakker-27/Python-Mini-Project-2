// ============================================================
// AETHER QUIZ - CLIENT CONTROLLER (Vanilla JavaScript)
// Pure HTML, CSS, and JS integration with Python Backend
// ============================================================

(function () {
  'use strict';

  // --- APPLICATION STATE ---
  const state = {
    theme: 'light',
    currentUser: null,
    activeQuiz: null,
    selectedCategory: 'Mixed',
    selectedDifficulty: 'Any',
    availableCategories: ['Programming', 'Science', 'History', 'General Knowledge'],
    adminQuestions: [],
    leaderboardData: [],
    streak: 5,
    userAvatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9gHgGbh8_tPQzIsblnGdSHbU5MVtlwGLg96zb9x5ENAeYCYmBjnD2IvyE9P12pVn1A94lfF--03uZ8_sO0m9ltPlvcdAVRt9gfVnAERURluzs1qgSLHeNlRxj-Ve9mbtObCExZS6r4hU76i0mHyKgzWkVKz4gTEV_UQ-8oyNrgqq6vp8FdaYrfT88ge4sJ_aGDKcZsLqDNERsX5XPCzheu8zLk4pFHsUFBISn7hTZ_RTE40ImyzGh'
  };

  // --- DOM CACHE ---
  const el = {
    // Header & Navigation
    header: document.getElementById('app-header'),
    brandLogo: document.getElementById('brand-logo'),
    headerSubtitle: document.getElementById('header-subtitle'),
    btnThemeToggle: document.getElementById('btn-theme-toggle'),
    themeIcon: document.getElementById('theme-icon'),
    profileTriggerBtn: document.getElementById('profile-trigger-btn'),
    headerAvatarImg: document.getElementById('header-avatar-img'),

    // Bottom Navigation
    bottomNav: document.getElementById('bottom-nav'),
    navTabHome: document.getElementById('nav-tab-home'),
    navTabQuiz: document.getElementById('nav-tab-quiz'),
    navTabRankings: document.getElementById('nav-tab-rankings'),

    // Screens
    screens: {
      auth: document.getElementById('auth-screen'),
      dashboard: document.getElementById('dashboard-screen'),
      quiz: document.getElementById('quiz-screen'),
      results: document.getElementById('results-screen'),
      leaderboard: document.getElementById('leaderboard-screen'),
      admin: document.getElementById('admin-screen')
    },

    // Auth Screen
    authThemeToggle: document.getElementById('auth-theme-toggle'),
    authThemeIcon: document.getElementById('auth-theme-icon'),
    tabLogin: document.getElementById('tab-login'),
    tabRegister: document.getElementById('tab-register'),
    tabGuest: document.getElementById('tab-guest'),
    loginForm: document.getElementById('login-form'),
    registerForm: document.getElementById('register-form'),
    guestForm: document.getElementById('guest-form'),
    guestPlayBtn: document.getElementById('guest-play-btn'),
    authAlert: document.getElementById('auth-alert'),

    // Dashboard Screen
    dashAvatarImg: document.getElementById('dash-avatar-img'),
    dashDisplayName: document.getElementById('dash-display-name'),
    dashRankMeta: document.getElementById('dash-rank-meta'),
    dashStartShortcut: document.getElementById('dash-start-quiz-shortcut'),
    statHighScore: document.getElementById('stat-high-score'),
    statTotalScore: document.getElementById('stat-total-score'),
    statQuizzesPlayed: document.getElementById('stat-quizzes-played'),
    statAccuracy: document.getElementById('stat-accuracy'),
    categoryPillsContainer: document.getElementById('category-pills-container'),
    difficultyPillsContainer: document.getElementById('difficulty-pills-container'),
    btnStartQuiz: document.getElementById('btn-start-quiz'),
    btnViewLeaderboard: document.getElementById('btn-view-leaderboard'),
    btnDashAdmin: document.getElementById('btn-dash-admin'),

    // Quiz Arena Screen
    btnQuitQuiz: document.getElementById('btn-quit-quiz'),
    quizCatBadge: document.getElementById('quiz-cat-badge'),
    liveMultiplierBadge: document.getElementById('live-multiplier-badge'),
    liveMultiplierText: document.getElementById('live-multiplier-text'),
    quizTimeDisplay: document.getElementById('quiz-time-display'),
    svgProgressCircle: document.getElementById('svg-progress-circle'),
    circleProgressPercent: document.getElementById('circle-progress-percent'),
    liveStreakLabel: document.getElementById('live-streak-label'),
    currentQIndex: document.getElementById('current-q-index'),
    totalQCount: document.getElementById('total-q-count'),
    qPointsReward: document.getElementById('q-points-reward'),
    quizProgressBar: document.getElementById('quiz-progress-bar'),
    stepIndicatorsContainer: document.getElementById('step-indicators-container'),
    qCategoryTag: document.getElementById('q-category-tag'),
    qText: document.getElementById('q-text'),
    qDiffBadge: document.getElementById('q-diff-badge'),
    optionsContainer: document.getElementById('options-container'),
    explanationBox: document.getElementById('explanation-box'),
    explanationStatus: document.getElementById('explanation-status'),
    explanationText: document.getElementById('explanation-text'),
    btnNextQuestion: document.getElementById('btn-next-question'),

    // Results Screen
    resultsSubtitle: document.getElementById('results-subtitle'),
    newHighScoreBanner: document.getElementById('new-high-score-banner'),
    resFinalScore: document.getElementById('res-final-score'),
    resCorrectRatio: document.getElementById('res-correct-ratio'),
    resSpeedBonuses: document.getElementById('res-speed-bonuses'),
    resTotalTime: document.getElementById('res-total-time'),
    btnPlayAgain: document.getElementById('btn-play-again'),
    btnResultsToLeaderboard: document.getElementById('btn-results-to-leaderboard'),
    btnResultsToDashboard: document.getElementById('btn-results-to-dashboard'),

    // Leaderboard Screen
    contendersCountLabel: document.getElementById('contenders-count-label'),
    leaderboardSearchInput: document.getElementById('leaderboard-search-input'),
    leaderboardCategoryTabs: document.getElementById('leaderboard-category-tabs'),
    podiumContainer: document.getElementById('podium-container'),
    contendersListContainer: document.getElementById('contenders-list-container'),

    // Admin Screen
    btnAdminBack: document.getElementById('btn-admin-back'),
    btnAdminAddQuestion: document.getElementById('btn-admin-add-question'),
    btnAdminResetStats: document.getElementById('btn-admin-reset-stats'),
    adminSearchInput: document.getElementById('admin-search-input'),
    adminQuestionsTbody: document.getElementById('admin-questions-tbody'),
    adminAddModal: document.getElementById('admin-add-modal'),
    btnCloseAdminAdd: document.getElementById('btn-close-admin-add'),
    btnCancelAddQ: document.getElementById('btn-cancel-add-q'),
    adminAddForm: document.getElementById('admin-add-form'),

    // Profile Modal
    profileModal: document.getElementById('profile-modal'),
    btnCloseProfile: document.getElementById('btn-close-profile'),
    modalAvatarImg: document.getElementById('modal-avatar-img'),
    modalProfileName: document.getElementById('modal-profile-name'),
    modalProfileEmail: document.getElementById('modal-profile-email'),
    modalRankBadge: document.getElementById('modal-rank-badge'),
    modalQuizzesTaken: document.getElementById('modal-quizzes-taken'),
    modalAccuracy: document.getElementById('modal-accuracy'),
    themeBtnLight: document.getElementById('theme-btn-light'),
    themeBtnDark: document.getElementById('theme-btn-dark'),
    profileEditForm: document.getElementById('profile-edit-form'),
    profInputName: document.getElementById('prof-input-name'),
    profInputEmail: document.getElementById('prof-input-email'),
    profInputPassword: document.getElementById('prof-input-password'),
    profilePastQuizzesContainer: document.getElementById('profile-past-quizzes-container'),
    btnLogout: document.getElementById('btn-logout'),

    // Confirm Quit Modal
    confirmQuitModal: document.getElementById('confirm-quit-modal'),
    btnCancelQuit: document.getElementById('btn-cancel-quit'),
    btnConfirmQuit: document.getElementById('btn-confirm-quit'),

    // Toast Shelf
    toastShelf: document.getElementById('toast-shelf')
  };

  // --- INITIALIZATION ---
  function init() {
    setupEventListeners();
    fetchCategories();

    // Check saved session
    const savedUser = sessionStorage.getItem('quiz_user');
    const savedTheme = localStorage.getItem('quiz_theme') || 'light';
    setTheme(savedTheme);

    if (savedUser) {
      try {
        state.currentUser = JSON.parse(savedUser);
        updateUserUI();
        showScreen('dashboard');
        refreshUserProfile();
        return;
      } catch (e) {
        sessionStorage.removeItem('quiz_user');
      }
    }

    showScreen('auth');
  }

  // --- THEME CONTROLLER ---
  function setTheme(newTheme) {
    state.theme = newTheme;
    localStorage.setItem('quiz_theme', newTheme);

    if (newTheme === 'dark') {
      document.body.classList.add('theme-dark-mode');
      if (el.themeIcon) el.themeIcon.textContent = 'light_mode';
      if (el.authThemeIcon) el.authThemeIcon.textContent = 'light_mode';
      if (el.themeBtnLight) el.themeBtnLight.classList.remove('active');
      if (el.themeBtnDark) el.themeBtnDark.classList.add('active');
    } else {
      document.body.classList.remove('theme-dark-mode');
      if (el.themeIcon) el.themeIcon.textContent = 'dark_mode';
      if (el.authThemeIcon) el.authThemeIcon.textContent = 'dark_mode';
      if (el.themeBtnLight) el.themeBtnLight.classList.add('active');
      if (el.themeBtnDark) el.themeBtnDark.classList.remove('active');
    }
  }

  function toggleTheme() {
    const nextTheme = state.theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  }

  // --- API HELPER ---
  async function api(endpoint, options = {}) {
    try {
      const res = await fetch(endpoint, {
        headers: { 'Content-Type': 'application/json' },
        ...options
      });
      return await res.json();
    } catch (err) {
      console.error('API Error:', err);
      showToast('Connection issue with Python server.', 'error');
      return { success: false, message: 'Server communication error.' };
    }
  }

  // --- TOAST NOTIFICATIONS ---
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-bubble ${type}`;
    let icon = 'info';
    if (type === 'success') icon = 'check_circle';
    if (type === 'error') icon = 'warning';

    toast.innerHTML = `<span class="material-symbols-outlined text-[18px]">${icon}</span> <span>${escapeHtml(message)}</span>`;
    el.toastShelf.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 320);
    }, 2800);
  }

  // --- SCREEN NAVIGATION ---
  function showScreen(screenKey) {
    Object.keys(el.screens).forEach((key) => {
      if (el.screens[key]) {
        el.screens[key].classList.toggle('active', key === screenKey);
      }
    });

    if (screenKey === 'auth') {
      el.header.classList.add('hidden');
      el.bottomNav.classList.add('hidden');
    } else {
      el.header.classList.remove('hidden');
      el.bottomNav.classList.remove('hidden');

      // Update Subtitle
      if (screenKey === 'dashboard') el.headerSubtitle.textContent = 'Mindful Sanctuary';
      else if (screenKey === 'quiz') el.headerSubtitle.textContent = 'Live Quiz Arena';
      else if (screenKey === 'leaderboard') el.headerSubtitle.textContent = 'Global Leaderboard';
      else if (screenKey === 'admin') el.headerSubtitle.textContent = 'Administrator Portal';

      // Update Bottom Nav Active Pills
      el.navTabHome.classList.toggle('active', screenKey === 'dashboard');
      el.navTabQuiz.classList.toggle('active', screenKey === 'quiz');
      el.navTabRankings.classList.toggle('active', screenKey === 'leaderboard');
    }

    if (screenKey === 'dashboard') renderDashboard();
    else if (screenKey === 'leaderboard') loadLeaderboard('Global');
    else if (screenKey === 'admin') loadAdminQuestions();
  }

  // --- USER DATA & PROFILE UI ---
  function updateUserUI() {
    if (!state.currentUser) return;
    const isGuest = state.currentUser.username.toLowerCase() === 'guest';
    const name = state.currentUser.name || state.currentUser.username;
    const avatar = state.currentUser.avatarUrl || state.userAvatarUrl;

    if (el.headerAvatarImg) el.headerAvatarImg.src = avatar;
    if (el.dashAvatarImg) el.dashAvatarImg.src = avatar;
    if (el.modalAvatarImg) el.modalAvatarImg.src = avatar;

    if (el.dashDisplayName) el.dashDisplayName.textContent = name;
    if (el.modalProfileName) el.modalProfileName.textContent = name;
    if (el.modalProfileEmail) el.modalProfileEmail.textContent = state.currentUser.email || `${state.currentUser.username}@aether.io`;

    // Admin Access Button
    if (state.currentUser.is_admin) {
      if (el.btnDashAdmin) el.btnDashAdmin.classList.remove('hidden');
    } else {
      if (el.btnDashAdmin) el.btnDashAdmin.classList.add('hidden');
    }
  }

  // --- AUTHENTICATION ---
  function setupAuthEvents() {
    el.tabLogin.addEventListener('click', () => switchAuthTab('login'));
    el.tabRegister.addEventListener('click', () => switchAuthTab('register'));
    el.tabGuest.addEventListener('click', () => switchAuthTab('guest'));

    if (el.authThemeToggle) {
      el.authThemeToggle.addEventListener('click', toggleTheme);
    }

    // Sign In Submit
    el.loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('login-username').value.trim();
      const password = document.getElementById('login-password').value;

      el.authAlert.classList.add('hidden');
      const res = await api('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });

      if (res.success && res.user) {
        state.currentUser = res.user;
        sessionStorage.setItem('quiz_user', JSON.stringify(res.user));
        updateUserUI();
        showToast(`Welcome back, ${res.user.name || res.user.username}!`, 'success');
        showScreen('dashboard');
      } else {
        el.authAlert.classList.remove('hidden');
        el.authAlert.textContent = res.message || 'Invalid username or passphrase.';
      }
    });

    // Register Submit
    el.registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-name').value.trim();
      const username = document.getElementById('reg-username').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const password = document.getElementById('reg-password').value;
      const confirmPassword = document.getElementById('reg-confirm-password').value;

      if (password !== confirmPassword) {
        el.authAlert.classList.remove('hidden');
        el.authAlert.textContent = 'Passphrases do not match. Please verify.';
        return;
      }

      el.authAlert.classList.add('hidden');
      const res = await api('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, username, email, password, avatar: state.userAvatarUrl })
      });

      if (res.success && res.user) {
        state.currentUser = res.user;
        sessionStorage.setItem('quiz_user', JSON.stringify(res.user));
        updateUserUI();
        showToast('Account created successfully! Welcome aboard.', 'success');
        showScreen('dashboard');
      } else {
        el.authAlert.classList.remove('hidden');
        el.authAlert.textContent = res.message || 'Registration failed.';
      }
    });

    // Guest Mode Button
    el.guestPlayBtn.addEventListener('click', () => {
      state.currentUser = {
        username: 'Guest',
        name: 'Guest Player',
        email: 'guest@quizapp.local',
        avatarUrl: state.userAvatarUrl,
        is_admin: false,
        quizzes_played: 0,
        total_score: 0,
        high_score: 0,
        category_stats: {},
        history: []
      };
      sessionStorage.setItem('quiz_user', JSON.stringify(state.currentUser));
      updateUserUI();
      showToast('Playing as Guest. Enjoy the quiz!', 'info');
      showScreen('dashboard');
    });
  }

  function switchAuthTab(tab) {
    el.tabLogin.classList.toggle('active', tab === 'login');
    el.tabRegister.classList.toggle('active', tab === 'register');
    el.tabGuest.classList.toggle('active', tab === 'guest');

    el.loginForm.classList.toggle('active', tab === 'login');
    el.registerForm.classList.toggle('active', tab === 'register');
    el.guestForm.classList.toggle('active', tab === 'guest');

    el.authAlert.classList.add('hidden');
  }

  // --- DASHBOARD ---
  function renderDashboard() {
    if (!state.currentUser) return;
    updateUserUI();

    const played = state.currentUser.quizzes_played || 0;
    const total = state.currentUser.total_score || 0;
    const high = state.currentUser.high_score || 0;
    const accuracy = played > 0 ? Math.min(100, Math.round(75 + (high / (played * 30 || 1)) * 25)) : 88;

    el.statHighScore.textContent = `${high} XP`;
    el.statTotalScore.textContent = `${total} XP`;
    el.statQuizzesPlayed.textContent = played;
    el.statAccuracy.textContent = `${accuracy}%`;

    if (el.dashRankMeta) {
      el.dashRankMeta.textContent = `Master Strategist • High Score: ${high} XP`;
    }
  }

  async function fetchCategories() {
    const res = await api('/api/categories');
    if (res.success && res.categories) {
      state.availableCategories = res.categories;
      renderCategoryPills(res.categories);
      renderLeaderboardCategoryTabs(res.categories);
    }
  }

  function renderCategoryPills(categories) {
    el.categoryPillsContainer.innerHTML = '';

    const mixedBtn = document.createElement('button');
    mixedBtn.className = 'choice-pill active';
    mixedBtn.setAttribute('data-category', 'Mixed');
    mixedBtn.textContent = '🎲 All Categories (Mixed)';
    el.categoryPillsContainer.appendChild(mixedBtn);

    categories.forEach((cat) => {
      const btn = document.createElement('button');
      btn.className = 'choice-pill';
      btn.setAttribute('data-category', cat);
      let icon = '📁';
      if (cat.toLowerCase().includes('prog')) icon = '💻';
      else if (cat.toLowerCase().includes('sci')) icon = '🔬';
      else if (cat.toLowerCase().includes('hist')) icon = '📜';
      else if (cat.toLowerCase().includes('knowl') || cat.toLowerCase().includes('gen')) icon = '🌍';
      btn.textContent = `${icon} ${cat}`;
      el.categoryPillsContainer.appendChild(btn);
    });

    el.categoryPillsContainer.querySelectorAll('.choice-pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        el.categoryPillsContainer.querySelectorAll('.choice-pill').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        state.selectedCategory = btn.getAttribute('data-category');
      });
    });
  }

  function renderLeaderboardCategoryTabs(categories) {
    el.leaderboardCategoryTabs.innerHTML = '';

    const globalTab = document.createElement('button');
    globalTab.className = 'lead-filter-tab active';
    globalTab.setAttribute('data-cat', 'Global');
    globalTab.textContent = '🌍 Global';
    el.leaderboardCategoryTabs.appendChild(globalTab);

    categories.forEach((cat) => {
      const tab = document.createElement('button');
      tab.className = 'lead-filter-tab';
      tab.setAttribute('data-cat', cat);
      let icon = '📁';
      if (cat.toLowerCase().includes('prog')) icon = '💻';
      else if (cat.toLowerCase().includes('sci')) icon = '🔬';
      else if (cat.toLowerCase().includes('hist')) icon = '📜';
      else if (cat.toLowerCase().includes('knowl') || cat.toLowerCase().includes('gen')) icon = '🌟';
      tab.textContent = `${icon} ${cat}`;
      el.leaderboardCategoryTabs.appendChild(tab);
    });

    el.leaderboardCategoryTabs.querySelectorAll('.lead-filter-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        el.leaderboardCategoryTabs.querySelectorAll('.lead-filter-tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        loadLeaderboard(tab.getAttribute('data-cat'));
      });
    });
  }

  // --- QUIZ ENGINE ---
  async function startQuiz() {
    const category = state.selectedCategory;
    const difficulty = state.selectedDifficulty;

    const res = await api(`/api/quiz/questions?category=${encodeURIComponent(category)}&difficulty=${encodeURIComponent(difficulty)}`);

    if (!res.success || !res.questions || res.questions.length === 0) {
      showToast(`No questions found for ${category} (${difficulty}).`, 'error');
      return;
    }

    state.activeQuiz = {
      category,
      difficulty,
      questions: res.questions,
      currentIndex: 0,
      score: 0,
      correctCount: 0,
      speedBonuses: 0,
      totalTime: 0,
      questionStartTime: null,
      timerInterval: null,
      isAnswered: false,
      answersMap: {}
    };

    el.quizCatBadge.textContent = category;
    el.totalQCount.textContent = (res.questions.length < 10 ? '0' : '') + res.questions.length;

    showScreen('quiz');
    loadQuestion(0);
  }

  function loadQuestion(index) {
    const quiz = state.activeQuiz;
    if (!quiz || index >= quiz.questions.length) {
      finishQuiz();
      return;
    }

    quiz.currentIndex = index;
    quiz.isAnswered = false;
    const q = quiz.questions[index];

    // Progress percentage
    const progressPercent = Math.round(((index + 1) / quiz.questions.length) * 100);
    const circumference = 2 * Math.PI * 30; // 188.49
    const strokeOffset = circumference - (circumference * progressPercent) / 100;
    el.svgProgressCircle.style.strokeDashoffset = strokeOffset;
    el.circleProgressPercent.textContent = `${progressPercent}%`;
    el.quizProgressBar.style.width = `${progressPercent}%`;

    // Question number & Points reward
    const qNumFormatted = (index + 1 < 10 ? '0' : '') + (index + 1);
    el.currentQIndex.textContent = qNumFormatted;
    let rewardPoints = 10;
    if (q.difficulty === 'Medium') rewardPoints = 20;
    else if (q.difficulty === 'Hard') rewardPoints = 30;
    el.qPointsReward.textContent = `Points Reward: +${rewardPoints} XP`;

    // Question Details
    el.qCategoryTag.textContent = `${q.category} Domain`;
    el.qText.textContent = q.question;
    el.qDiffBadge.textContent = `${q.difficulty} Difficulty`;

    // Step indicators (1 to N)
    renderStepIndicators(quiz.questions.length, index);

    // Hide Explanation Box & Hide Next Button
    el.explanationBox.classList.add('hidden');
    el.btnNextQuestion.classList.add('hidden');
    el.btnNextQuestion.querySelector('span').textContent =
      (index === quiz.questions.length - 1) ? 'Finish Arena Round 🏁' : 'Next Question';

    // Populate Option Cards
    el.optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    letters.forEach((letter) => {
      if (q.options[letter]) {
        const card = document.createElement('div');
        card.className = 'option-card-btn';
        card.setAttribute('data-letter', letter);
        card.innerHTML = `
          <div class="option-badge-circle">${letter}</div>
          <div class="option-text-wrap">${escapeHtml(q.options[letter])}</div>
          <span class="material-symbols-outlined option-check-icon">check_circle</span>
        `;
        card.addEventListener('click', () => handleOptionSelection(letter, q));
        el.optionsContainer.appendChild(card);
      }
    });

    // Start Real-Time Countdown & Multiplier
    quiz.questionStartTime = performance.now();
    startCountdownTimer();
  }

  function renderStepIndicators(total, current) {
    el.stepIndicatorsContainer.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const btn = document.createElement('div');
      const isDone = state.activeQuiz.answersMap[i] !== undefined;
      const isActive = i === current;

      btn.className = `step-dot-btn ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`;
      btn.textContent = isDone ? '✓' : (i + 1);
      el.stepIndicatorsContainer.appendChild(btn);
    }
  }

  function startCountdownTimer() {
    if (state.activeQuiz.timerInterval) {
      clearInterval(state.activeQuiz.timerInterval);
    }

    updateTimerDisplay(0);

    state.activeQuiz.timerInterval = setInterval(() => {
      if (state.activeQuiz.isAnswered) {
        clearInterval(state.activeQuiz.timerInterval);
        return;
      }
      const elapsed = (performance.now() - state.activeQuiz.questionStartTime) / 1000;
      updateTimerDisplay(elapsed);
    }, 100);
  }

  function updateTimerDisplay(elapsed) {
    // Formatted time: 30s countdown style
    const remainSec = Math.max(0, Math.ceil(30 - elapsed));
    const secStr = remainSec < 10 ? '0' + remainSec : remainSec;
    el.quizTimeDisplay.textContent = `00:${secStr}`;

    // Multiplier Badge
    const badge = el.liveMultiplierBadge;
    const text = el.liveMultiplierText;
    badge.className = 'live-bonus-badge';

    if (elapsed <= 5.0) {
      badge.classList.add('bonus-2x');
      text.textContent = `2.0x (${elapsed.toFixed(1)}s)`;
    } else if (elapsed <= 10.0) {
      badge.classList.add('bonus-1-5x');
      text.textContent = `1.5x (${elapsed.toFixed(1)}s)`;
    } else {
      badge.classList.add('bonus-1x');
      text.textContent = `1.0x (${elapsed.toFixed(1)}s)`;
    }
  }

  function handleOptionSelection(selectedLetter, question) {
    const quiz = state.activeQuiz;
    if (quiz.isAnswered) return;

    quiz.isAnswered = true;
    clearInterval(quiz.timerInterval);

    const elapsed = Math.max(0.1, (performance.now() - quiz.questionStartTime) / 1000);
    quiz.totalTime += elapsed;
    quiz.answersMap[quiz.currentIndex] = selectedLetter;

    const isCorrect = (selectedLetter === question.answer.toUpperCase());

    // Calculate score
    let basePoints = 10;
    if (question.difficulty === 'Medium') basePoints = 20;
    else if (question.difficulty === 'Hard') basePoints = 30;

    let multiplier = 1.0;
    let earnedBonus = 0;
    if (elapsed <= 5.0) {
      multiplier = 2.0;
      earnedBonus = 1;
    } else if (elapsed <= 10.0) {
      multiplier = 1.5;
      earnedBonus = 1;
    }

    const pointsEarned = isCorrect ? Math.floor(basePoints * multiplier) : 0;
    if (isCorrect) {
      quiz.score += pointsEarned;
      quiz.correctCount += 1;
      quiz.speedBonuses += earnedBonus;
    }

    // Highlight option cards
    const optionCards = el.optionsContainer.querySelectorAll('.option-card-btn');
    optionCards.forEach((card) => {
      const letter = card.getAttribute('data-letter');
      if (letter === question.answer.toUpperCase()) {
        card.classList.add('correct');
      } else if (letter === selectedLetter && !isCorrect) {
        card.classList.add('incorrect');
      }
    });

    // Reveal Explanation & Next Button
    el.explanationBox.classList.remove('hidden');
    if (isCorrect) {
      let bonusMsg = '';
      if (multiplier === 2.0) bonusMsg = ' (2.0x Speed Bonus!)';
      else if (multiplier === 1.5) bonusMsg = ' (1.5x Speed Bonus!)';
      el.explanationStatus.className = 'explanation-status-title correct-text';
      el.explanationStatus.innerHTML = `<span class="material-symbols-outlined text-[20px]">check_circle</span> <span>Correct! +${pointsEarned} XP ${bonusMsg}</span>`;
    } else {
      el.explanationStatus.className = 'explanation-status-title incorrect-text';
      el.explanationStatus.innerHTML = `<span class="material-symbols-outlined text-[20px]">cancel</span> <span>Incorrect. Correct was Option ${question.answer}.</span>`;
    }
    el.explanationText.textContent = question.explanation || 'No explanation provided.';

    el.btnNextQuestion.classList.remove('hidden');
  }

  async function finishQuiz() {
    const quiz = state.activeQuiz;
    if (!quiz) return;

    if (quiz.timerInterval) clearInterval(quiz.timerInterval);

    // Call Python backend to record stats
    const res = await api('/api/quiz/finish', {
      method: 'POST',
      body: JSON.stringify({
        username: state.currentUser ? state.currentUser.username : 'Guest',
        score: quiz.score,
        category: quiz.category,
        difficulty: quiz.difficulty,
        correct_count: quiz.correctCount,
        total_questions: quiz.questions.length,
        speed_bonuses: quiz.speedBonuses,
        time_taken: quiz.totalTime
      })
    });

    // Populate Results Screen
    el.resFinalScore.textContent = `${quiz.score} XP`;
    el.resCorrectRatio.textContent = `${quiz.correctCount}/${quiz.questions.length}`;
    el.resSpeedBonuses.textContent = quiz.speedBonuses;
    el.resTotalTime.textContent = `${quiz.totalTime.toFixed(1)}s`;

    if (res.is_new_high) {
      el.newHighScoreBanner.classList.remove('hidden');
    } else {
      el.newHighScoreBanner.classList.add('hidden');
    }

    if (res.user) {
      state.currentUser = res.user;
      sessionStorage.setItem('quiz_user', JSON.stringify(res.user));
      renderDashboard();
    }

    showScreen('results');
  }

  // --- LEADERBOARDS ---
  async function loadLeaderboard(category = 'Global') {
    el.contendersListContainer.innerHTML = '<div style="text-align:center; padding:20px; color:var(--text-muted);">Summoning contenders...</div>';
    el.podiumContainer.innerHTML = '';

    const res = await api(`/api/leaderboard?category=${encodeURIComponent(category)}`);

    if (!res.success || !res.leaderboard || res.leaderboard.length === 0) {
      el.contendersListContainer.innerHTML = '<div style="text-align:center; padding:20px; color:var(--text-muted);">No entries yet in this realm. Claim the first spot!</div>';
      return;
    }

    state.leaderboardData = res.leaderboard;
    renderLeaderboardView(res.leaderboard);
  }

  function renderLeaderboardView(players) {
    const medals = ['🥇', '🥈', '🥉'];
    el.podiumContainer.innerHTML = '';
    el.contendersListContainer.innerHTML = '';

    // Render Top 3 Podium
    const top3 = players.slice(0, 3);
    top3.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = `podium-card frosted-glass rank-${idx + 1}`;
      card.innerHTML = `
        <span class="podium-medal">${medals[idx]}</span>
        <img src="${p.avatar || state.userAvatarUrl}" alt="${p.name}" class="podium-avatar">
        <span class="podium-name">${escapeHtml(p.name || p.username)}</span>
        <span class="podium-pts">${p.high_score} XP</span>
      `;
      el.podiumContainer.appendChild(card);
    });

    // Render Full List
    players.forEach((p) => {
      const isCurrent = state.currentUser && state.currentUser.username.toLowerCase() === p.username.toLowerCase();
      const item = document.createElement('div');
      item.className = `contender-item frosted-glass ${isCurrent ? 'active-user-item' : ''}`;

      item.innerHTML = `
        <div class="contender-left">
          <span class="contender-rank-badge">#${p.rank}</span>
          <img src="${p.avatar || state.userAvatarUrl}" alt="${p.name}" class="contender-avatar">
          <div class="contender-meta">
            <span class="contender-name">
              ${escapeHtml(p.name || p.username)}
              ${isCurrent ? ' <span style="font-size:10px; color:var(--accent-sky); font-weight:800;">(You)</span>' : ''}
            </span>
            <span class="contender-sub">${p.quizzes_played} quizzes • Master Tier</span>
          </div>
        </div>
        <div class="contender-right">
          <span class="contender-points">${p.high_score} XP</span>
          <span class="contender-accuracy">${p.total_score} Total</span>
        </div>
      `;
      el.contendersListContainer.appendChild(item);
    });
  }

  // --- PROFILE MODAL ---
  function openProfileModal() {
    if (!state.currentUser) return;

    updateUserUI();
    el.profInputName.value = state.currentUser.name || '';
    el.profInputEmail.value = state.currentUser.email || '';
    el.profInputPassword.value = '';

    el.modalQuizzesTaken.textContent = state.currentUser.quizzes_played || 0;
    renderProfilePastQuizzes(state.currentUser.history || []);

    el.profileModal.classList.remove('hidden');
  }

  function closeProfileModal() {
    el.profileModal.classList.add('hidden');
  }

  function renderProfilePastQuizzes(history) {
    el.profilePastQuizzesContainer.innerHTML = '';
    if (!history || history.length === 0) {
      el.profilePastQuizzesContainer.innerHTML = '<div style="font-size:12px; color:var(--text-muted); padding:8px;">No past quizzes recorded yet.</div>';
      return;
    }

    history.slice(0, 5).forEach((h) => {
      const row = document.createElement('div');
      row.className = 'past-quiz-row frosted-glass';
      row.innerHTML = `
        <div>
          <div class="past-quiz-title">${escapeHtml(h.category)} (${h.difficulty})</div>
          <div class="past-quiz-time">${h.date} • ${h.time_taken}s</div>
        </div>
        <div class="past-quiz-score">+${h.score} XP</div>
      `;
      el.profilePastQuizzesContainer.appendChild(row);
    });
  }

  async function refreshUserProfile() {
    if (!state.currentUser || state.currentUser.username.toLowerCase() === 'guest') return;
    const res = await api(`/api/profile?username=${encodeURIComponent(state.currentUser.username)}`);
    if (res.success && res.profile) {
      state.currentUser = res.profile;
      sessionStorage.setItem('quiz_user', JSON.stringify(res.profile));
      updateUserUI();
      renderDashboard();
    }
  }

  // --- ADMIN PORTAL ---
  async function loadAdminQuestions() {
    el.adminQuestionsTbody.innerHTML = '<tr><td colspan="5" style="padding:16px; text-align:center;">Loading questions...</td></tr>';
    const res = await api('/api/admin/questions');
    if (res.success && res.questions) {
      state.adminQuestions = res.questions;
      renderAdminTable(res.questions);
    }
  }

  function renderAdminTable(questions) {
    el.adminQuestionsTbody.innerHTML = '';
    questions.forEach((q) => {
      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid rgba(0,0,0,0.06)';
      tr.innerHTML = `
        <td style="padding: 8px;">#${q.id}</td>
        <td style="padding: 8px;"><strong>${escapeHtml(q.category)}</strong></td>
        <td style="padding: 8px; max-width: 200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(q.question)}</td>
        <td style="padding: 8px;"><strong>${q.answer}</strong></td>
        <td style="padding: 8px;">
          <button class="btn-delete-q" data-id="${q.id}" style="color:#ef4444; background:none; border:none; cursor:pointer; font-weight:700;">Delete</button>
        </td>
      `;
      el.adminQuestionsTbody.appendChild(tr);
    });

    el.adminQuestionsTbody.querySelectorAll('.btn-delete-q').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        if (confirm(`Delete question #${id}?`)) {
          const res = await api('/api/admin/questions/delete', {
            method: 'POST',
            body: JSON.stringify({ id })
          });
          if (res.success) {
            showToast(res.message, 'success');
            loadAdminQuestions();
          }
        }
      });
    });
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    setupAuthEvents();

    // Theme Toggles
    if (el.btnThemeToggle) el.btnThemeToggle.addEventListener('click', toggleTheme);
    if (el.themeBtnLight) el.themeBtnLight.addEventListener('click', () => setTheme('light'));
    if (el.themeBtnDark) el.themeBtnDark.addEventListener('click', () => setTheme('dark'));

    // Top Brand Logo
    if (el.brandLogo) el.brandLogo.addEventListener('click', () => showScreen('dashboard'));

    // Floating Bottom Nav Tabs
    if (el.navTabHome) el.navTabHome.addEventListener('click', () => showScreen('dashboard'));
    if (el.navTabQuiz) el.navTabQuiz.addEventListener('click', () => showScreen('dashboard'));
    if (el.navTabRankings) el.navTabRankings.addEventListener('click', () => showScreen('leaderboard'));

    // Dashboard Actions
    if (el.dashStartShortcut) el.dashStartShortcut.addEventListener('click', () => startQuiz());
    if (el.btnStartQuiz) el.btnStartQuiz.addEventListener('click', () => startQuiz());
    if (el.btnViewLeaderboard) el.btnViewLeaderboard.addEventListener('click', () => showScreen('leaderboard'));
    if (el.btnDashAdmin) el.btnDashAdmin.addEventListener('click', () => showScreen('admin'));

    // Difficulty Pills
    if (el.difficultyPillsContainer) {
      el.difficultyPillsContainer.querySelectorAll('.choice-pill').forEach((btn) => {
        btn.addEventListener('click', () => {
          el.difficultyPillsContainer.querySelectorAll('.choice-pill').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          state.selectedDifficulty = btn.getAttribute('data-difficulty');
        });
      });
    }

    // Quiz Controls
    if (el.btnNextQuestion) {
      el.btnNextQuestion.addEventListener('click', () => {
        loadQuestion(state.activeQuiz.currentIndex + 1);
      });
    }

    // Quit Quiz
    if (el.btnQuitQuiz) {
      el.btnQuitQuiz.addEventListener('click', () => {
        el.confirmQuitModal.classList.remove('hidden');
      });
    }
    if (el.btnCancelQuit) {
      el.btnCancelQuit.addEventListener('click', () => {
        el.confirmQuitModal.classList.add('hidden');
      });
    }
    if (el.btnConfirmQuit) {
      el.btnConfirmQuit.addEventListener('click', () => {
        el.confirmQuitModal.classList.add('hidden');
        if (state.activeQuiz && state.activeQuiz.timerInterval) {
          clearInterval(state.activeQuiz.timerInterval);
        }
        state.activeQuiz = null;
        showToast('Arena round cancelled.', 'info');
        showScreen('dashboard');
      });
    }

    // Results Actions
    if (el.btnPlayAgain) el.btnPlayAgain.addEventListener('click', () => startQuiz());
    if (el.btnResultsToLeaderboard) el.btnResultsToLeaderboard.addEventListener('click', () => showScreen('leaderboard'));
    if (el.btnResultsToDashboard) el.btnResultsToDashboard.addEventListener('click', () => showScreen('dashboard'));

    // Leaderboard Search Filter
    if (el.leaderboardSearchInput) {
      el.leaderboardSearchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const filtered = state.leaderboardData.filter((p) =>
          (p.name && p.name.toLowerCase().includes(query)) ||
          (p.username && p.username.toLowerCase().includes(query))
        );
        renderLeaderboardView(filtered);
      });
    }

    // Profile Trigger & Modal
    if (el.profileTriggerBtn) el.profileTriggerBtn.addEventListener('click', openProfileModal);
    if (el.btnCloseProfile) el.btnCloseProfile.addEventListener('click', closeProfileModal);
    if (el.profileModal) {
      el.profileModal.addEventListener('click', (e) => {
        if (e.target === el.profileModal) closeProfileModal();
      });
    }

    // Profile Edit Form Submit
    if (el.profileEditForm) {
      el.profileEditForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!state.currentUser) return;

        const name = el.profInputName.value.trim();
        const email = el.profInputEmail.value.trim();
        const password = el.profInputPassword.value;

        if (state.currentUser.username.toLowerCase() === 'guest') {
          state.currentUser.name = name || 'Guest Wanderer';
          state.currentUser.email = email || 'wanderer@aether.io';
          sessionStorage.setItem('quiz_user', JSON.stringify(state.currentUser));
          updateUserUI();
          closeProfileModal();
          showToast('Guest profile updated!', 'success');
          return;
        }

        const res = await api('/api/profile/update', {
          method: 'POST',
          body: JSON.stringify({
            username: state.currentUser.username,
            name,
            email,
            password
          })
        });

        if (res.success && res.user) {
          state.currentUser = res.user;
          sessionStorage.setItem('quiz_user', JSON.stringify(res.user));
          updateUserUI();
          closeProfileModal();
          showToast('Sanctuary profile updated!', 'success');
        } else {
          showToast(res.message || 'Update failed.', 'error');
        }
      });
    }

    // Log Out
    if (el.btnLogout) {
      el.btnLogout.addEventListener('click', () => {
        sessionStorage.removeItem('quiz_user');
        state.currentUser = null;
        state.activeQuiz = null;
        closeProfileModal();
        showToast('You have departed the sanctuary.', 'info');
        showScreen('auth');
      });
    }

    // Admin Controls
    if (el.btnAdminBack) el.btnAdminBack.addEventListener('click', () => showScreen('dashboard'));
    if (el.btnAdminAddQuestion) {
      el.btnAdminAddQuestion.addEventListener('click', () => {
        el.adminAddForm.reset();
        el.adminAddModal.classList.remove('hidden');
      });
    }
    if (el.btnCloseAdminAdd) el.btnCloseAdminAdd.addEventListener('click', () => el.adminAddModal.classList.add('hidden'));
    if (el.btnCancelAddQ) el.btnCancelAddQ.addEventListener('click', () => el.adminAddModal.classList.add('hidden'));

    if (el.adminAddForm) {
      el.adminAddForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const category = document.getElementById('add-q-category').value.trim();
        const difficulty = document.getElementById('add-q-difficulty').value;
        const question = document.getElementById('add-q-text').value.trim();
        const options = {
          A: document.getElementById('add-opt-a').value.trim(),
          B: document.getElementById('add-opt-b').value.trim(),
          C: document.getElementById('add-opt-c').value.trim(),
          D: document.getElementById('add-opt-d').value.trim()
        };
        const answer = document.getElementById('add-q-answer').value;
        const explanation = document.getElementById('add-q-explanation').value.trim();

        const res = await api('/api/admin/questions/add', {
          method: 'POST',
          body: JSON.stringify({ category, difficulty, question, options, answer, explanation })
        });

        if (res.success) {
          showToast('New question added to arena!', 'success');
          el.adminAddModal.classList.add('hidden');
          loadAdminQuestions();
          fetchCategories();
        } else {
          showToast(res.message || 'Failed to add question.', 'error');
        }
      });
    }

    if (el.btnAdminResetStats) {
      el.btnAdminResetStats.addEventListener('click', async () => {
        if (confirm('⚠️ WARNING: This will reset all contenders statistics! Continue?')) {
          const res = await api('/api/admin/reset-stats', { method: 'POST' });
          if (res.success) {
            showToast(res.message, 'success');
            refreshUserProfile();
          }
        }
      });
    }

    if (el.adminSearchInput) {
      el.adminSearchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const filtered = state.adminQuestions.filter((q) =>
          q.question.toLowerCase().includes(query) ||
          q.category.toLowerCase().includes(query)
        );
        renderAdminTable(filtered);
      });
    }
  }

  // HTML escape helper
  function escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
