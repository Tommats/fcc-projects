$(document).ready(function() {
  $("#getMessage").on("click", function() {
    $.getJSON("https://api.myjson.com/bins/or807", function(json) {
      var quoteContent="";
      var quoteAuthor="";
      var i = Math.floor((Math.random() * json.length));
        quoteContent+="<h5>"+json[i].quoteText+"</h5>";
        quoteAuthor+="<h5><em>– "+json[i].quoteAuthor+"</em></h5>";
        $("#tweet").attr("href", "https://twitter.com/intent/tweet?text="+json[i].quoteText+"%20%20@"+json[i].quoteAuthor);
        $("#mail").attr("href", "mailto:?subject=Interesting%20Quote&body="+json[i].quoteText+"%20%20@"+json[i].quoteAuthor);
        $(".content").animate({
            opacity: 0
          }, 500,
          function() {
            $(this).html(quoteContent);
            $(this).animate({
              opacity: 1
            }, 500);
          });
          $(".author").animate({
            opacity: 0
          }, 500,
          function() {
            $(this).html(quoteAuthor);
            $(this).animate({
              opacity: 1
            }, 500);
          });
      });
    });
});
