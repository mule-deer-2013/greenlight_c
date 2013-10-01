// we're not doing anything with this ajax call right now

var Showprofile = {
  init: function() {
    console.log("im in the showprofile function");
    $.ajax({
      url: 'http://localhost:3000/users/1', //hard coded; need to fix
      type: "GET",
      success: function(data) {
        console.log(data);
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);
        $('body').append(template({
          name: data.user.name, 
          age: data.user.age,
          sex: data.user.sex, 
          sex_preference: data.user.sex_preference,
          photo: data.user.photo 
          })
        );
      }
    })
  }
}
//

$(document).ready(function(){
  $('#signup').on("click", signup);
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
    var postData = new FormData($('form')[0]);
    $.ajax({
      url: 'http://localhost:3000/users',
      type: "POST",
      data: postData,
      //Options to tell JQuery not to process data or worry about content-type
      cache: false,
      contentType: false,
      processData: false,
      success: function(data){
        console.log(data);
        $('.signupform').toggle();
        Showprofile.init();
         $('#start_looking').on('click',showUsers());
      }
    })

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
  var votedOnId = new Object();
  votedOnId['id'] = $('.body').data('id');
  console.log(votedOnId);
  $.ajax({
    url: 'http://localhost:3000/votes',
    type: "POST",
    dataType: "JSON",
    data: votedOnId,
    success: function() {
      showUsers()
    }
  })
}

