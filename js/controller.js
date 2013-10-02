var Controller = function(baseUrl, authenticator) {
  this.baseUrl = baseUrl
  this.auth = authenticator
  this.initialize()
};

Controller.prototype = {
  initialize: function() {
    var self = this;
    $(document).on('click', '#green-button', function() { self.vote("yes") });
    $(document).on('click', '#red-button', function() { self.vote("no") });
    $(document).on('click', "#signup", function() { self.renderForm("#signup-template") })
    $(document).on('click', '#signin', function() { self.renderForm("#signin-template") })
    $(document).on(globalEvents.logIn, function(){
      console.log("i am responding to that event you fired")
      self.getRandomUser()
    })

  },

  vote: function(opinion) {
    var self = this;
    var vote = new Object();
    vote['voted_on_id'] = $('.user').data('id');
    vote['voter_id'] = self.auth.getCurrentUser();
    vote['opinion'] = opinion;
    $.post(this.baseUrl + 'votes', vote)
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
      getLocation()
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



var onSuccess = function(position) {
  var coords = new Object();
  coords['latitude']= position.coords.latitude;
  coords['longitude'] = position.coords.longitude;
  console.log(localStorage['currentUser'])
  $.post('http://localhost:3000/users/' +localStorage['currentUser'], coords)
};

function onError(error) {
  // alert('please turn on your location settings for greenlight' );
}

function getLocation(){
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
}


