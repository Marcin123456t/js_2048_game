'use strict';

// Uncomment the next lines to use your game instance in the browser
const Game = require('../modules/Game.class');
const game = new Game();

const boardElement = document.querySelector('.field');
const startBtn = document.querySelector('.main-button');
const scoreElement = document.querySelector('.score > span');
const statusMessage = document.querySelector('.status');

function renderBoard() {
  const state = game.getState();

  boardElement.innerHTML = '';

  state.forEach((row) => {
    row.forEach((cell) => {
      const cellDiv = document.createElement('div');

      cellDiv.classList.add('field-cell');

      if (cell !== 0) {
        cellDiv.textContent = cell;
        cellDiv.classList.add(`field-cell--${cell}`);
      }
      boardElement.appendChild(cellDiv);
    });
  });

  scoreElement.textContent = game.getScore();
  updateStatus();
}

document.addEventListener('keydown', (keyboardEvent) => {
  if (game.getStatus() !== 'playing') {
    return;
  }

  let moved = false;

  if (event.key === 'ArrowLeft') {
    moved = game.moveLeft();
  } else if (event.key === 'ArrowRight') {
    moved = game.moveRight();
  } else if (event.key === 'ArrowUp') {
    moved = game.moveUp();
  } else if (event.key === 'ArrowDown') {
    moved = game.moveDown();
  }

  if (moved) {
    renderBoard();
  }
});

startBtn.addEventListener('click', () => {
  if (game.getStatus() === 'idle') {
    game.start();
    startBtn.textContent = 'Restart';
    startBtn.classList.remove('start');
    startBtn.classList.add('restart');
  } else {
    game.restart();
  }

  renderBoard();
});

function updateStatus() {
  const gameStatus = game.getStatus();

  statusMessage.classList.add('hidden');

  if (gameStatus === 'win') {
    statusMessage.textContent = 'You win!';
    statusMessage.classList.remove('hidden');
  } else if (gameStatus === 'lose') {
    statusMessage.textContent = 'Game over!';
    statusMessage.classList.remove('hidden');
  }
}
