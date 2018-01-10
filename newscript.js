$(document).ready(function() {
  var origBoard;
  var huPlayer;
  var aiPlayer;
  const fields = document.querySelectorAll(".field");
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  // hide gameboard show choice
  $(".gameboard, #reset").hide();
  //choose X
  $("#x").click(function() {
    $(".gameboard").show();
    $(".choice").hide();
    huPlayer = "X";
    aiPlayer = "O";
  });
  //choose O
  $("#o").click(function() {
    $(".gameboard").show();
    $(".choice").hide();
    huPlayer = "O";
    aiPlayer = "X";
  });

  startGame();

  function startGame() {
    origBoard = Array.from(Array(9).keys());
    for (var i = 0; i < fields.length; i++) {
      fields[i].innerText = "";
      fields[i].style.removeProperty("background-color");
      fields[i].addEventListener("click", turnClick, false)
    }
  }

  $("#reset").click(function() {
    startGame();
    $(".gameboard, #reset").hide();
    $(".choice").show();
    $(".winner").text("");
  });

  function turnClick(square) {
    if (typeof origBoard[square.target.id] == "number") {
      turn(square.target.id, huPlayer)
      if (!checkTie()) turn(bestSpot(), aiPlayer);
    }
  }

  function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player);
    if (gameWon) gameOver(gameWon)
  }

  function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
      (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameWon = {
          index: index,
          player: player
        };
        break;
      }
    }
    return gameWon;
  }

  function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
      document.getElementById(index).style.backgroundColor =
        gameWon.player == huPlayer ? "blue" : "red";
    }
    for (var i = 0; i < fields.length; i++) {
      fields[i].removeEventListener("click", turnClick, false)
    }
    declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose!")
  }

  function declareWinner(who) {
    $(".winner").text(who);
    $(".winner").show();
    $("#reset").show();
    $(".field").css("cursor", "default");
  }

  function emptySquares() {
    return origBoard.filter(s => typeof s == "number")
  }

  function bestSpot() {
    return minimax(origBoard, aiPlayer).index;
  }

  function checkTie() {
    if (emptySquares().length == 0) {
      for (var i = 0; i < fields.length; i++) {
        fields[i].style.backgroundColor = "green";
        fields[i].removeEventListener("click", turnClick, false);
      }
      declareWinner("Tie Game!")
      return true;
    }
    return false;
  }

  function minimax(newBoard, player) {
    var availSpots = emptySquares(newBoard);
    if (checkWin(newBoard, huPlayer)) {
      return {
        score: -10
      };
    } else if (checkWin(newBoard, aiPlayer)) {
      return {
        score: 10
      };
    } else if (availSpots.length === 0) {
      return {
        score: 0
      };
    }
    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
      var move = {};
      move.index = newBoard[availSpots[i]];
      newBoard[availSpots[i]] = player;

      if (player == aiPlayer) {
        var result = minimax(newBoard, huPlayer)
        move.score = result.score;
      } else {
        var result = minimax(newBoard, aiPlayer)
        move.score = result.score;
      }
      newBoard[availSpots[i]] = move.index;
      moves.push(move);
    }
    var bestMove;
    if (player === aiPlayer) {
      var bestScore = -10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      var bestScore = 10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  }
});
