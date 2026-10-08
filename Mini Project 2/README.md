# Python Mini Project - Quiz Web App with Leaderboard

An interactive full-stack Quiz Application featuring a web dashboard, real-time timer, category & difficulty selection, dynamic scoring, and a competitive leaderboard. Built using Python's standard library for the backend and modern vanilla HTML, CSS, and JavaScript for the frontend.

---

## Features

- **Web & CLI Dual Support**: Run seamlessly as an HTTP web application with a responsive dashboard or via terminal CLI.
- **Pure Native Stack**: Zero heavy external dependencies (no Node.js, React, Flask, or Django needed). Pure Python (`http.server`) + HTML5 / CSS3 / Vanilla JS.
- **User Authentication & Profiles**:
  - Sign up & Sign in with persistent account profiles.
  - Guest mode for quick play.
  - Customizable profile themes (Slate, Emerald, Violet, Amber, Ocean).
  - Profile statistics, quizzes played, accuracy tracking, and history.
- **Rich Question Bank**:
  - 60 curated questions across 4 categories: **Programming**, **Science**, **History**, and **General Knowledge**.
  - 3 difficulty levels: **Easy**, **Medium**, and **Hard**.
  - Intelligent backfill algorithm ensuring 5 balanced questions per session.
- **Live Leaderboard**:
  - Global rankings and category-specific filters.
  - High score and total score tracking.
- **Admin Management**:
  - Built-in admin dashboard to view, add, and manage questions dynamically.

---

## Project Structure

```
├── main.py              # Main application launcher (CLI & Web server starter)
├── server.py            # Custom HTTP REST server and static file router
├── auth.py              # Authentication and user account logic
├── quiz_manager.py      # Core quiz session and question evaluation logic
├── storage.py           # Persistent storage layer for users and quizzes
├── leaderboard.py       # Scoring metrics and ranking algorithms
├── admin.py             # Administrative controls and content management
├── index.html           # Single-page web interface
├── style.css            # Responsive modern stylesheet with themes
├── app.js               # Frontend controller, state management, and API client
├── quizzes.json         # Quiz questions dataset (60 questions)
├── users.json           # User profiles, statistics, and leaderboard data
├── test_quiz.py         # Unit tests suite
└── README.md            # Project documentation
```

---

## Getting Started

### Prerequisites

- Python 3.8 or higher installed on your system.

### Running the Application

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Jishnu-Thakker-27/python-mini-project.git
   cd python-mini-project
   ```

2. **Launch the Web Application**:
   ```bash
   python main.py
   ```
   Or directly run the server:
   ```bash
   python server.py
   ```

3. **Open in Browser**:
   Navigate to:
   ```
   http://localhost:8000
   ```
   *(If port 8000 is occupied, the server automatically selects an available port such as 8080 or 8081)*.

---

## Default Accounts

- **Admin Account**:
  - **Username**: `admin`
  - **Password**: `adminpassword`
- **New Users**:
  - Click **Sign Up** on the login screen to create a new profile.

---

## Running Unit Tests

Run the test suite using Python's built-in `unittest` runner:
```bash
python -m unittest test_quiz.py
```
