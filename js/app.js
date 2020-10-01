
//images
const louisImg = `<img class='image1' src='./images/louis.jpg'>`;
const davidImg = `<img class='image2' src='./images/david.jpg'>`;


//ititialisers
let currentPlayer = '';
let gameActive;
let gameState = ["", "", "", "", "", "", "", "", ""];

// Get gameArea
const gameArea = document.querySelector('.game-area');
//get and display game status
const statusDisplay = document.querySelector('.game-status');

function startGame () {
    currentPlayer = louisImg;
    gameActive = true;
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
}

//generate cells dynamically
const cells = [
    '','','',
    '','','',
    '','',''
];

//loops over cells array and creates a div in each empty item in the array with a div
const generateCell = cells.forEach((cell, value) => {
        gameArea.innerHTML += `<div class='cell cell${value}'id='${value}'>${cell}</div>`
        
    });

//grabs the divs once created    
const divs =  gameArea.getElementsByTagName('div');

//display results
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;


function cellPlayed(clickedCell, clickedCellIndex) {    
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
};

function playerChange() {
    currentPlayer = currentPlayer === louisImg ? davidImg : louisImg;
    statusDisplay.innerHTML = currentPlayerTurn();
}

//winning combos 
const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

function resultValidation() {

    let roundWon = false;
//loop over winCombos array and check if result is a win
    for (let i = 0; i <= 7; i++) {
        const winCombo = winCombos[i];
        let a = gameState[winCombo[0]];
        let b = gameState[winCombo[1]];
        let c = gameState[winCombo[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {        
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage(); 
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");

    if (roundDraw)  {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }    

    playerChange();
}

function cellClick(event) {
    //store the click event
    const clickedCell = event.target; 

    //asisng index to click event
    const clickedCellIndex = clickedCell.id;    

    // check if the cell has already been clicked
    if (gameState[clickedCellIndex] !== "" || !gameActive)

    return;    
    
    cellPlayed(clickedCell, clickedCellIndex);
    resultValidation();
       
}

function restartGame() {
    //set game back to default

    document.querySelectorAll('.cell').forEach((cell) => {
        cell.innerHTML = '';
    })

    statusDisplay.innerHTML = ``;
    gameActive = true;
    currentPlayer = ''
    gameState = ["", "", "", "", "", "", "", "", ""];

    document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', cellClick));
}

// event listeners

document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', cellClick));

document.querySelector('.game-start').addEventListener('click', startGame);

document.querySelector('.game-reset').addEventListener('click', restartGame);