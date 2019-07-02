// the worflow is to have a fucntion to start the game, a function to set the next question, and a function to run whan an answer has been selected.
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');


startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

let shuffledQuestions, currentQuestionIndex;

function startGame() {
    startButton.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    shuffledQuestions = questions.sort(() => {Math.random() - 0.5;});
    currentQuestionIndex = 0;
    setNextQuestion();
} 

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
        button.dataset.correct = answer.correct; // this adds a new dataset called correct to the button
    }  
    button.addEventListener('click', selectAnswer);     
    answerButtonsElement.appendChild(button); 
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if(shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove('hide');
    }
   

}
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'What is 2 + 2 ?',
        answers: [
            { text: '4', correct: true},
            { text: '34', correct: false}
        ]
    },
    {
        question: 'How many stars are in the U.S. flag ?',
        answers: [
            { text: '50', correct: true },
            { text: '49', correct: false },
            { text: '65', correct: false }
        ]
    },
    {
        question: 'Is web development fun?',
        answers: [
          { text: 'Kinda', correct: false },
          { text: 'YES!!!', correct: true },
          { text: 'Um no', correct: false },
          { text: 'IDK', correct: false }
        ]
    },
    {
        question: 'What is 4 * 2?',
        answers: [
          { text: '6', correct: false },
          { text: '8', correct: true }
        ]
    }
]