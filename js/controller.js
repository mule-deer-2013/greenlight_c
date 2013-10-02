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
    console.log("in getRandomUser ");
    var self = this;
    var templateSelector = "#profile-template";
    $.ajax({ url: self.baseUrl + '/users/'+ localStorage['currentUser'] })
    .done(function(data) {
      console.log(data);
      var user = new User(data);
      self.render(templateSelector, user);
      // $('#greenbutton').on('click', voteOnProfile); 
      //getLocation()
    })
    .fail(function(data) {
      console.log (data);
      console.log('something failed');
      var templateSelector = "#no-match-template";
      var noMatch = new Object();
      noMatch['message'] = 'Currently, there are no matches. Please try again later.'
      self.render(templateSelector, noMatch);
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

  
}
