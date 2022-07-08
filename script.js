// variables
let score = 0
let timerCount = 10
let scoreDisplay = document.querySelector('#score')
let timerDisplay = document.querySelector('#timer')
let moles = document.querySelectorAll('.moles')
let button = document.querySelector('button')
let click = false

timerDisplay.innerHTML = timerCount
scoreDisplay.innerHTML = score

//functions

// starts game after button is clicked
const startGame = () => {
  score = 0
  timerCount = 10
  click = false
  timerDisplay.innerHTML = timerCount
  scoreDisplay.innerHTML = score
  timerDisplay.style.fontSize = '96px'
  timerDisplay.style.color = '#1E1011'
  timerDisplay.classList.remove('winnerTest')
  countDown()
}

// begins the timer count down from 10
const countDown = () => {
  const timer = setInterval(() => {
    moleSelection()
    timerDisplay.classList.add('timerPulse')
    timerCount--
    timerDisplay.innerHTML = timerCount
    if (timerCount === 3) {
      timerDisplay.style.color = 'red'
    } else if (timerCount <= 0) {
      clearInterval(timer)
      gameOver()
      timerDisplay.classList.remove('timerPulse')
    }
  }, 1000)
}

//selects the random mole to peep
const moleSelection = () => {
  const moleLocal = Math.floor(Math.random() * moles.length)
  moles[moleLocal].style.display = 'block'
  moles[moleLocal].addEventListener('click', () => {
    click = true
  })
  if (click === true) {
    score++
    scoreDisplay.innerHTML = score
    click = false
  }
  moleReset(moleLocal)
}

//hides the mole that peeped
const moleReset = (num) => {
  const clearMole = setTimeout(() => {
    moles[num].style.display = 'none'
    clearTimeout(clearMole)
  }, 1000)
}

//when timer reaches 0, text responses determined by score
const gameOver = () => {
  timerDisplay.style.fontSize = '60px'
  timerDisplay.style.color = '#2017CB'
  timerDisplay.style.fontWeight = 'bold'
  if (score >= 6) {
    timerDisplay.innerHTML = 'Mole Killa!'
    timerDisplay.classList.add('winnerTest')
  } else if (score < 6 && score > 0) {
    timerDisplay.innerHTML = 'Nice Try'
  } else {
    timerDisplay.innerHTML = 'Moles Win!'
  }
}

//events
button.addEventListener('click', startGame)
