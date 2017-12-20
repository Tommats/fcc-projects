$(document).ready(function() {
  var player = {
  seq:[],
  counter:0
  };

  var ai = {
  seq:[],
  counter:0
  };

  var winningSong = [1,2,4,3,1,2,4,3,1,2,4,3];

  var counter=0;
  var maxLoops=10;

  var sound = document.createElement("audio");
  sound.src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
  sound.volume=0.10;
  sound.autoPlay=false;
  sound.preLoad=true;

  var winning = document.createElement("audio");
  winning.src="http://soundbible.com/mp3/Kids Cheering-SoundBible.com-681813822.mp3";
  winning.volume=0.10;
  winning.autoPlay=false;
  winning.preLoad=true;

  function lockConsole () {
    $('.gamebox').css("pointer-events", "none");
  }

  function unlockConsole () {
    $('.gamebox').css("pointer-events", "auto");
  }

  function validateSeq (var1,var2) {
      if (var1==var2) {
        return true;
      } else {
        return false;
      }
  }

    function declareWinner() {
    winning.play();
    $('#end-game-overlay').show();
    $('.main-container').css("pointer-events", "none");
  }

  function wrongAlert() {
    sound.src="http://soundbible.com/mp3/Bike Horn-SoundBible.com-602544869.mp3";
    sound.play();
    setTimeout(function () {
          $('#counter').html('');
        }, 200);
    setTimeout(function () {
          $('#counter').html('👎');
        }, 800);
    setTimeout(function () {
          $('#counter').html('');
        }, 1400);
    setTimeout(function () {
          $('#counter').html('👎');
        }, 2000);
    setTimeout(function () {
          $('#counter').html(counter);
        }, 2600);
  }

  function setSound(color) {
   switch (color) {
     case "button_2":
       sound.src="https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
       break;
     case "button_3":
       sound.src="https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
       break;
     case "button_4":
       sound.src="https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
       break;
     default:
       sound.src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
   }
  }

  function clickedButton(obj) {
     obj.addClass('button-clicked');
     setSound(obj.attr('id'));
     sound.play();
     setTimeout(function () {
          obj.removeClass('button-clicked');
        }, 300);
   }

  function playSeq(i, maxLoops, arr, delay) {
      if (i++ >= maxLoops) return;
      setTimeout(function() {
          clickedButton($('#button_'+(arr[i])));
          console.log(i);
          // call next() recursively
          playSeq(i, maxLoops, arr, delay);
      }, delay);
      if ((i==maxLoops) && (delay==1000)) {unlockConsole();}
  }

  function nextStepAi() {
    ai.seq.push(Math.floor(Math.random()*4+1));
    ai.counter++;
  }

  function reset() {
    player.seq=[];
    player.counter=0;
    ai.seq=[];
    ai.counter=0;
    counter=0;
    $('#end-game-overlay').hide();
    $('.main-container').css("pointer-events", "auto");
    $('#counter').html(counter);
    setTimeout(function () {
          $('#counter').html('');
        }, 200);
    setTimeout(function () {
          $('#counter').html(counter);
        }, 1000);
  }

    function playPlayer(obj) {
    var n=parseInt(obj.replace( /[^\d.]/g, '' ));
    player.seq.push(n);
    clickedButton($('#button_'+n));
    if (validateSeq(player.seq[player.seq.length-1],ai.seq[player.seq.length-1])) {
      player.counter++;
      if (player.counter==ai.counter) {
        counter++;
        player.seq=[];
        player.counter=0;
        $('#counter').html(counter);
        if (counter==20) {
          lockConsole();
          playSeq(-1, winningSong.length-1, winningSong, 350);
          declareWinner();
        } else {
          lockConsole();
          nextStepAi();
          playSeq(-1, ai.seq.length-1, ai.seq, 1000);
        }
      }
    } else {
      wrongAlert()
      if ($('#strict:checkbox:checked').length==1) {
        reset();
        lockConsole();
        setTimeout(function () {
          $('#counter').html('--');
        }, 3000);
      } else {
      lockConsole();
      player.seq=[];
      player.counter=0;
      playSeq(-1, ai.seq.length-1, ai.seq, 1000);
      }
    }
  }


  //Basic code starts here
  lockConsole();
  $(".click-box").click(function(){
    playPlayer($(this).attr('id'));
  });
  $("#start-button,#restart").click(function(){
    reset();
    nextStepAi();
    playSeq(-1, ai.seq.length-1, ai.seq, 1000);
  });
});  
