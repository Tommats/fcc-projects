$(document).ready(function() {
  var users = ["ESL_SC2", "cretetion", "freecodecamp", "thijshs", "habathcx", "RobotCaleb", "noobs2ninjas", "salz0r_tv"];
  for (var i=0; i<users.length; i++) {
    var d1 = $.getJSON("https://wind-bow.glitch.me/twitch-api/users/"+users[i]);
    var d2 = $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/"+users[i]);
    var d3 = $.getJSON("https://wind-bow.glitch.me/twitch-api/channels/"+users[i]);
    $.when( d1, d2, d3).done(function (users,streams,channels) {
      var icon = 'https://image.flaticon.com/icons/svg/8/8607.svg';
      var status='';
      var html= '<a href="https://go.twitch.tv/'+users[0].name+'" target="_blank"><div class="row offline pt-3 pb-3">';
      if ((streams[0].stream!=null) && (streams[0].stream!=undefined)) {
        icon = 'https://image.flaticon.com/icons/svg/448/448511.svg';
        var input = streams[0].stream.channel.status;
        if (input.length>23) {
          input=input.slice(0,20);
          input+="...";
          html='<a href="https://go.twitch.tv/'+users[0].name+'" target="_blank"><div class="row online pt-3 pb-3">';
        }
        status ='<br><span class="text-muted">'+input+'</span>';
      }
      html+='<div class="col-3 text-center"><img src="'+users[0].logo+'" class="usericon"></div><div class="col-6 text-left">'+channels[0].display_name+status+'</div><div class="col-3 statusalignment"><img src="'+icon+'" class="statusicon"></div></div></a>';
        $("#userslist").append(html);
    });
  }
});
