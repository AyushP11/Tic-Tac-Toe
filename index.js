const boxes = document.querySelectorAll('.box')
const gameInfo = document.querySelector('.game-info')
const newGameButton = document.querySelector('.btn')

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// function to initialize the game
function init() {
    currentPlayer = 'X';
    gameGrid = ["","","","","","","","",""]
    newGameButton.classList.remove('active');
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    // emptying boxes on the UI
    boxes.forEach((box) => {
        box.innerText = '';
        // cursor-pointer ko bhi enable krna padega
        box.style.pointerEvents = 'auto'; 

        // removing previous winner (green) background color
        if(box.classList.contains('win')) {
            box.classList.remove('win');
        }
    })
}

init();

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    })
})

function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;

        boxes[index].style.pointerEvents = 'none';
        swapTurn();

        checkGameOver();
    }
}

function swapTurn() {
    if(currentPlayer === 'X') {
        currentPlayer = 'O';
    }
    else {
        currentPlayer = 'X';
    }
    // game info me current player updating
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {

    let answer = "";

    winningPositions.forEach((position) => {

        // all 3 boxes should be non empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]))  {

                // check if the winner is X 
                if(gameGrid[position[0]] === 'X') {
                    answer = 'X';
                }
                else {
                    answer = 'O';
                }

                // mark winner green in the background 
                boxes[position[0]].classList.add('win')
                boxes[position[1]].classList.add('win')
                boxes[position[2]].classList.add('win')

                // disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = 'none';
                })
        }
    })

    if(answer !== "") {  
        // it means we have a winner
        gameInfo.innerText  = `Winner Player - ${answer}`; 
        newGameButton.classList.add('active');
        return;
    }

    // when there is no winner, we have to check TIE condition
    let filledCount = 0;
    gameGrid.forEach((box) => {
        if(box !== '') {
            filledCount++;
        }
    })
    if(filledCount === 9) {
        // Game is Tied !!!!!!!!
        gameInfo.innerText = `Match Tied !`;
        newGameButton.classList.add('active');
    }

}

newGameButton.addEventListener('click', init);



















