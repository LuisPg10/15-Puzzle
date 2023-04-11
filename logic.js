//Elements in html
const moves = document.querySelectorAll(".moves");
const board = document.getElementById("board");
const reload = document.getElementById("new");
const pause = document.getElementById("pause");
const counter = document.getElementById("counter");
const divOverlay = document.querySelector(".div-overlay");
const winner = document.querySelector(".winner");

//Variables to program
let timer, win;
let move = 0;
const numbers = [
    '1', '2', '3', '4',
    '5', '6', '7', '8',
    '9', '10', '11', '12',
    '13', '14', '15', ''
];
let usedNumbers = [];
let time = 0;

//Creating buttons to game
for (let i = 0; i <= 15; i++) {
    let square = document.createElement("div");
    square.classList.add("game-button");
    square.id = i;
    board.appendChild(square);
}

function checkMove(e) {
    let button = e.target;
    if (button.classList.contains("game-button")) {

        let topButton = document.getElementById(Number(button.id) - 4);
        let bottomButton = document.getElementById(Number(button.id) + 4);
        let previousButton = button.previousElementSibling;
        let nextButton = button.nextElementSibling;

        if (topButton != null) {
            moveNumber(button, topButton);
        }
        if (bottomButton != null) {
            moveNumber(button, bottomButton);
        }
        if (previousButton != null) {
            if (button.id != 4 && previousButton.id != 3 &&
                button.id != 8 && previousButton.id != 7 &&
                button.id != 12 && previousButton.id != 11)
                moveNumber(button, previousButton);
        }
        if (nextButton != null) {
            if (button.id != 3 && nextButton.id != 4 &&
                button.id != 7 && nextButton.id != 8 &&
                button.id != 11 && nextButton.id != 12)
                moveNumber(button, nextButton);
        }
    }
    e.stopPropagation();   
}
//#region functions
function selectNumber() {
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * 16);
    } while (usedNumbers.includes(numbers[randomNumber]));

    usedNumbers.push(numbers[randomNumber]);
    return numbers[randomNumber];
}

function moveNumber(pressElement, element) {
    if (element.textContent == '') {
        element.textContent = pressElement.textContent;
        pressElement.textContent = '';
        if (move == 0) {
            activateTimer();
            pause.disabled = false;
            pause.style.cursor = "pointer";
        }
        move++;
        moves[0].textContent = move;

        if (element.id == Number(element.textContent) - 1) {
            element.style.backgroundColor = "orange";
            win++;
        }
        else if (pressElement.style.backgroundColor == "orange") {
            pressElement.style.backgroundColor = "white";
            win--;
        }

        if (win == 15) {
            clearInterval(timer);
            moves[1].textContent = move;
            winner.style.visibility = "visible";
        }
    }
}

function fillSquares() {
    win = 0;
    usedNumbers.splice(0, usedNumbers.length);
    for (let i = 0; i <= 15; i++) {
        let element = board.children[i];
        element.textContent = selectNumber();

        if (element.id == Number(element.textContent) - 1) {
            element.style.backgroundColor = "orange";
            win++;
        }
        else {
            element.style.backgroundColor = "white";
        }
    }
    if (win == 15) {
        fillSquares();
    }
}
fillSquares();

function activateTimer() {
    timer = setInterval(() => {
        time++;
        counter.textContent = time;
    }, 1000);
}
//#endregion

//#region events
board.addEventListener('click', e => checkMove(e));
board.addEventListener('touchmove', e => checkMove(e));

reload.addEventListener('click', () => {

    if (move != 0) {
        if (timer != null)
            clearInterval(timer);
        time = 0;
        counter.textContent = time;
        move = 0;
        moves[0].textContent = move;
    }
    if (!pause.disabled) {
        pause.textContent = "Pause";
        pause.disabled = true;
        pause.style.cursor = "not-allowed";
    }
    if (divOverlay.style.visibility = "visible") {
        divOverlay.style.visibility = "hidden";
    }
    fillSquares();
});

pause.addEventListener('click', () => {

    if (pause.textContent == "Pause") {
        clearInterval(timer);
        divOverlay.style.visibility = "visible";
        pause.textContent = "Play";
    } else {
        activateTimer();
        divOverlay.style.visibility = "hidden";
        pause.textContent = "Pause";
    }
});

divOverlay.addEventListener('click', e => {
    if (e.target.id == "continue" || e.target.classList.contains("fa-play")) {
        activateTimer();
        divOverlay.style.visibility = "hidden";
        pause.textContent = "Pause";
    }
    e.stopPropagation();
});

winner.addEventListener('click', e => {
    if (e.target.classList.contains("accept")) {
        winner.style.visibility = "hidden";
        time = 0;
        counter.textContent = time;
        move = 0;
        moves[0].textContent = move;
        pause.disabled = true;
        pause.style.cursor = "not-allowed";
        fillSquares();
    }
    e.stopPropagation();
});

window.addEventListener('load', function () {
    pause.disabled = true;
    pause.style.cursor = "not-allowed";
});

//#endregion