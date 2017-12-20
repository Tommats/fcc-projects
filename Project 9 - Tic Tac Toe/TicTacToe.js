var symb="X";
var player="X";
var matrix=[["","",""],["","",""],["","",""]];
var game = {winner:"", result:""};

function restart() {
  symb="X";
  player="X";
  matrix=[["","",""],["","",""],["","",""]];
  game = {winner:"", result:""};
  $('#overlay').show();
  $('.container').hide();
  $('#end-game-overlay').hide();
  $(".box").html("");
  $(".box").css("pointer-events", "auto");
  $(".box").removeClass("highlight");
}

function declareWinner() {
  $('#winner').html(game.result);
  $('#end-game-overlay').show();
  $('.container').css("pointer-events", "none");
}

function setShape(val) {
  symb=val;
  player=val;
  $('#overlay').hide();
  $('.container').show();
}

function swtichSymb () {
  if (symb=="X") {
    symb="O";
  } else {
    symb="X";
  }
}

function pushMatrix(pos,symb){
  pos=pos.split("");
  var i=pos[0];
  var j=pos[1];
  matrix[i][j]=symb;
  $("#"+i+j).css("pointer-events", "none");
}

function checkForWinner() {
  for (var i=0; i<=2; i++) {
    if ((matrix[i][0]!="")&&(matrix[i][0]==matrix[i][1]) && (matrix[i][1]==matrix[i][2])) {
      $("#"+i+"0").addClass("highlight");
      $("#"+i+"1").addClass("highlight");
      $("#"+i+"2").addClass("highlight");
      game.winner=matrix[i][0];
    }
    if ((matrix[0][i]!="")&&(matrix[0][i]==matrix[1][i]) && (matrix[1][i]==matrix[2][i])) {
      $("#"+"0"+i).addClass("highlight");
      $("#"+"1"+i).addClass("highlight");
      $("#"+"2"+i).addClass("highlight");
      game.winner=matrix[0][i];
    }
  }
  if ((matrix[0][0]!="")&&(matrix[0][0]==matrix[1][1]) && (matrix[1][1]==matrix[2][2])) {
      $("#00").addClass("highlight");
      $("#11").addClass("highlight");
      $("#22").addClass("highlight");
      game.winner=matrix[1][1];
    }
  if ((matrix[0][2]!="")&&(matrix[0][2]==matrix[1][1]) && (matrix[1][1]==matrix[2][0])) {
      $("#02").addClass("highlight");
      $("#11").addClass("highlight");
      $("#20").addClass("highlight");
      game.winner=matrix[1][1];
   }
}

function playComp(str){
  setTimeout(function innerComp(){
  var j=0;
  var i=0;
  var flag=true;
  for (var x=0; x<=2; x++) {
    if ((matrix[x][0]==matrix[x][1])&&(matrix[x][2]=="")) {
      j=2;
      i=x;
      flag=false;
    }
  }
  if (flag) {
    while (matrix[i][j]!="") {
      i=Math.floor(Math.random()*3);
      j=Math.floor(Math.random()*3);
    }
  }
  console.log(""+i+j+"");
  pushMatrix(""+i+j+"",str);
  $("#"+i+j).html(str);
  checkForWinner();
  if (checkIfGameEnds()) {
    declareWinner();
  } else {
    swtichSymb();
  }
  },400);
}

function checkIfGameEnds () {
  if (game.winner!="") {
    if (game.winner==player) {
      game.result="You Won!";
      return true;
    } else {
      game.result="You Lose :/";
      return true;
    }
  } else if ((matrix[0].indexOf("")+matrix[1].indexOf("")+matrix[2].indexOf(""))==-3) {
    game.result="It's a tie...";
    return true;
  } else {
    return false;
  }
}

$(document).ready(function() {
  //Box click event start
  $(".box").click(function(){
    $(this).html(symb);
    pushMatrix($(this).attr('id'),symb);
    checkForWinner();
    swtichSymb();
    if (checkIfGameEnds()) {
    declareWinner()
    } else {
      playComp(symb);
    }
 });
  //Box click event end
  $(".set-shape").click(function(){
    setShape($(this).val());
  });
  $("#restart").click(function(){
    restart();
  });

});  
