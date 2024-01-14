let currentQuestionIndex = 0;
var timeLeft = 60;
let timer;
let score = 0;

// DOM element
const mainCointainer = document.getElementById("start-screen");
const startButton = document.getElementById("start");
const quizContainer = document.getElementById("questions");
const questionElement = document.getElementById("question-title");
const choicesElement = document.getElementById("choices");
const endContainer = document.getElementById("end-screen");
const finalScoreElement = document.getElementById("final-score");
const initialInput = document.getElementById("initials");
const submitBtn = document.getElementById("submit");
const feedbackElement = document.getElementById("feedback");
const timerEl = document.getElementById("time");

// Event listeners
startButton.addEventListener("click", startQuiz);
choicesElement.addEventListener("click", checkAnswer);
submitBtn.addEventListener("click", saveScore);

// Function starting quiz
function startQuiz() {
  mainCointainer.classList.add("hide");
  quizContainer.classList.remove("hide");
  showQuestions();
  timer = setInterval(uptadeTimer, 1000);
}
// Function showing questions
function showQuestions() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.title;

  const h2 = document.createElement("h2");
  h2.textContent = questions.title;
  questionElement.appendChild(h2);

  choicesElement.innerHTML = "";

  currentQuestion.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.textContent = choice;
    choicesElement.appendChild(button);
  });
}

// Function checking answers
function checkAnswer(event) {
  if (event.target.tagName === "BUTTON") {
    const selectedAnswer = event.target.textContent;
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.answer) {
      displayFeedback("Correct!");
      playCorrectSound(); // Function for playing correct sound
      score += 10;
    } else {
      displayFeedback("Incorrect!");
      playIncorrectSound(); // Function for playing incorrect sound
      timeLeft -= 10; // Time decrecement if answer is wrong
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      setTimeout(() => {
        showQuestions();
        hideFeedback();
      }, 1000);
    } else {
      endQuiz();
    }
  }
}

// Function for displaying feedback
function displayFeedback(message) {
  const feedbackElement = document.getElementById("feedback");
  feedbackElement.textContent = message;
  feedbackElement.classList.remove("hide");
}

// Function for hiding feedback
function hideFeedback() {
  const feedbackElement = document.getElementById("feedback");
  feedbackElement.classList.add("hide");
}

// Function ending quiz
function endQuiz() {
  clearInterval(timer);
  quizContainer.classList.add("hide");
  endContainer.classList.remove("hide");
  finalScoreElement.textContent = score;
}

// Function uptading timer
function uptadeTimer() {
  timeLeft--;
  if (timeLeft <= 0) {
    endQuiz();
  }
  timerEl.textContent = timeLeft;
}

// Function for saving score
function saveScore() {
  const initials = initialInput.value.toUpperCase();
  if (initials.trim() !== "") {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    const newScore = {
      initials: initials,
      score: score,
    };

    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    // Redirectin to high scores page
    window.location.href = "highscores.html";
  } else {
    alert("Please enter your initials.");
  }
}

// Functions for correct and incorrect sounds
function playCorrectSound() {
  const correctSound = document.getElementById("correctSound");
  correctSound.play();
}
function playIncorrectSound() {
  const correctSound = document.getElementById("incorrectSound");
  correctSound.play();
}
