let currentQuestionIndex = 0;
let timeLeft = 60;
let timer;
let score = 0;
const getDomEl = (id) => document.getElementById(id); // Shortcut

// DOM element
const maincontainer = getDomEl("start-screen");
const startButton = getDomEl("start");
const quizContainer = getDomEl("questions");
const questionElement = getDomEl("question-title");
const choicesElement = getDomEl("choices");
const endContainer = getDomEl("end-screen");
const finalScoreElement = getDomEl("final-score");
const initialInput = getDomEl("initials");
const submitBtn = getDomEl("submit");
const feedbackElement = getDomEl("feedback");
const timerEl = getDomEl("time");
const correctSound = getDomEl("correctSound");
const incorrectSound = getDomEl("incorrectSound");

// Event listeners
startButton.addEventListener("click", startQuiz);
choicesElement.addEventListener("click", checkAnswer);
submitBtn.addEventListener("click", saveScore);

// Function starting quiz
function startQuiz() {
  maincontainer.classList.add("hide");
  quizContainer.classList.remove("hide");
  showQuestions();
  timer = setInterval(updadeTimer, 1000);
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
      displayFeedback(true, "Correct!");
      playSound(true); // Function for playing correct sound
      score += 10;
    } else {
      displayFeedback(true, "Incorrect!");
      playSound(false); // Function for playing incorrect sound
      timeLeft -= 10; // Time decreasement if answer is wrong
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      setTimeout(() => {
        showQuestions();
        displayFeedback(false);
      }, 1000);
    } else {
      endQuiz();
    }
  }
}

// Function for displaying feedback
function displayFeedback(display, message) {
  if (display) {
    feedbackElement.textContent = message;
    feedbackElement.classList.remove("hide");
  } else {
    feedbackElement.classList.add("hide");
  }
}

// Function ending quiz
function endQuiz() {
  clearInterval(timer);
  quizContainer.classList.add("hide");
  endContainer.classList.remove("hide");
  finalScoreElement.textContent = score;
}

// Function updading timer
function updadeTimer() {
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
    // Redirecting to high scores page
    window.location.href = "highscores.html";
  } else {
    alert("Please enter your initials.");
  }
}

// Functions for correct and incorrect sounds
function playSound(isCorrect) {
  if (isCorrect) {
    correctSound.play();
  } else {
    incorrectSound.play();
  }
}
