let flags = {
  easy: ["United States of America", "Japan", "Canada", "Brazil", "France",
  "Italy", "Spain", "South Korea", "Philippines"],
  medium: ["Morocco", "Algeria", "Brunei", "Egypt", "Sri Lanka",
  "Albania", "Afghanistan", "Bahrain", "Iran", "Qatar"],
  hard: ["Micronesia", "Djibouti", "Eritrea", "Ethiopia", "Sudan",
  "Somalia", "Timor-Leste", "Oman", "Yemen", "Kazakhstan"]
};

let score = 0;
let timer;
let timeLeft = 0;
let currentFlag = "";
let highScore = localStorage.getItem("flagHighScore") || 0;

document.getElementById("liveHighScore").textContent = highScore;

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}

function startGame() {
  const username = document.getElementById("username").value.trim();
  const difficulty = document.getElementById("difficulty").value;
  if (!username) return alert("Enter your name");

  document.cookie = "username=" + username;
  document.getElementById("playerName").textContent = username;
  document.getElementById("level").textContent = difficulty;
  showScreen("gamePage");

  score = 0;
  document.getElementById("score").textContent = score;

  loadFlag(difficulty);
}

function loadFlag(level) {
  const flagList = flags[level];
  currentFlag = flagList[Math.floor(Math.random() * flagList.length)];
  document.getElementById("flagImage").src = `flags/${currentFlag}.jpg`;

  if (timer) clearInterval(timer);
  timeLeft = level === "easy" ? 20 : level === "medium" ? 15 : 10;
  document.getElementById("timer").textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById("feedback").textContent = `⛔ Time's up! It was ${currentFlag}.`;
      setTimeout(() => loadFlag(level), 2000);
    }
  }, 1000);
}

function submitAnswer() {
  const userAnswer = document.getElementById("answerInput").value.trim().toLowerCase();
  const difficulty = document.getElementById("difficulty").value;
  const points = difficulty === "easy" ? 2 : difficulty === "medium" ? 5 : 10;

  if (userAnswer === currentFlag.toLowerCase()) {
    score += points;
    document.getElementById("feedback").textContent = "✅ Correct!";
  } else {
    document.getElementById("feedback").textContent = `❌ Wrong! It was ${currentFlag}`;
  }

  document.getElementById("score").textContent = score;
  document.getElementById("answerInput").value = "";

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("flagHighScore", highScore);
    document.getElementById("liveHighScore").textContent = highScore;
  }

  clearInterval(timer);
  setTimeout(() => loadFlag(difficulty), 2000);
}

function goHome() {
  location.reload();
}