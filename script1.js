'use strict';

let playerCurrentScore = 0;
let computerCurrentScore = 0;
let playerTotalScore = 0;
let computerTotalScore = 0;

let playerActive = true;
let winner = false;

// resetting scores after ending their turn
function checkWinner() {
  if (playerTotalScore >= 100) {
    winner = true;
    document.querySelectorAll('.name')[0].textContent = 'Human wins!! 🥳';
    // disable roll and hold button after winner
    document.querySelectorAll('.btn')[1].disabled = true;
    document.querySelectorAll('.btn')[2].disabled = true;
  } else if (computerTotalScore >= 100) {
    document.querySelectorAll('.name')[1].textContent = 'Computer wins!! 🤖';
    // disable roll and hold button after winner
    document.querySelectorAll('.btn')[1].disabled = true;
    document.querySelectorAll('.btn')[2].disabled = true;
  }
}

// highlight current player
function highlightPlayer() {
  document.querySelectorAll('.player')[0].classList.toggle('player--active');
  document.querySelectorAll('.player')[1].classList.toggle('player--active');
}

// computer turn

function computerTurn() {
  // disable roll and hold buttons when computers turn
  document.querySelectorAll('.btn')[1].disabled = true;
  document.querySelectorAll('.btn')[2].disabled = true;

  if (!playerActive) {
    let diceRollInterval;

    function rollDice() {
      return Math.floor(Math.random() * 6) + 1;
    }

    function computerRoll() {
      // check if the computer's turn should continue
      if (computerCurrentScore < 12 && !playerActive && !winner) {
        let diceNumber = rollDice();

        if (diceNumber === 1) {
          document.querySelector('.dice').src = `dice-${diceNumber}.png`;
          computerCurrentScore = 0;
          document.querySelectorAll('.current-score')[1].textContent =
            computerCurrentScore;
          playerActive = true; // end computer's turn
          clearInterval(diceRollInterval); // stop further rolls
          highlightPlayer();
          document.querySelectorAll('.btn')[1].disabled = false;
          document.querySelectorAll('.btn')[2].disabled = false;

          console.log('Computer DICE LANDED ON 1');
          console.log(playerActive);
        } else {
          document.querySelector('.dice').src = `dice-${diceNumber}.png`;
          computerCurrentScore = computerCurrentScore + diceNumber;
          document.querySelectorAll('.current-score')[1].textContent =
            computerCurrentScore;

          console.log('Dice landed in: ', diceNumber);
          console.log('Computer current score is: ', computerCurrentScore);
        }
      } else {
        // adding current score to total score after reaching the desired outcome (12)
        computerTotalScore = computerTotalScore + computerCurrentScore;
        document.querySelectorAll('.score')[1].textContent = computerTotalScore;

        // resetting current score stats after turn is finished
        computerCurrentScore = 0;
        document.querySelectorAll('.current-score')[1].textContent =
          computerCurrentScore;

        // changing players
        playerActive = !playerActive;

        highlightPlayer();

        document.querySelectorAll('.btn')[1].disabled = false;
        document.querySelectorAll('.btn')[2].disabled = false;

        checkWinner();
        clearInterval(diceRollInterval); // stop further rolls
      }
    }

    // initiate rolling every second (1000ms)
    diceRollInterval = setInterval(computerRoll, 1500);
  }
}

// roll button handler
function handleRollButton() {
  let diceNumber = Math.floor(Math.random() * 6) + 1;
  //   console.log(diceNumber);
  if (diceNumber === 1) {
    document.querySelector('.dice').src = `dice-${diceNumber}.png`;
    playerCurrentScore = 0;
    document.querySelectorAll('.current-score')[0].textContent =
      playerCurrentScore;
    playerActive = !playerActive;
    highlightPlayer();

    computerTurn();
  } else {
    // change dice face
    document.querySelector('.dice').src = `dice-${diceNumber}.png`;

    //sum dice number as current score
    playerCurrentScore = playerCurrentScore + diceNumber;
    document.querySelectorAll('.current-score')[0].textContent =
      playerCurrentScore;
  }
}

// hold button handler
function handleHoldButton() {
  highlightPlayer();
  playerTotalScore = playerTotalScore + playerCurrentScore;
  document.querySelectorAll('.score')[0].textContent = playerTotalScore;
  playerCurrentScore = 0;
  document.querySelectorAll('.current-score')[0].textContent =
    playerCurrentScore;
  playerActive = !playerActive;
  computerTurn();
  checkWinner();
}

// roll button event listener
document
  .querySelectorAll('.btn')[1]
  .addEventListener('click', handleRollButton);

//hold button event listener
document
  .querySelectorAll('.btn')[2]
  .addEventListener('click', handleHoldButton);

// Reset button handler
function handleReset() {
  document.querySelectorAll('.btn')[1].disabled = false;
  document.querySelectorAll('.btn')[2].disabled = false;
  document.querySelectorAll('.name')[0].textContent = 'Human Player';
  document.querySelectorAll('.name')[1].textContent = 'Computer 🖥';

  playerCurrentScore = 0;
  playerTotalScore = 0;
  computerCurrentScore = 0;
  computerTotalScore = 0;

  document.querySelectorAll('.score')[0].textContent = playerTotalScore;
  document.querySelectorAll('.score')[1].textContent = computerTotalScore;
  document.querySelectorAll('.current-score')[0].textContent =
    playerCurrentScore;
  document.querySelectorAll('.current-score')[1].textContent =
    computerCurrentScore;
  playerActive = true;
  winner = false;
  document.querySelectorAll('.player')[0].classList.add('player--active');
  document.querySelectorAll('.player')[1].classList.remove('player--active');
}

document.querySelectorAll('.btn')[0].addEventListener('click', handleReset);
