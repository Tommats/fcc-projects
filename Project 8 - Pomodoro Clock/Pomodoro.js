var seconds=0;
var minuets=25;
var breakTime=1;
var sessionTime=25;
var status="";
var flag = "session";
var time="00:00";
var interval = null;

function changeFlag(){
  if (flag=="session") {
    $("#timer-flag").removeClass("red");
    $("#timer-flag").html("Session &#8594;");
  } else {
    $("#timer-flag").addClass("red");
    $("#timer-flag").html("Break! &#9995;");
  }
}

function toggleFlag () {
  if (flag=="session") {
    minuets=breakTime-1;
    flag="break";
  } else {
    minuets=sessionTime-1;
    flag="session";
  }
  changeFlag();
}

function settingsUpdate (id) {
  switch (id) {
    case "addbreak":
      breakTime++;
      break;
    case "reducebreak":
      if (breakTime>1) {
        breakTime--;
      }
      break;
    case "addsession":
      sessionTime++;
      break;
    case "reducesession":
      if (sessionTime>1) {
        sessionTime--;
      }
      break;
  }
  minuets=sessionTime;
  seconds=0;
  $("#timer-flag").html("&nbsp;");
  flag = "session";
  $("#break-time").html(breakTime);
  $("#session-time").html(sessionTime);
  $("#timer-numbers").html(sessionTime);
}

function formatTimeZeros (num){
  if (num<10) {
    return "0"+num;
  } else {
    return num;
  }
}
function changeTimer () {
  if (seconds==0 && minuets==0) {
    toggleFlag();
    seconds=60;
  } else if (seconds==0) {
    minuets--;
    seconds=60;
  }
  seconds--;
  time=formatTimeZeros(minuets)+":"+formatTimeZeros(seconds);
  $("#timer-numbers").html(time);
}

$(document).ready(function() {
  $("#play").click(function() {
    if (status!="play") {
      changeFlag();
      interval=setInterval(changeTimer, 1000);
    }
  });
  $("#pause").click(function() {
    clearInterval(interval);
  });
  $("#reset").click(function() {
    clearInterval(interval);
    minuets=sessionTime;
    seconds=0;
    $("#timer-numbers").html(sessionTime);
    $("#timer-flag").html("&nbsp;");
  });
  $('.icon').click(function() {
    status=$(this).attr('id');
  });
  $('.set-button').click(function() {
    if (status!='play') {
      settingsUpdate($(this).attr('id'));
    }
  });
});  
