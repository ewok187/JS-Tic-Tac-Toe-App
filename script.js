$(document).ready(function() {
  $(".gameboard").hide();
  $("#reset").hide();
  var turn = "";
  var compTurn = "";

  //choose X
  $("#x").click(function() {
    $(".gameboard").show();
    $(".choice").hide();
    turn = "X";
    compTurn = "O";
  });
  //choose O
  $("#o").click(function() {
    $(".gameboard").show();
    $(".choice").hide();
    turn = "O";
    compTurn = "X";
  });
  var turns = [];
  var gameOn = false;
  //keeps track of turns so computer stops when game done
  var count = 0;
  // computer AI
  function computerTurn() {
    //break loop with var taken
    var taken = false;
    while (taken === false && count !== 5) {
      //Generate Computers random turn
      var computersMove = (Math.random() * 8).toFixed();
      var move = $("#" + computersMove).text();
      if (move === "") {
        $("#" + computersMove).text(compTurn);
        taken = true;
        turns[computersMove] = compTurn;
      }
    }
  }

  // function when field is clicked by player
  function playerTurn(turn, id) {
    var spotTaken = $("#" + id).text();
    if (spotTaken === "") {
      count++;
      turns[id] = turn; //array that stors decisions
      $("#" + id).text(turn);
      winCondition(turns, turn);
      if (gameOn === false) {
        computerTurn();
        winCondition(turns, compTurn);
      }
    }
  }
  //click a field
  $(".field").click(function() {
    var slot = $(this).attr("id");
    playerTurn(turn, slot);
  });

  // winconditions
  function winCondition(turnArray, currentTurn) {
    if (
      turnArray[0] === currentTurn &&
      turnArray[1] === currentTurn &&
      turnArray[2] === currentTurn ||
      turnArray[0] === currentTurn &&
      turnArray[3] === currentTurn &&
      turnArray[6] === currentTurn ||
      turnArray[3] === currentTurn &&
      turnArray[4] === currentTurn &&
      turnArray[5] === currentTurn ||
      turnArray[6] === currentTurn &&
      turnArray[7] === currentTurn &&
      turnArray[8] === currentTurn ||
      turnArray[1] === currentTurn &&
      turnArray[4] === currentTurn &&
      turnArray[7] === currentTurn ||
      turnArray[2] === currentTurn &&
      turnArray[5] === currentTurn &&
      turnArray[8] === currentTurn ||
      turnArray[0] === currentTurn &&
      turnArray[4] === currentTurn &&
      turnArray[8] === currentTurn ||
      turnArray[2] === currentTurn &&
      turnArray[4] === currentTurn &&
      turnArray[6] === currentTurn
    ) {
      gameOn = true;
      $(".winner").text(currentTurn + " won!");
      $(".winner").show();
      turn = "";
      compTurn = "";
      count = 0;
      $("#reset").show();
      $(".field").css("cursor", "default");
    } else if (count === 5) {
      gameOn = true;
      $(".winner").text("Draw!");
      $(".winner").show();
      turn = "";
      compTurn = "";
      count = 0;
      $("#reset").show();
      $(".field").css("cursor", "default");
    } else {
      gameOn = false;
    }
  } // end win conditions
  // reset
  function reset() {
    turns = [];
    count = 0;
    $(".field").text("");
    gameOn = false;
    $(".gameboard").hide();
    $(".choice").show();
    $("#reset").hide();
    $(".winner").hide();
  }
  $("#reset").click(reset);
});
