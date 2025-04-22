let currentCountry = "";
let currentDifficulty = "";
let score = 0;
let timeLeft = 0;
let timer;

const countries = {
  easy: ["Canada", "Mexico", "Brazil", "Argentina", "France", "Germany", "Italy", "Spain", "India", "Japan"],
  medium: ["Algeria", "Morocco", "Ethiopia", "Ivory Coast", "Senegal", "Bangladesh", "Sri Lanka", "Malaysia", "Uzbekistan", "Lebanon"],
  hard: ["Tuvalu", "Nauru", "San Marino", "Liechtenstein", "Comoros", "Kiribati", "Palau", "Seychelles", "Andorra", "Barbados"]
};

const timeLimits = { easy: 20, medium: 15, hard: 10 };
const points = { easy: 2, medium: 5, hard: 10 };


function showScreen(id) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}


function showRules() {
  showScreen('rulesScreen');
}


function showUsername() {
  showScreen('usernameScreen');
}


function handleUsernameSubmit(event) {
  event.preventDefault(); 

  const username = document.getElementById("username").value.trim();

 
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    alert("Username must only contain letters and numbers.");
    return;
  }

  setCookie("username", username, 7); // store for 7 days
  showScreen('difficultyScreen');
}


function chooseDifficulty() {
  showScreen('difficultyScreen');
}


function startGame(difficulty) {
  currentDifficulty = difficulty;
  score = 0;
  showScreen('gameScreen');

  const username = getCookie("username");
  if (username) {
    document.getElementById("greetUser").textContent = `Welcome, ${username}!`;
  }

  loadQuestion();
}


function loadQuestion() {
  const countryList = countries[currentDifficulty];
  currentCountry = countryList[Math.floor(Math.random() * countryList.length)];
  timeLeft = timeLimits[currentDifficulty];

  document.getElementById("answerInput").value = "";
  document.getElementById("timer").textContent = `Time: ${timeLeft}`;
  document.getElementById("result").textContent = "";
  document.getElementById("score").textContent = score;

  startTimer();
}

// Timer function
function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      checkAnswer(true);
    }
  }, 1000);
}


function submitAnswer() {
  checkAnswer(false);
}


function checkAnswer(timeUp) {
  clearInterval(timer);
  const userAnswer = document.getElementById("answerInput").value.trim();
  if (!timeUp && userAnswer.toLowerCase() === currentCountry.toLowerCase()) {
    score += points[currentDifficulty];
    document.getElementById("result").textContent = "Correct!";
  } else {
    document.getElementById("result").textContent = `Wrong! The correct answer was: ${currentCountry}`;
  }
  document.getElementById("score").textContent = score;
  setTimeout(loadQuestion, 2000);
}


function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days*24*60*60*1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return "";
}


window.onload = () => {
  const savedUsername = getCookie("username");
  if (savedUsername) {
    showScreen("difficultyScreen");
  }
}