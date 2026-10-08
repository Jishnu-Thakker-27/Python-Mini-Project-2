import http.server
import json
import os
import sys
import time
import random
import urllib.parse
import webbrowser
from datetime import datetime

# Import existing application logic
from storage import load_users, save_users, load_quizzes, save_quizzes
from quiz_manager import calculate_score

PORT = 8000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def ensure_user_profile_fields(user):
    """Ensure backwards compatibility with user dictionaries for web features."""
    if "name" not in user or not user["name"]:
        user["name"] = user["username"].capitalize()
    if "email" not in user:
        user["email"] = f"{user['username'].lower()}@quizapp.local"
    if "avatar" not in user:
        user["avatar"] = "avatar-1"
    if "theme" not in user:
        user["theme"] = "slate"
    if "history" not in user:
        user["history"] = []
    if "category_stats" not in user:
        user["category_stats"] = {}
    return user

class QuizHTTPRequestHandler(http.server.BaseHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and disable aggressive caching for development
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def send_json(self, status_code, data):
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.end_headers()
        self.wfile.write(json.dumps(data, indent=2).encode("utf-8"))

    def read_post_json(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            if content_length == 0:
                return {}
            post_data = self.rfile.read(content_length).decode("utf-8")
            return json.loads(post_data)
        except Exception:
            return {}

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        query_params = urllib.parse.parse_qs(parsed_url.query)

        # API Routes
        if path == "/api/categories":
            quizzes = load_quizzes()
            categories = sorted(list(set(q["category"] for q in quizzes)))
            self.send_json(200, {"success": True, "categories": categories})
            return

        elif path == "/api/quiz/questions":
            quizzes = load_quizzes()
            cat = query_params.get("category", ["Mixed"])[0]
            diff = query_params.get("difficulty", ["Any"])[0]

            filtered = []
            for q in quizzes:
                cat_match = (cat == "Mixed" or q.get("category", "").lower() == cat.lower())
                diff_match = (diff == "Any" or q.get("difficulty", "").lower() == diff.lower())
                if cat_match and diff_match:
                    filtered.append(q)

            random.shuffle(filtered)
            selected = list(filtered[:5])

            # Intelligent backfill if less than 5 questions match the exact filter
            if len(selected) < 5 and quizzes:
                selected_ids = {q.get("id") for q in selected}
                # 1. Backfill from same category first
                same_cat = [q for q in quizzes if (cat == "Mixed" or q.get("category", "").lower() == cat.lower()) and q.get("id") not in selected_ids]
                random.shuffle(same_cat)
                while len(selected) < 5 and same_cat:
                    item = same_cat.pop()
                    selected.append(item)
                    selected_ids.add(item.get("id"))

                # 2. Backfill from any other questions if still under 5
                if len(selected) < 5:
                    other_q = [q for q in quizzes if q.get("id") not in selected_ids]
                    random.shuffle(other_q)
                    while len(selected) < 5 and other_q:
                        item = other_q.pop()
                        selected.append(item)
                        selected_ids.add(item.get("id"))

            self.send_json(200, {
                "success": True,
                "category": cat,
                "difficulty": diff,
                "total": len(selected),
                "questions": selected
            })
            return


        elif path == "/api/leaderboard":
            users = load_users()
            cat = query_params.get("category", ["Global"])[0]

            # Filter out admins
            players = [ensure_user_profile_fields(u) for u in users if not u.get("is_admin", False)]

            leaderboard = []
            if cat == "Global":
                active_players = [p for p in players if p.get("quizzes_played", 0) > 0]
                active_players.sort(key=lambda u: (-u.get("high_score", 0), -u.get("total_score", 0), u.get("quizzes_played", 0)))
                for rank, p in enumerate(active_players, 1):
                    leaderboard.append({
                        "rank": rank,
                        "username": p["username"],
                        "name": p.get("name", p["username"]),
                        "avatar": p.get("avatar", "avatar-1"),
                        "high_score": p.get("high_score", 0),
                        "total_score": p.get("total_score", 0),
                        "quizzes_played": p.get("quizzes_played", 0)
                    })
            else:
                cat_players = []
                for p in players:
                    stats = p.get("category_stats", {}).get(cat, {})
                    if stats.get("played", 0) > 0:
                        cat_players.append({
                            "username": p["username"],
                            "name": p.get("name", p["username"]),
                            "avatar": p.get("avatar", "avatar-1"),
                            "high_score": stats.get("high_score", 0),
                            "total_score": stats.get("total_score", 0),
                            "quizzes_played": stats.get("played", 0)
                        })
                cat_players.sort(key=lambda u: (-u["high_score"], -u["total_score"], u["quizzes_played"]))
                for rank, p in enumerate(cat_players, 1):
                    p["rank"] = rank
                    leaderboard.append(p)

            self.send_json(200, {"success": True, "category": cat, "leaderboard": leaderboard})
            return

        elif path == "/api/profile":
            username = query_params.get("username", [""])[0]
            users = load_users()
            matched = None
            for u in users:
                if u["username"].lower() == username.lower():
                    matched = ensure_user_profile_fields(u)
                    break

            if matched:
                safe_profile = {
                    "username": matched["username"],
                    "name": matched.get("name", matched["username"]),
                    "email": matched.get("email", ""),
                    "avatar": matched.get("avatar", "avatar-1"),
                    "theme": matched.get("theme", "slate"),
                    "is_admin": matched.get("is_admin", False),
                    "quizzes_played": matched.get("quizzes_played", 0),
                    "total_score": matched.get("total_score", 0),
                    "high_score": matched.get("high_score", 0),
                    "category_stats": matched.get("category_stats", {}),
                    "history": matched.get("history", [])
                }
                self.send_json(200, {"success": True, "profile": safe_profile})
            else:
                self.send_json(404, {"success": False, "message": "User not found."})
            return

        elif path == "/api/admin/questions":
            quizzes = load_quizzes()
            self.send_json(200, {"success": True, "questions": quizzes})
            return

        # Static File Serving
        self.serve_static_file(path)

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        body = self.read_post_json()

        if path == "/api/auth/login":
            username = body.get("username", "").strip()
            password = body.get("password", "")

            if not username or not password:
                self.send_json(400, {"success": False, "message": "Username and password required."})
                return

            users = load_users()
            matched = None
            for u in users:
                if u["username"].lower() == username.lower():
                    matched = u
                    break

            if not matched:
                self.send_json(401, {"success": False, "message": "Username not found."})
                return

            if matched.get("password") != password:
                self.send_json(401, {"success": False, "message": "Incorrect password."})
                return

            matched = ensure_user_profile_fields(matched)
            save_users(users)

            safe_user = {
                "username": matched["username"],
                "name": matched["name"],
                "email": matched["email"],
                "avatar": matched["avatar"],
                "theme": matched["theme"],
                "is_admin": matched.get("is_admin", False),
                "quizzes_played": matched.get("quizzes_played", 0),
                "total_score": matched.get("total_score", 0),
                "high_score": matched.get("high_score", 0),
                "category_stats": matched.get("category_stats", {}),
                "history": matched.get("history", [])
            }
            self.send_json(200, {"success": True, "message": "Login successful!", "user": safe_user})
            return

        elif path == "/api/auth/register":
            username = body.get("username", "").strip()
            password = body.get("password", "")
            name = body.get("name", "").strip() or username
            email = body.get("email", "").strip() or f"{username.lower()}@quizapp.local"

            if not username or not password:
                self.send_json(400, {"success": False, "message": "Username and password cannot be empty."})
                return

            if " " in username:
                self.send_json(400, {"success": False, "message": "Username cannot contain spaces."})
                return

            users = load_users()
            if any(u["username"].lower() == username.lower() for u in users):
                self.send_json(400, {"success": False, "message": "Username is already taken."})
                return

            new_user = {
                "username": username,
                "password": password,
                "name": name,
                "email": email,
                "avatar": body.get("avatar", "avatar-1"),
                "theme": "slate",
                "is_admin": False,
                "quizzes_played": 0,
                "total_score": 0,
                "high_score": 0,
                "category_stats": {},
                "history": []
            }
            users.append(new_user)
            save_users(users)

            safe_user = {k: v for k, v in new_user.items() if k != "password"}
            self.send_json(200, {"success": True, "message": "Registration successful!", "user": safe_user})
            return

        elif path == "/api/profile/update":
            username = body.get("username", "").strip()
            users = load_users()
            target = None
            for u in users:
                if u["username"].lower() == username.lower():
                    target = u
                    break

            if not target:
                self.send_json(404, {"success": False, "message": "User not found."})
                return

            target = ensure_user_profile_fields(target)

            if "name" in body and body["name"].strip():
                target["name"] = body["name"].strip()
            if "email" in body:
                target["email"] = body["email"].strip()
            if "avatar" in body and body["avatar"]:
                target["avatar"] = body["avatar"]
            if "theme" in body and body["theme"]:
                target["theme"] = body["theme"]
            if "password" in body and body["password"].strip():
                target["password"] = body["password"].strip()

            save_users(users)
            safe_user = {k: v for k, v in target.items() if k != "password"}
            self.send_json(200, {"success": True, "message": "Profile updated successfully!", "user": safe_user})
            return

        elif path == "/api/quiz/finish":
            username = body.get("username", "")
            quiz_score = int(body.get("score", 0))
            category = body.get("category", "Mixed")
            difficulty = body.get("difficulty", "Any")
            correct_count = int(body.get("correct_count", 0))
            total_questions = int(body.get("total_questions", 0))
            speed_bonuses = int(body.get("speed_bonuses", 0))
            time_taken = float(body.get("time_taken", 0.0))

            if not username or username.lower() == "guest":
                self.send_json(200, {
                    "success": True,
                    "message": "Guest quiz completed. No stats saved.",
                    "guest": True
                })
                return

            users = load_users()
            target = None
            for u in users:
                if u["username"].lower() == username.lower():
                    target = u
                    break

            if not target:
                self.send_json(404, {"success": False, "message": "Active user not found."})
                return

            target = ensure_user_profile_fields(target)

            # Update high score and totals
            target["quizzes_played"] = target.get("quizzes_played", 0) + 1
            target["total_score"] = target.get("total_score", 0) + quiz_score
            is_new_high = False
            if quiz_score > target.get("high_score", 0):
                target["high_score"] = quiz_score
                is_new_high = True

            # Category stats
            cat_stats = target["category_stats"].get(category, {
                "played": 0,
                "high_score": 0,
                "total_score": 0
            })
            cat_stats["played"] += 1
            cat_stats["total_score"] += quiz_score
            if quiz_score > cat_stats.get("high_score", 0):
                cat_stats["high_score"] = quiz_score
            target["category_stats"][category] = cat_stats

            # Quiz history
            history_record = {
                "id": int(time.time() * 1000),
                "date": datetime.now().strftime("%Y-%m-%d %H:%M"),
                "category": category,
                "difficulty": difficulty,
                "score": quiz_score,
                "correct_count": correct_count,
                "total_questions": total_questions,
                "speed_bonuses": speed_bonuses,
                "time_taken": round(time_taken, 1)
            }
            if "history" not in target:
                target["history"] = []
            target["history"].insert(0, history_record)
            # Keep last 50 entries
            target["history"] = target["history"][:50]

            save_users(users)
            safe_user = {k: v for k, v in target.items() if k != "password"}
            self.send_json(200, {
                "success": True,
                "message": "Quiz stats saved successfully!",
                "is_new_high": is_new_high,
                "user": safe_user
            })
            return

        elif path == "/api/admin/questions/add":
            quizzes = load_quizzes()
            category = body.get("category", "").strip()
            difficulty = body.get("difficulty", "Medium").strip().capitalize()
            question_text = body.get("question", "").strip()
            options = body.get("options", {})
            answer = body.get("answer", "").strip().upper()
            explanation = body.get("explanation", "").strip()

            if not category or not question_text or not answer:
                self.send_json(400, {"success": False, "message": "Missing required question fields."})
                return

            if answer not in ["A", "B", "C", "D"]:
                self.send_json(400, {"success": False, "message": "Answer must be A, B, C, or D."})
                return

            next_id = max([q["id"] for q in quizzes], default=0) + 1
            new_question = {
                "id": next_id,
                "category": category,
                "difficulty": difficulty,
                "question": question_text,
                "options": {
                    "A": options.get("A", "").strip(),
                    "B": options.get("B", "").strip(),
                    "C": options.get("C", "").strip(),
                    "D": options.get("D", "").strip()
                },
                "answer": answer,
                "explanation": explanation
            }
            quizzes.append(new_question)
            save_quizzes(quizzes)
            self.send_json(200, {"success": True, "message": "Question added successfully!", "question": new_question})
            return

        elif path == "/api/admin/questions/delete":
            q_id = int(body.get("id", -1))
            quizzes = load_quizzes()
            new_quizzes = [q for q in quizzes if q["id"] != q_id]
            if len(new_quizzes) == len(quizzes):
                self.send_json(404, {"success": False, "message": "Question ID not found."})
                return
            save_quizzes(new_quizzes)
            self.send_json(200, {"success": True, "message": f"Question {q_id} deleted successfully!"})
            return

        elif path == "/api/admin/reset-stats":
            users = load_users()
            for u in users:
                if not u.get("is_admin", False):
                    u["quizzes_played"] = 0
                    u["total_score"] = 0
                    u["high_score"] = 0
                    u["category_stats"] = {}
                    u["history"] = []
            save_users(users)
            self.send_json(200, {"success": True, "message": "All user stats and leaderboards have been reset!"})
            return

        self.send_json(404, {"success": False, "message": "Endpoint not found."})

    def serve_static_file(self, req_path):
        if req_path == "/" or req_path == "":
            req_path = "/index.html"

        # Sanitize path
        rel_path = req_path.lstrip("/").replace("/", os.sep)
        full_path = os.path.join(BASE_DIR, rel_path)

        if not os.path.exists(full_path) or os.path.isdir(full_path):
            self.send_response(404)
            self.send_header("Content-Type", "text/plain")
            self.end_headers()
            self.wfile.write(b"404 Not Found")
            return

        # Determine MIME type
        content_type = "text/plain"
        if full_path.endswith(".html"):
            content_type = "text/html; charset=utf-8"
        elif full_path.endswith(".css"):
            content_type = "text/css; charset=utf-8"
        elif full_path.endswith(".js"):
            content_type = "application/javascript; charset=utf-8"
        elif full_path.endswith(".json"):
            content_type = "application/json; charset=utf-8"
        elif full_path.endswith(".svg"):
            content_type = "image/svg+xml"
        elif full_path.endswith(".png"):
            content_type = "image/png"
        elif full_path.endswith(".ico"):
            content_type = "image/x-icon"

        try:
            with open(full_path, "rb") as f:
                content = f.read()
            self.send_response(200)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(len(content)))
            self.end_headers()
            self.wfile.write(content)
        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "text/plain")
            self.end_headers()
            self.wfile.write(f"500 Internal Error: {e}".encode("utf-8"))

import socket

def find_available_server(host="127.0.0.1", default_port=PORT):
    candidate_ports = [default_port, 8080, 8081, 8085, 8090, 5000, 5500, 3000]
    for p in candidate_ports:
        try:
            httpd = http.server.ThreadingHTTPServer((host, p), QuizHTTPRequestHandler)
            return httpd, p
        except (PermissionError, OSError):
            continue

    # If all candidates fail, ask OS for an ephemeral free port
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind((host, 0))
    free_port = sock.getsockname()[1]
    sock.close()
    httpd = http.server.ThreadingHTTPServer((host, free_port), QuizHTTPRequestHandler)
    return httpd, free_port

def start_server(port=PORT, open_browser=True):
    host = "127.0.0.1"
    httpd, active_port = find_available_server(host, default_port=port)
    url = f"http://localhost:{active_port}"

    print("=" * 60)
    print(f"  QUIZ APP WEB SERVER STARTED")
    print(f"  Access the web interface at: {url}")
    if active_port != port:
        print(f"  (Port {port} was already in use; switched to port {active_port})")
    print("=" * 60)
    print("Press Ctrl+C to stop the server.\n")

    if open_browser:
        try:
            webbrowser.open(url)
        except Exception:
            pass

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped gracefully.")
        httpd.server_close()

if __name__ == "__main__":
    start_server()
