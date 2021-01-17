// Getting all required elements
const startBtn = document.querySelector('.start-btn button');
const infoBox = document.querySelector('.info-box');
const exitBtn = document.querySelector('.buttons .quit');
const continueBtn = document.querySelector('.buttons .restart');
const quizBox = document.querySelector('.quiz-box');
const timeCount = quizBox.querySelector('.timer .timer-sec');
const timeLine = quizBox.querySelector('header .time-line');
const timeOff = quizBox.querySelector('header .time-text');

const optionList = document.querySelector('.option-list');

// If Start Quiz Button Clicked
startBtn.onclick = () => {
  infoBox.classList.add('activeInfo'); // show the info box
};

// If Exit Button Clicked
exitBtn.onclick = () => {
  infoBox.classList.remove('activeInfo'); // hide the info box
};

// If Continue Button Clicked
continueBtn.onclick = () => {
  infoBox.classList.remove('activeInfo'); // hide the info box
  quizBox.classList.add('activeQuiz'); // show the quiz box
  showQuestions(0);
  queCounter(1);
  clearInterval(counter);
  startTimer(timeValue);
  startTimerLine(0);
};

let queCount = 0;
let queNumb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const nextBtn = quizBox.querySelector('.next-btn');
const resultBox = document.querySelector('.result-box');
const restartQuiz = resultBox.querySelector('.buttons .restart');
const quitQuiz = resultBox.querySelector('.buttons .quit');

restartQuiz.onclick = () => {
  quizBox.classList.add('activeQuiz');
  resultBox.classList.remove('activeResult');
  let queCount = 0;
  let queNumb = 1;
  let timeValue = 15;
  let widthValue = 0;
  let userScore = 0;
  showQuestions(queCount);
  queCounter(queNumb);
  clearInterval(counter);
  startTimer(timeValue);
  clearInterval(counterLine);
  startTimerLine(widthValue);
  nextBtn.style.display = 'none';
  timeOff.textContent = 'Time left';
};

quitQuiz.onclick = () => {
  window.location.reload();
};

// If Next Button Clicked
nextBtn.onclick = () => {
  if (queCount < questions.length - 1) {
    queCount++;
    queNumb++;
    showQuestions(queCount);
    queCounter(queNumb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextBtn.style.display = 'none';
    timeOff.textContent = 'Time left';
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    console.log('Questions completed');
    showResultBox();
  }
};

// getting questions and options from array
function showQuestions(index) {
  const queText = document.querySelector('.que-text');
  let queTag =
    '<span>' +
    questions[index].numb +
    '. ' +
    questions[index].question +
    '</span>';
  queText.innerHTML = queTag;
  let optionTag =
    '<div class = "option">' +
    questions[index].options[0] +
    '<span></span></div>' +
    '<div class="option">' +
    questions[index].options[1] +
    '<span></span></div>' +
    '<div class="option">' +
    questions[index].options[2] +
    '<span></span></div>';
  queText.innerHTML = queTag;
  optionList.innerHTML = optionTag;
  const option = optionList.querySelectorAll('.option');
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)');
  }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent;
  let correctAns = questions[queCount].answer;
  let allOptions = optionList.children.length;
  if (userAns == correctAns) {
    userScore += 1;
    console.log(userScore);
    answer.classList.add('correct');
    console.log('Answer is correct');
    answer.insertAdjacentHTML('beforeend', tickIcon);
  } else {
    answer.classList.add('incorrect');
    console.log('Answer is wrong');
    answer.insertAdjacentHTML('beforeend', crossIcon);

    // if answers are incorrect then automatically select the correct answer
    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAns) {
        optionList.children[i].setAttribute('class', 'option correct');
        optionList.children[i].insertAdjacentHTML('beforeend', tickIcon);
      }
    }
  }
  // once user selects answer, disable all options
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add('disabled');
  }
  nextBtn.style.display = 'block';
}

function showResultBox() {
  infoBox.classList.remove('activeInfo'); // hide the info box
  quizBox.classList.remove('activeQuiz'); // hide the quiz box
  resultBox.classList.add('activeResult'); // show the quiz box
  const scoreText = resultBox.querySelector('.score-text');
  if (userScore > 3) {
    let scoreTag =
      '<span>Congrats! You got<p>' +
      userScore +
      '</p>out of<p>' +
      questions.length +
      '</p></span>';
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag =
      '<span>Nice, You got<p>' +
      userScore +
      '</p>out of<p>' +
      questions.length +
      '</p></span>';
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      '<span>and sorry, You got only<p>' +
      userScore +
      '</p>out of<p>' +
      questions.length +
      '</p></span>';
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = '0' + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = '00';
      timeOff.textContent = "Time's up";

      let correctAns = questions[queCount].answer;
      let allOptions = optionList.children.length;

      for (let i = 0; i < allOptions; i++) {
        if (optionList.children[i].textContent == correctAns) {
          optionList.children[i].setAttribute('class', 'option correct');
          optionList.children[i].insertAdjacentHTML('beforeend', tickIcon);
        }
      }
      for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
      }
      nextBtn.style.display = 'block';
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    timeLine.style.width = time + 'px';
    if (time > 549) {
      clearInterval(counterLine);
    }
  }
}

function queCounter(index) {
  const bottomQuesCounter = quizBox.querySelector('.total-que');
  let totalQuesCountTag =
    '<span><p>' +
    index +
    '</p>of<p>' +
    questions.length +
    '</p>Questions</span>';
  bottomQuesCounter.innerHTML = totalQuesCountTag;
}
