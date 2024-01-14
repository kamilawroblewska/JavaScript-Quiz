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
// Function checking answers
// Function for displaying feedback
// Function for hiding feedback
// Function ending quiz
function endQuiz() {
    clearInterval(timer);
    quizContainer.classList.add("hide");
    endContainer.classList.remove("hide");
    finalScoreElement.textContent = score;
  }
  
// Function uptading timer
// Function for saving score
// Functions for correct and incorrect sounds
