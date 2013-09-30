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
  Greenlight.init();
})
