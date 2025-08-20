const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleClick(e) {
  const index = e.target.dataset.index;
  
  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== '')) {
    statusText.textContent = 'It\'s a draw!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `${currentPlayer}'s turn`;

  // Highlight current player
  if (currentPlayer === 'X') {
    player1.classList.add('active');
    player2.classList.remove('active');
  } else {
    player2.classList.add('active');
    player1.classList.remove('active');
  }
}

function checkWin() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] === currentPlayer &&
           board[a] === board[b] &&
           board[a] === board[c];
  });
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = "X's turn";
  cells.forEach(cell => cell.textContent = '');

  player1.classList.add('active');
  player2.classList.remove('active');
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);

statusText.textContent = "X's turn";
