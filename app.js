const startBtn = document.querySelector(".start-btn");
const popupInfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const tryAgainBtn = document.querySelector(".tryAgain-btn");
const goHomeBtn = document.querySelector(".goHome-btn");

startBtn.addEventListener("click", () => {
  popupInfo.classList.add("active");
  main.classList.add("active");
});
exitBtn.addEventListener("click", () => {
  popupInfo.classList.remove("active");
  main.classList.remove("active");
});

continueBtn.addEventListener("click", () => {
  quizSection.classList.add("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  quizBox.classList.add("active");
  ShowQuestion(0);
  questionCounter(1);
  headerScore();
});
tryAgainBtn.addEventListener("click", () => {
  quizBox.classList.add("active");
  nextBtn.classList.remove("active");
  resultBox.classList.remove("active");
  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
  ShowQuestion(questionCount);
  questionCounter(questionNumb);
  headerScore();
});
goHomeBtn.addEventListener("click", () => {
  quizSection.classList.remove("active");
  nextBtn.classList.remove("active");
  resultBox.classList.remove("active");
  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
  ShowQuestion(questionCount);
  questionCounter(questionNumb);
});
let questionCount = 0;
let questionNumb = 1;
let userScore = 0;
const nextBtn = document.querySelector(".next-btn");
nextBtn.addEventListener("click", () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    ShowQuestion(questionCount);
    questionNumb++;
    questionCounter(questionNumb);
    nextBtn.classList.remove("active");
  } else {
    showResultBox();
  }
});
const optionList = document.querySelector(".option-list");

function ShowQuestion(index) {
  const questionText = document.querySelector(".question-text");
  questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

  let optionTag = `<div class="option"><span> ${questions[index].options[0]}</span></div>
  <div class="option"><span> ${questions[index].options[1]}</span></div>
  <div class="option"><span> ${questions[index].options[2]}</span></div>
  <div class="option"><span> ${questions[index].options[3]}</span></div>`;
  optionList.innerHTML = optionTag;
  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
function optionSelected(answer) {
  let userAnswer = answer.textContent.trim();
  let correctAnswer = questions[questionCount].answer.trim();
  let allOptions = optionList.children.length;

  if (userAnswer == correctAnswer) {
    answer.classList.add("correct");
    userScore += 1;
    headerScore();
  } else {
    answer.classList.add("incorrect");
    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent.trim() == correctAnswer) {
        optionList.children[i].classList.add("correct");
      }
    }
  }

  // Disable all options after a selection
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }
  nextBtn.classList.add("active");
}

function questionCounter(index) {
  const questionTotal = document.querySelector(".question-total");
  questionTotal.textContent = `${index} of ${questions.length} Questions`;
}
function headerScore() {
  const headerScoreText = document.querySelector(".header-score");
  headerScoreText.textContent = `Score: ${userScore}/${questions.length}`;
}
function showResultBox() {
  quizBox.classList.remove("active");
  resultBox.classList.add("active");
  const scoreText = document.querySelector(".score-text");
  scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;
  const circularProgress = document.querySelector(".circular-progress");
  const progressValue = document.querySelector(".progress-value");
  let progressStartValue = -1;
  let progressEndValue = (userScore / questions.length) * 100;
  let speed = 20;
  let progress = setInterval(() => {
    progressStartValue++;
    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient(#c40094 ${
      progressStartValue * 3.6
    }deg, rgba(255, 255, 255, 0.1) ${progressStartValue * 3.6}deg)`;

    if (progressStartValue == progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
}
