"use strict";

//images
var louisImg = "<img class='image1' src='./images/louis.jpg'>";
var davidImg = "<img class='image2' src='./images/david.jpg'>"; //ititialisers

var currentPlayer = '';
var gameActive;
var gameState = ["", "", "", "", "", "", "", "", ""]; // Get gameArea

var gameArea = document.querySelector('.game-area'); //get and display game status

var statusDisplay = document.querySelector('.game-status');

function startGame() {
  currentPlayer = louisImg;
  gameActive = true;
  document.querySelectorAll('.cell').forEach(function (cell) {
    return cell.addEventListener('click', cellClick);
  });
  statusDisplay.innerHTML = "It's ".concat(currentPlayer, "'s turn");
} //generate cells dynamically


var cells = ['', '', '', '', '', '', '', '', '']; //loops over cells array and creates a div in each empty item in the array with a div

var generateCell = cells.forEach(function (cell, value) {
  gameArea.innerHTML += "<div class='cell cell".concat(value, "'id='").concat(value, "'>").concat(cell, "</div>");
}); //grabs the divs once created    

var divs = gameArea.getElementsByTagName('div'); //display results

var winningMessage = function winningMessage() {
  return "Player ".concat(currentPlayer, " has won!");
};

var drawMessage = function drawMessage() {
  return "Game ended in a draw!";
};

var currentPlayerTurn = function currentPlayerTurn() {
  return "It's ".concat(currentPlayer, "'s turn");
};

function cellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

;

function playerChange() {
  currentPlayer = currentPlayer === louisImg ? davidImg : louisImg;
  statusDisplay.innerHTML = currentPlayerTurn();
} //winning combos 


var winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];

function resultValidation() {
  var roundWon = false; //loop over winCombos array and check if result is a win

  for (var i = 0; i <= 7; i++) {
    var winCombo = winCombos[i];
    var a = gameState[winCombo[0]];
    var b = gameState[winCombo[1]];
    var c = gameState[winCombo[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  var roundDraw = !gameState.includes("");

  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  playerChange();
}

function cellClick(event) {
  //store the click event
  var clickedCell = event.target; //asisng index to click event

  var clickedCellIndex = clickedCell.id; // check if the cell has already been clicked

  if (gameState[clickedCellIndex] !== "" || !gameActive) return;
  cellPlayed(clickedCell, clickedCellIndex);
  resultValidation();
}

function restartGame() {
  //set game back to default
  document.querySelectorAll('.cell').forEach(function (cell) {
    cell.innerHTML = '';
  });
  statusDisplay.innerHTML = "";
  gameActive = true;
  currentPlayer = '';
  gameState = ["", "", "", "", "", "", "", "", ""];
  document.querySelectorAll('.cell').forEach(function (cell) {
    return cell.removeEventListener('click', cellClick);
  });
} // event listeners


document.querySelectorAll('.cell').forEach(function (cell) {
  return cell.removeEventListener('click', cellClick);
});
document.querySelector('.game-start').addEventListener('click', startGame);
document.querySelector('.game-reset').addEventListener('click', restartGame);