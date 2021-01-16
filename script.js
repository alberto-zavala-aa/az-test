// Getting all required elements
const startBtn = document.querySelector('.start-btn button');
const infoBox = document.querySelector('.info-box');
const exitBtn = document.querySelector('.buttons .quit');
const continueBtn = document.querySelector('.buttons .restart');
const quizBox = document.querySelector('.quiz-box');

// If Start Quiz Button Clicked
startBtn.onclick = () => {
  infoBox.classList.add('activeInfo'); // show the info box
};

// If Exit Button Clicked
exitBtn.onclick = () => {
  infoBox.classList.remove('activeInfo'); // hide the info box
};

// Continue Button Clicked
continueBtn.onclick = () => {
  infoBox.classList.remove('activeInfo'); // hide the info box
  quizBox.classList.add('activeQuiz'); // show the quiz box
};
