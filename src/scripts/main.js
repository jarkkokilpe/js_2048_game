'use strict';

const Game = require('../modules/Game.class');
const game = new Game();

document.addEventListener('DOMContentLoaded', () => {
  const actionButton = document.querySelector('.button.start');

  if (actionButton) {
    actionButton.addEventListener('click', () => {
      if (actionButton.classList.contains('start')) {
        game.start();
        // Change the button for future clicks to act as a restart trigger.
        actionButton.classList.remove('start');
        actionButton.classList.add('restart');
        actionButton.textContent = 'Restart';
      } else if (actionButton.classList.contains('restart')) {
        game.restart();
      }
      updateGameUI();
    });
  }
});

document.addEventListener('keydown', (e) => {
  let moved = false;

  switch (e.key) {
    case 'ArrowLeft':
    case 'A':
    case 'a':
      game.moveLeft();
      moved = true;
      break;
    case 'ArrowRight':
    case 'D':
    case 'd':
      game.moveRight();
      moved = true;
      break;
    case 'ArrowUp':
    case 'W':
    case 'w':
      game.moveUp();
      moved = true;
      break;
    case 'ArrowDown':
    case 'S':
    case 's':
      game.moveDown();
      moved = true;
      break;
    default:
  }

  if (moved) {
    updateGameUI();
  }
});

function updateGameUI() {
  const scoreEl = document.querySelector('.game-score');

  if (scoreEl) {
    scoreEl.textContent = game.getScore();
  }

  // Update each board cell's DOM element
  const board = game.getState();

  board.forEach((row, rowIndex) => {
    row.forEach((cellValue, colIndex) => {
      const cellId = `cell-${rowIndex}-${colIndex}`;
      const cellEl = document.getElementById(cellId);

      if (cellEl) {
        cellEl.textContent = cellValue || '';
        cellEl.className = 'field-cell';

        if (cellValue) {
          const tileClass = `field-cell--${cellValue}`;

          cellEl.classList.add(tileClass);
        }
      }
    });
  });

  // Update win, lose, and start messages.
  const loseMessageEl = document.querySelector('.message-lose');
  const winMessageEl = document.querySelector('.message-win');
  const startMessageEl = document.querySelector('.message-start');

  if (game.getStatus() === 'gameover') {
    if (loseMessageEl) {
      loseMessageEl.classList.remove('hidden');
    }

    if (winMessageEl) {
      winMessageEl.classList.add('hidden');
    }

    if (startMessageEl) {
      startMessageEl.classList.add('hidden');
    }
  } else if (game.getStatus() === 'won') {
    if (winMessageEl) {
      winMessageEl.classList.remove('hidden');
    }

    if (loseMessageEl) {
      loseMessageEl.classList.add('hidden');
    }

    if (startMessageEl) {
      startMessageEl.classList.add('hidden');
    }
  } else {
    // Hide w/l msgs and show the start message if the game is active or new.
    if (loseMessageEl) {
      loseMessageEl.classList.add('hidden');
    }

    if (winMessageEl) {
      winMessageEl.classList.add('hidden');
    }

    if (startMessageEl) {
      startMessageEl.classList.remove('hidden');
    }
  }
}
