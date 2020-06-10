let turn = "X";
let clickCount = 0;
let winIndex;
let winCount = {
  X: 0,
  O: 0,
};
const winList = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
const storkeList = [
  "h,h1",
  "h,h2",
  "h,h3",
  "v,v1",
  "v,v2",
  "v,v3",
  "d,d1",
  "d,d2",
];
const board = document.getElementById("tictactoe");
const winStroke = document.querySelector(".winStroke");
const winTitle = document.getElementById("winTitle");
const celebrate = document.querySelector(".celebrate");
const xCount = document.getElementById("xCount");
const oCount = document.getElementById("oCount");

const mouseOver = (e) => {
  if (
    e.target.getAttribute("data-id") &&
    !e.target.classList.contains("clicked") &&
    !winIndex
  ) {
    if (clickCount < 9) {
      e.target.innerHTML = turn;
    }
  }
};
const mouseOut = (e) => {
  if (
    e.target.getAttribute("data-id") &&
    !e.target.classList.contains("clicked") &&
    !winIndex
  ) {
    if (clickCount < 9) {
      e.target.innerHTML = "";
    }
  }
};

const boardClick = (e) => {
  if (
    e.target.getAttribute("data-id") &&
    !e.target.classList.contains("clicked") &&
    !winIndex
  ) {
    if (clickCount < 9) {
      e.target.innerHTML = turn;
      e.target.classList.add("clicked");
      const isWon = winList.some((list, index) => {
        const [cell1, cell2, cell3] = list;
        const cell1Val = getText(cell1);
        const cell2Val = getText(cell2);
        const cell3Val = getText(cell3);
        if (cell1Val == turn && cell2Val == turn && cell3Val == turn) {
          winIndex = index + 1;
          return true;
        } else {
          return false;
        }
      });
      if (isWon) {
        clearBoard();
      } else {
        turn = turn === "X" ? "O" : "X";
        clickCount++;
        if (clickCount === 9) {
          clearBoard();
        }
      }
    }
  }
};

const clearBoard = () => {
  let timeout = 2000;
  let classList = [];
  let gameStatus;
  if (winIndex) {
    board.classList.add("blur");
    classList = [...storkeList[winIndex - 1].split(","), "show"];
    winStroke.classList.add(...classList);
    console.log(winStroke.classList);
    console.log(winStroke.classList.contains(","));
    winCount[turn] += 1;
    gameStatus = `${turn} WON`;
    winTitle.classList.add("show", "success");
    celebrate.classList.add("show");
  } else {
    board.classList.add("blur");
    gameStatus = `XO Draw`;
    winTitle.classList.add("show", "warn");
  }
  xCount.innerHTML = `X - ${winCount["X"]}`;
  oCount.innerHTML = `O - ${winCount["O"]}`;
  winTitle.innerHTML = gameStatus;
  setTimeout(() => {
    document.querySelectorAll("#tictactoe div").forEach((ele) => {
      ele.innerHTML = "";
      ele.classList.remove("clicked");
    });
    clickCount = 0;
    turn = "X";
    winIndex && winStroke.classList.remove(...classList);
    winTitle.classList.remove("show", "warn", "success");
    winIndex = undefined;
    winTitle.innerHTML = "";
    board.classList.remove("blur");
    celebrate.classList.remove("show");
  }, timeout);
};

const getText = (dataAttr) =>
  document.querySelector(`[data-id="${dataAttr}"]`).innerHTML;

board.addEventListener("click", boardClick);
board.addEventListener("mouseover", mouseOver);
board.addEventListener("mouseout", mouseOut);
