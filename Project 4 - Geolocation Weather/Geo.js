function tempMetrics (type, temp) {
  if (type=='C') {
    return Math.round(temp)
  } else {
    return Math.round(temp*1.8+32);
  }
}
$(document).ready(function() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
      $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat="+position.coords.latitude+"&lon="+position.coords.longitude, function(json) {
        $("#location-names").html("<h3>"+json.name+", <small>"+json.sys.country+"</small></h3>");
        $("#temp").html("<h1><strong>"+Math.round(json.main.temp)+" °C</strong></h1>");
        $("#weathericon").attr("src",""+json.weather[0].icon+"");
        $("#weatherdesc").html(json.weather[0].description);
        $("#ctemp").on("click", function() {
          $("#temp").html("<h1><strong>"+tempMetrics("C",json.main.temp)+" °C</strong></h1>");
        });
        $("#ftemp").on("click", function() {
          $("#temp").html("<h1><strong>"+tempMetrics("F",json.main.temp)+" °F</strong></h1>");
        });
      }
      );
    });
  } else {
    $("#location-names").html("<h1>Can't load your location details,  please check your connection</h1>");
  }
});
