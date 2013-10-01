var Greenlight = {
  init: function() {
      $.ajax({
      url: 'http://localhost:3000/',
      success: function(data) {
        var source   = $("#entry-template").html();
        var template = Handlebars.compile(source);
        $('body').append(template({body: data.hey}));
      }
    })
  }
}

$(document).ready(function(){
  $('#signup').on("click", signup);
  $("#profileform").on("submit", function(){

  });

});


var signup = function() {
  $('#signup').toggle();
  var source   = $("#signup-template").html();
  var template = Handlebars.compile(source);
  $('body').append(template);
  $("#profileform").on("submit", createUser);
};


var createUser = function(e) {

  e.preventDefault();
  console.log("I'm in the submit function");
  var postData = $(this).serialize();
  $.ajax({
    url: 'http://localhost:3000/users',
    type: "POST",
    data: postData,
    success: function(data){
    localStorage.setItem('flo')
    showUsers()
    }
  });
};

 var showUsers = function() {

  $.ajax({
    url: 'http://localhost:3000/users',
    success: function(data) {
      var source   = $("#profile-template").html();
      var template = Handlebars.compile(source);
      $('body').html(template({name: data.name, id: data.id}));
      $('#greenbutton').on('click', voteOnProfile);
    }
  });
};

var voteOnProfile = function() {
  var profileID = $('.body').data('id');
  console.log(profileID);
  $.ajax({
    url: 'http://localhost:3000/votes',
    type: "POST",
    data: profileID,
    success: function() {
      showUser()
    }
  })
}





