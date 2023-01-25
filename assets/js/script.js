const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
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
      answerButtonsElement.appendChild(button)
    })
  }
  
  function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide')
    } else {
      startButton.innerText = 'Play Again?'
      startButton.classList.remove('hide')
      alert("you have finished the quiz! Good work!");
    }
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
      element.classList.add('correct')
    } else {
      element.classList.add('wrong')
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
  }
  const questions = [
    {
      question: 'How many engines are on an X-wing fighter?',
      answers: [
        { text: '4', correct: true },
        { text: '8', correct: false },
        { text: '1', correct: false},
        { text: '6', correct: false},
      ]
    },
    {
      question: 'What famous figure was the inspiration for creature designer Stuart Freeborn when creating Yoda’s eyes?',
      answers: [
        { text: 'Michael D. Higgins', correct: false },
        { text: 'Danny DeVito', correct: false },
        { text: 'Albert Einstein', correct: true },
        { text: 'Jeff Goldblum', correct: false }
      ]
    },
    {
      question: 'Which star of Revenge of the Sith is the real-life nephew of Denis Lawson, who played Wedge in the first Star Wars Trilogy?',
      answers: [
        { text: 'Hayden Christensen', correct: false },
        { text: 'Ewan McGregor', correct: true },
        { text: 'Samuel L. Jackson', correct: false },
        { text: 'Temuera Morrison', correct: false }
      ]
    },
    {
      question: 'What do Han and Luke ride in the Snow on Hoth?', 
      answers: [
        { text: 'E-Scooters', correct: false },
        { text: 'Tauntaum', correct: true },
        { text: 'Bantha', correct: false },
        { text: 'Varactyl', correct: false },
      ]
    }
  ]