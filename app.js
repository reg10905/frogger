const timeLeftDisplay = document.querySelector('#time-Left')
const resultDisplay = document.querySelector('#result')
const StartPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
const LogsLeft = document.querySelectorAll('.Log-Left')
const LogsRight = document.querySelectorAll('.Log-Right')
const CarsLeft = document.querySelectorAll('.Car-Left')
const CarsRight = document.querySelectorAll('.Car-Right')

console.log(squares)
let currentIndex = 76
const width = 9
let timerId
let currentTime = 20
let outcomeTimerId

function moveFrog(e) {
    squares[currentIndex].classList.remove('frog')
    switch(e.key) {
        case 'ArrowLeft' :
            if (currentIndex % width !== 0) currentIndex -= 1
            break
        case 'ArrowRight' :
            if (currentIndex % width < width-1) currentIndex += 1
            break
        case 'ArrowUp' :
            if (currentIndex - width >=0) currentIndex -= width
            break
        case 'ArrowDown' :
            if (currentIndex + width < width * width) currentIndex += width
            break
    }
    squares[currentIndex].classList.add('frog')
}

function autoMoveElements() {
    currentTime--
    timeLeftDisplay.textContent = currentTime
    LogsLeft.forEach(LogLeft => moveLogLeft(LogLeft))
    LogsRight.forEach(LogRight => moveLogRight(LogRight))
    CarsLeft.forEach(CarLeft => moveCarLeft(CarLeft))
    CarsRight.forEach(CarRight => moveCarRight(CarRight))
}

function checkOutComes() {
    lose()
    win()
}

function moveLogLeft(LogLeft) {
    switch(true) {
        case LogLeft.classList.contains('l1'):
            LogLeft.classList.remove('l1')
            LogLeft.classList.add('l2')
            break
        case LogLeft.classList.contains('l2'):
            LogLeft.classList.remove('l2')
            LogLeft.classList.add('l3')
            break
        case LogLeft.classList.contains('l3'):
            LogLeft.classList.remove('l3')
            LogLeft.classList.add('l4')
            break
        case LogLeft.classList.contains('l4'):
            LogLeft.classList.remove('l4')
            LogLeft.classList.add('l5')
            break
        case LogLeft.classList.contains('l5'):
            LogLeft.classList.remove('l5')
            LogLeft.classList.add('l1')
            break
    }
}

function moveLogRight(LogRight) {
    switch(true) {
        case LogRight.classList.contains('l1'):
            LogRight.classList.remove('l1')
            LogRight.classList.add('l5')
            break
        case LogRight.classList.contains('l2'):
            LogRight.classList.remove('l2')
            LogRight.classList.add('l1')
            break
        case LogRight.classList.contains('l3'):
            LogRight.classList.remove('l3')
            LogRight.classList.add('l2')
            break
        case LogRight.classList.contains('l4'):
            LogRight.classList.remove('l4')
            LogRight.classList.add('l3')
            break
        case LogRight.classList.contains('l5'):
            LogRight.classList.remove('l5')
            LogRight.classList.add('l4')
            break
    }
}

function moveCarLeft(CarLeft) {
    switch(true) {
        case CarLeft.classList.contains('c1'):
            CarLeft.classList.remove('c1')
            CarLeft.classList.add('c2')
            break
        case CarLeft.classList.contains('c2'):
            CarLeft.classList.remove('c2')
            CarLeft.classList.add('c3')
            break
        case CarLeft.classList.contains('c3'):
            CarLeft.classList.remove('c3')
            CarLeft.classList.add('c1')
            break
    }
}

function moveCarRight(CarRight) {
    switch(true) {
        case CarRight.classList.contains('c1'):
            CarRight.classList.remove('c1')
            CarRight.classList.add('c3')
            break
        case CarRight.classList.contains('c2'):
            CarRight.classList.remove('c2')
            CarRight.classList.add('c1')
            break
        case CarRight.classList.contains('c3'):
            CarRight.classList.remove('c3')
            CarRight.classList.add('c2')
            break
    }
}

function lose() {
    if (squares[currentIndex].classList.contains('c1') ||
        squares[currentIndex].classList.contains('l4') ||
        squares[currentIndex].classList.contains('l5') ||
        currentTime <= 0
    ) {
        resultDisplay.textContent = 'You Lose !'
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        squares[currentIndex].classList.remove('frog')
    }
}

function win() {
    if (squares[currentIndex].classList.contains('ending-block')) {
        resultDisplay.textContent = 'You Win !'
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        document.removeEventListener('keyup', moveFrog)
    }
}

StartPauseButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        outcomeTimerId = null
        timerId = null
        document.removeEventListener('keyup', moveFrog)
    } else {
        timerId = setInterval(autoMoveElements, 1000)
        outcomeTimerId = setInterval(checkOutComes, 50)
        document.addEventListener('keyup', moveFrog)
    }
})

