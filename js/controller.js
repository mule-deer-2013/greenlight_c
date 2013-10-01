var Controller = function(baseUrl) {
  this.baseUrl = baseUrl;

  this.initialize();
};

Controller.prototype = {
  initialize: function() {
    var self = this;
    $(document).on('click', '#green-button', function() { self.vote("yes") });
    $(document).on('click', '#red-button', function() { self.vote("no") });
    $(document).on('submit', "#profileform", function() { self.signup() });
    $(document).on('submit', '#signinform', function() { self.signin() });
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

  signup: function() {
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

  signin: function(e) {
    e.preventDefault();
    var self = this;
    var postData = new formData();
    $.ajax({
      url: this.baseUrl + '/sessions',
      type: "POST",
      data: postData
    })
    .done(function(data){
      localStorage['currentUser'] = data.id
      $('.signinform').toggle();
      self.getRandomUser();
    })
  }

  render: function(templateSelector, data) {
    var source   = $(templateSelector).html();
    var template = Handlebars.compile(source);
    $('body').html(template(data));
  }
}
