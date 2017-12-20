function buitfySecondScreen (str) {
   if (str.length>43) {
     str=str.slice(0,40);
     str+="...";
   }
  return str;
}
function calc(sum, arg, x) {
  switch (arg) {
    case "÷":
      return Math.round(10000000000 * (sum/x)) / 10000000000;
    case "+":
      return Math.round(10000000000 * (sum+x)) / 10000000000;
    case "-":
      return Math.round(10000000000 * (sum-x)) / 10000000000;
    case "X":
      return Math.round(10000000000 * (sum*x)) / 10000000000;
    default:
      return x;
  }
}
function pointInput (x) {
  if (x.indexOf(".")==-1) {
    return x+".";
  } else {
    return x;
  }
}
function numberWithCommas (x) {
  if (x>99999999999) {
    return "ERROR - Too big number";
  } else if (x.indexOf('.') > -1) {
    var y=x.slice(0,x.indexOf('.'));
    x=x.slice(x.indexOf('.'),x.length).toString();
    return y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+x;
  } else {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
$(document).ready(function() {
  var currentLine="";
  var secondLine="";
  var sum=0;
  var lastArg="";
  $("button").click(function(){
    if ($(this).hasClass("number")) {
      if ($(this).val()=="."){
        currentLine=pointInput(currentLine);
      } else if (currentLine=="0") {
        currentLine=$(this).val();
      } else { currentLine+=$(this).val(); }
        $(".main-numbers").html(numberWithCommas(currentLine));
      }
    if ($(this).hasClass("zeroing")) {
      currentLine="0";
      if($(this).val()=="AC") {
      secondLine="&nbsp;";
      sum=0;
      }
      $(".main-numbers").html(numberWithCommas(currentLine));
      $(".secondary-numbers").html(buitfySecondScreen(secondLine));
    }
    if ($(this).hasClass("action")) {
      if (sum==0) {
        sum=parseFloat(currentLine);
      } else {
        sum=calc(sum,lastArg,parseFloat(currentLine));
      }
      secondLine+=currentLine+$(this).val();
      currentLine=0;
      lastArg=$(this).val();
      $(".secondary-numbers").html(buitfySecondScreen(secondLine));
      $(".main-numbers").html("&nbsp;");
    }
    if ($(this).is("#equals")) {
      $(".main-numbers").html(numberWithCommas(sum.toString()));
      $(".secondary-numbers").html(buitfySecondScreen(secondLine));
      secondLine="&nbsp;";
      currentLine=sum;
    }
  });
});  
