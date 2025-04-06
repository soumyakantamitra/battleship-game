import './main.css';
import { fillBoard, renderBoard, hideShipfromContainer, enableBattleButton, disableBattleButton, noticeBoard} from './layout';


class Ship {
  constructor(length) {
    this.length = length;
    this.damage = 0;
  }

  hit(value) {
    this.damage += value;
    this.isSunk();
  }

  isSunk() {
    if (this.damage >= this.length) {
      console.log("Ship has sunk");
      return true;
    }
    return false;
  }
}


class Gameboard {
  constructor(boardUi, computer = false) {
    this.board = this.createBoard();
    this.ships = {};
    this.boardUi = boardUi;
    this.shipCount = 0;
    this.computer = computer;
  }

  createBoard() {
    let board = [];
    for (let i = 0; i < 10; i++) {
      let col = [];
      for (let j = 0; j < 10; j++) {
        col.push("-1");
      }
      board.push(col);
    }
    return board;
  }

  placeShip(x, y, length) { 
    if (this.shipCount == 5) return false;

    for (let i = 0; i < length; i++) {
      if (this.board[x][y + i] != "-1") {
        console.log("Space is Occupied. Ship can't be deployed");
        return false;
      }
    }

    let ship = new Ship(length);
    this.shipCount += 1;
    this.ships[this.shipCount] = ship;
    for (let i = 0; i < length; i++) {
      this.board[x][y + i] = "" + this.shipCount;
    }
    renderBoard(this.board, this.boardUi, this.computer);
    if (this.shipCount == 5) {
      enableBattleButton(this.computer);
    }
    return true;
  }

  receiveAttack(x, y) {
    let shipCoordinate = this.board[x][y];
    if (shipCoordinate == "0" || shipCoordinate == "x") {
      return false;
    }
    if (shipCoordinate == "-1") {
      this.board[x][y] = "0";
    }
    else {
      let ship = this.ships[this.board[x][y]];
      ship.hit(1);
      if (ship.isSunk()) {
        delete this.ships[this.board[x][y]];
      }
      this.board[x][y] = "x";
    }
    
    renderBoard(this.board, this.boardUi, this.computer);
    return true;
  }
}


class Player {
  constructor(boardUi, computer = true) {
    this.computer = computer;
    this.gameboard = new Gameboard(boardUi, computer);
  }
  
  randomMove() {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);
    return {row, col};
  }

  randomPlacement(length) {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    while(this.gameboard.placeShip(row, col, length) != true) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    }
    
  }

  isDefeated() {
    if (Object.keys(this.gameboard.ships).length == 0) {
      return true;
    }
  }
}


const p1Board = document.querySelector(".player1");
const player1 = new Player(p1Board, false);
const p2Board = document.querySelector(".player2");
const player2 = new Player(p2Board);

fillBoard(p1Board);
fillBoard(p2Board);

player2.randomPlacement(2);
player2.randomPlacement(2);
player2.randomPlacement(3);
player2.randomPlacement(4);
player2.randomPlacement(5);

p2Board.addEventListener("click", (e) => {
  const pos = e.target.classList;
  const row = +pos[0][pos[0].length - 1];
  const col = +pos[1][pos[1].length - 1];
  if (player2.gameboard.board[row][col] == "0") {
    return;
  }

  if (player2.gameboard.receiveAttack(row, col) == false) {
    return;
  };

  if (player2.isDefeated()) {
    console.log("Player 2 is defeated");
    noticeBoard("You are the Winner!!");
    p2Board.style.pointerEvents = "none";
    return;
  }

  let randomShot = player2.randomMove();
  while (player1.gameboard.board[randomShot.row][randomShot.col] == "0" || 
    player1.gameboard.board[randomShot.row][randomShot.col] == "x") {
    randomShot = player2.randomMove();
  }
  player1.gameboard.receiveAttack(randomShot.row, randomShot.col);

  if (player1.isDefeated()) {
    console.log("Player 1 is defeated");
    noticeBoard("Computer Wins. You have Lost (ToT)");
    p2Board.style.pointerEvents = "none";
    return;
  }

});


document.querySelectorAll(".ship").forEach(ship => {
  ship.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  });
  ship.addEventListener("dragend", (e) => {
  });
});

p1Board.addEventListener("dragover", (e) => {
  if (e.dataTransfer.types.includes("text/plain")) {
    e.preventDefault();
  }
});

p1Board.addEventListener("dragenter", (e) => {
  e.target.classList.add("hovered");
});

p1Board.addEventListener("dragleave", (e) => {
  e.target.classList.remove("hovered");
});

p1Board.addEventListener("drop", (e) => {
  e.preventDefault();
  e.target.classList.remove("hovered");
  const data = e.dataTransfer.getData('text/plain');
  const pos = e.target.classList;
  const row = +pos[0][pos[0].length - 1];
  const col = +pos[1][pos[1].length - 1];
  const shipLength = document.querySelector(`#${data}`).childElementCount;
  const shipPlacedOnBoard = player1.gameboard.placeShip(row, col, shipLength);
  if (shipPlacedOnBoard) {
    hideShipfromContainer(data);
  }
});


let battleButton = document.querySelector(".battle-button");
battleButton.addEventListener("click", () => {
  p2Board.style.pointerEvents = "auto";
  disableBattleButton();
  noticeBoard("Fight!");
})


