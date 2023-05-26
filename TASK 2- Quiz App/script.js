const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerbtnElement = document.getElementById('answer-btns')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()

})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()

}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerbtnElement.appendChild(button)
    })

}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerbtnElement.firstChild) {
        answerbtnElement.removeChild(answerbtnElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerbtnElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    }
    else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }

}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    }
    else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')

}

const questions = [{
    question: 'Who is the father of AI ?',
    answers: [
        { text: 'Stephen hawking',correct:false },
        { text: 'Alan turing', correct: false },
        { text: 'John Macarty', correct: true },
        { text: 'Nikola Tesla', correct: false }
    ]
},

{
    question: 'What is 56 % 26 ?',
    answers: [
        { text: '4', correct: true },
        { text: '26', correct: false },
        { text: '1', correct: false },
        { text: '0', correct: false }
    ]
},

{
    question: "How's your internship going?",
    answers: [
        { text: 'Idk', correct: false },
        { text: 'Excellent', correct: true },
        { text: 'Good', correct: false },
        { text: 'Not bad', correct: false }
    ]
},

{
    question: 'Is web development fun ?',
    answers: [
        { text: 'Kinda', correct: false},
        { text: 'Not at all', correct: false },
        { text: 'None of the above', correct: false },
        { text: 'Yes! Always!!', correct: true }
    ]
}

]