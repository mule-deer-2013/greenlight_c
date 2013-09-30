var Greenlight = {
  init: function() {
      $.ajax({
      url: 'http://localhost:3000/',
      success: function(data) {
        var source   = $("#entry-template").html();
        var template = Handlebars.compile(source);
        $('body').append(template({body: data}));
      }
    })
  }
}

<<<<<<< HEAD
var Showprofile = {
  init: function() {
    $.ajax({
      url: 'http://localhost:3000/users/1',
      type: "GET",
      success: function(data) {
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);
        $('body').append(template({
          name: data.user.name, 
          age: data.user.age,
          sex: data.user.sex, 
          sex_preference: data.user.sex_preference 
          })
        );
      }
    })
  }
}


$(document).ready(function(){
  //Greenlight.init();
  Showprofile.init();
})
=======





$(document).ready(function(){
  $('#signup').on("click", signup);
  $("#profileform").on("submit", function(){
    console.log("clicked submit");
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
        console.log(data)
      }
    })

};


>>>>>>> 9ca2bde542a136565596923c124f63a5c47f5587
