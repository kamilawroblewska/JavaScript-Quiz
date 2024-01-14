// Event listener for displaying high scores
document.addEventListener("DOMContentLoaded", function () {
  displayHighScores();

  document.getElementById("clear").addEventListener("click", clearHighScores);
});

// Function displaying list of scores
function displayHighScores() {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const highScoresList = document.getElementById("highscores");

  highScoresList.innerHTML = "";

  highScores.forEach((score, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
    highScoresList.appendChild(listItem);
  });
}

function clearHighScores() {
  localStorage.removeItem("highScores");
  displayHighScores();
}