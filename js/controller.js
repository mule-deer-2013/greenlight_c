var Controller = function(baseUrl) {
  this.baseUrl = baseUrl;
  this.initialize();
};

Controller.prototype = {
  initialize: function() {
    var self = this;
    $(document).on('click', '#green-button', function() { self.vote("yes") });
    $(document).on('click', '#red-button', function() { self.vote("no") });
    $(document).on('submit', "#profileform", function(e) { self.signup(e) });
    $(document).on('click', "#signup", function() { self.renderForm("#signup-template") });
  },

  vote: function(opinion) {
    var self = this;
    var vote = new Object();
    vote['voted_on_id'] = $('.user').data('id');
    vote['voter_id'] = localStorage['currentUser'];
    vote['opinion'] = opinion;
    $.post(this.baseUrl + '/votes', vote)
    .done(function(response) {
      // ignore the response, show the next user
      self.getRandomUser();
    });
  },

  getRandomUser: function() {
    var self = this;
    var templateSelector = "#profile-template";
    $.ajax({url: self.baseUrl + '/users/random'})
    .done(function(data) {
      var user = new User(data);
      self.render(templateSelector, user);
      // $('#greenbutton').on('click', voteOnProfile); 
      //getLocation()
    });
  },

  signup: function(e) {
    e.preventDefault();
    var postData = new FormData($('form')[0]);
    $.ajax({
      url: this.baseUrl + '/users',
      type: "POST",
      data: postData,
      cache: false,
      contentType: false,
      processData: false
    })
    .done(function(data) {
      localStorage['currentUser']= data.id 
      $('.signupform').toggle();
      self.getRandomUser();
    });
  },

  render: function(templateSelector, data) {
    var source   = $(templateSelector).html();
    var template = Handlebars.compile(source);
    $('body').html(template(data));
  },


  renderForm: function(templateSelector) {
    var source   = $(templateSelector).html();
    var template = Handlebars.compile(source);
    $('body').html(template);
  }



}




// var renderForm = function(templateSelector) {
//     var source   = $(templateSelector).html();
//     var template = Handlebars.compile(source);
//     $('body').html(template);
//   };
// // $(function() {
//   var controller = new Controller('http://localhost:3000');
//   if (localStorage['currentUser']) {
//     controller.getRandomUser();
//   } else {
//     var source   = $("#signup-template").html();
//     var template = Handlebars.compile(source);
//     $('body').append(template(data));
//   }
// });

