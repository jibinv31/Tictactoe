const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const winnerDisplay = document.getElementById('winner');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const startButton = document.getElementById('startButton');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    gameState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    currentPlayerDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    winnerDisplay.textContent = '';
    board.style.display = 'grid'; // Show the board
    startButton.style.display = 'none'; // Hide the start button
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (gameState[index] || winnerDisplay.textContent) return;

    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        winnerDisplay.textContent = `Player ${currentPlayer} Wins!`;
        currentPlayerDisplay.textContent = ''; // Clear the current player display when the game ends
        startButton.style.display = 'block'; // Show the start button to play again
    } else if (gameState.every(cell => cell)) {
        winnerDisplay.textContent = `It's a Draw!`;
        currentPlayerDisplay.textContent = ''; // Clear the current player display on a draw
        startButton.style.display = 'block'; // Show the start button to play again
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerDisplay.textContent = `Player ${currentPlayer}'s Turn`; // Update the current player display
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

startButton.addEventListener('click', startGame);
cells.forEach(cell => cell.addEventListener('click', handleClick));
