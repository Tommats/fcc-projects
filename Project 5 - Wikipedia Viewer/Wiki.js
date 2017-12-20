$(document).ready(function() {
 $('#searchbox').on('input',function(){
 $.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+$('#searchbox').val()+"&origin=*")
    .done(function( json ) {
      var array = $.map(json.query.pages, function(value, index) {
      return [value];
      });
      var html="";
      for (var i=0; i<array.length; i++) {
        html+='<div class="col-12 resultbox "><a href="https://en.wikipedia.org/?curid='+array[i].pageid+'" target="_blank"><h3 class="text-primary">'+array[i].title+'</h3><p>'+array[i].extract+'</p></a></div>';
      }
      $("#results").html(html);
   })
    .fail(function() {
      alert( "Wikipedia API Connection Failed" );
  });
  });
  $("#searchbox").click(function () {
   $("#searchbox").css("width", "80%");
  });
      // ===== Scroll to Top ====
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200);    // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200);   // Else fade out the arrow
        }
    });
    $('#return-to-top').click(function() {      // When arrow is clicked
        $('body,html').animate({
            scrollTop : 0                       // Scroll to top of body
        }, 500);
    });
});
