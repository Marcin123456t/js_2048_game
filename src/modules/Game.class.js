'use strict';

export default class Game {
  constructor(initialState) {
    this.size = 4;
    this.score = 0;
    this.status = 'idle';
    this.board = initialState || this.createEmptyBoard();
  }

  createEmptyBoard() {
    return Array.from({ length: this.size }, () => Array(this.size).fill(0));
  }

  getScore() {
    return this.score;
  }

  getState() {
    return this.board;
  }

  getStatus() {
    return this.status;
  }

  start() {
    this.status = 'playing';
    this.board = this.createEmptyBoard();
    this.addRandomTile();
    this.addRandomTile();
    this.score = 0;
  }

  restart() {
    this.start();
  }

  moveLeft() {
    let moved = false;
    const newBoard = this.board.map((row) => {
      const filtered = row.filter((n) => n !== 0);
      const merged = [];

      for (let i = 0; i < filtered.length; i++) {
        if (filtered[i] === filtered[i + 1]) {
          merged.push(filtered[i] * 2);
          this.score += filtered[i] * 2;
          i++;
        } else {
          merged.push(filtered[i]);
        }
      }

      while (merged.length < this.size) {
        merged.push(0);
      }

      if (!moved && !this.arraysEqual(merged, row)) {
        moved = true;

        return merged;
      }
    });

    if (moved) {
      this.board = newBoard;
      this.addRandomTile();
      this.checkStatus();
    }

    return moved;
  }

  moveRight() {
    this.reverseRows();

    const moved = this.moveLeft();

    this.reverseRows();

    return moved;
  }

  moveUp() {
    this.transpose();

    const moved = this.moveLeft();

    this.transpose();

    return moved;
  }

  moveDown() {
    this.transpose();

    const moved = this.moveRight();

    this.transpose();

    return moved;
  }

  addRandomTile() {
    const emptyCells = [];

    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.board[row][col] === 0) {
          emptyCells.push([row, col]);
        }
      }
    }

    if (emptyCells.length === 0) {
      return;
    }

    const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    this.board[r][c] = Math.random() < 0.9 ? 2 : 4;
  }

  arraysEqual(a, b) {
    return a.every((v, i) => v === b[i]);
  }

  reverseRows() {
    this.board = this.board.map((row) => row.reverse());
  }

  transpose() {
    const newBoard = this.createEmptyBoard();

    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        newBoard[c][r] = this.board[r][c];
      }
    }
    this.board = newBoard;
  }

  checkStatus() {
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        const val = this.board[r][c];

        if (val === 2048) {
          this.status = 'win';

          return;
        }
      }
    }

    if (!this.canMove()) {
      this.status = 'lose';
    }
  }

  canMove() {
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        const val = this.board[r][c];

        if (val === 0) {
          return true;
        }

        if (c < this.size - 1 && val === this.board[r][c + 1]) {
          return true;
        }

        if (r < this.size - 1 && val === this.board[r + 1][c]) {
          return true;
        }
      }
    }

    return false;
  }
}
