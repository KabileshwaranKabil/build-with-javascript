// ── Questions data ─────────────────────────────
const questions = [
  {
    question: "What is the capital of France?",
    answers:  ["Berlin", "Madrid", "Paris", "Rome"],
    correct:  2
  },
  {
    question: "Which planet is closest to the Sun?",
    answers:  ["Venus", "Earth", "Mars", "Mercury"],
    correct:  3
  },
  {
    question: "What is 12 × 12?",
    answers:  ["124", "144", "132", "156"],
    correct:  1
  },
  {
    question: "Which language runs in the browser?",
    answers:  ["Python", "Java", "JavaScript", "C++"],
    correct:  2
  },
  {
    question: "How many sides does a hexagon have?",
    answers:  ["5", "7", "8", "6"],
    correct:  3
  }
];

// ── State variables ────────────────────────────
let currentQuestion = 0;
let score           = 0;
let timeLeft        = 15;
let timerInterval   = null;

// ── DOM references ─────────────────────────────
const questionNumberEl = document.getElementById('question-number');
const questionTextEl   = document.getElementById('question-text');
const answerButtons    = document.querySelectorAll('.answer-btn');
const scoreEl          = document.getElementById('score');
const timerFill        = document.getElementById('timer-fill');
const resultsEl        = document.getElementById('results');
const finalScoreEl     = document.getElementById('final-score');
const questionCardEl   = document.getElementById('question-card');
const answerAreaEl     = document.getElementById('answer-buttons');
const restartBtn       = document.getElementById('restart-btn');

// ── Show a question ────────────────────────────
function showQuestion() {
  const q = questions[currentQuestion];

  questionNumberEl.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;
  questionTextEl.textContent = q.question;

  answerButtons.forEach((btn, i) => {
    btn.textContent = q.answers[i];
    btn.className   = 'answer-btn';
    btn.disabled    = false;
  });
  
  startTimer();
}

// ── Timer ──────────────────────────────────────
function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 15;
  timerFill.style.width = '100%';

  timerInterval = setInterval(() => {
    timeLeft--;
    timerFill.style.width = (timeLeft / 15 * 100) + '%';

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      disableButtons();
      revealCorrect();
      setTimeout(nextQuestion, 1500);
    }
  }, 1000);
}
// ── Check the player's answer ──────────────────
function checkAnswer(selectedIndex) {
  clearInterval(timerInterval);
  disableButtons();

  const correct = questions[currentQuestion].correct;

  if (selectedIndex === correct) {
    answerButtons[selectedIndex].classList.add('correct');
    score++;
    scoreEl.textContent = `Score: ${score}`;
  } else {
    answerButtons[selectedIndex].classList.add('wrong');
    revealCorrect();
  }

  setTimeout(nextQuestion, 1500);
}
// ── Helpers ────────────────────────────────────
function disableButtons() {
  answerButtons.forEach(btn => btn.disabled = true);
}

function revealCorrect() {
  const correct = questions[currentQuestion].correct;
  answerButtons[correct].classList.add('correct');
}

// ── Move to next question or end ───────────────
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}
// ── Show results screen ────────────────────────
function showResults() {
  questionCardEl.classList.add('hidden');
  answerAreaEl.classList.add('hidden');
  timerFill.style.width = '0%';

  resultsEl.classList.remove('hidden');
  finalScoreEl.textContent =
    `You scored ${score} out of ${questions.length}!`;
}

// ── Restart the game ───────────────────────────
function restartGame() {
  currentQuestion = 0;
  score           = 0;
  scoreEl.textContent = 'Score: 0';

  resultsEl.classList.add('hidden');
  questionCardEl.classList.remove('hidden');
  answerAreaEl.classList.remove('hidden');

  showQuestion();
}
// ── Wire up events ─────────────────────────────
answerButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => checkAnswer(index));
});

restartBtn.addEventListener('click', restartGame);

// ── Start the game ─────────────────────────────
showQuestion();