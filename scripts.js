// Initialize variables
let currentPlayer = 'X'; // Current player (X or O)
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Array to store the state of each cell
const winCombos = [ // Possible winning combinations
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Function called when a cell is clicked
function cellClicked(index) {
  // Check if the cell is empty
  if (!gameBoard[index]) {
    // Update the game state and UI with the current player's mark
    gameBoard[index] = currentPlayer;
    document.getElementById('grid').children[index].innerText = currentPlayer;
    // Check if there's a winner or if the game is a draw
    checkWinner();
    // Switch to the next player
    togglePlayer();
    // Update UI to show whose turn it is
    updateTurnText();
  }
}

// Function to switch players
function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to update UI with current player's turn
function updateTurnText() {
  document.getElementById('turn').innerText = `It's ${currentPlayer}'s turn`;
}

// Function to check for a winner
function checkWinner() {
  for (let combo of winCombos) {
    const [a, b, c] = combo;
    // Check if any winning combination is found
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      // Display the winner
      displayWinner(gameBoard[a]);
      return;
    }
  }
  // If no winner and the board is full, it's a draw
  if (gameBoard.every(cell => cell !== '')) {
    displayWinner('draw');
  }
}

// Function to display game results
function displayWinner(winner) {
  const alert = document.getElementById('winner-alert');
  // Display the result in an alert box
  if (winner === 'draw') {
    alert.innerText = 'It\'s a draw!';
  } else {
    alert.innerText = `Player ${winner} wins!`;
  }
  // Show the alert
  alert.classList.remove('hidden');
}

// Function to restart the game
function restartGame() {
  // Reset variables and clear the game board
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.innerText = '');
  // Hide the result alert
  document.getElementById('winner-alert').classList.add('hidden');
  // Update UI to show X's turn
  updateTurnText();
}
