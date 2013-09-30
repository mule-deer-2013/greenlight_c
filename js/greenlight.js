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
