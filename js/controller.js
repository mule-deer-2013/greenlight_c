globalEvents = {
  logIn:"log-in",
  signUp: "sign-up"
}

var Controller = function(baseUrl, authenticator) {
  this.baseUrl = baseUrl
  this.auth = authenticator
  this.initialize()
};

Controller.prototype = {
  initialize: function() {
    var self = this;
    $(document).on('click', '#green-button', function() { self.vote("yes") })
    $(document).on('click', '#red-button', function() { self.vote("no") })
    $(document).on('click', "#signup", function() { self.renderForm("#signup-template") })
    $(document).on('click', "#signin", function() { self.renderForm("#signin-template") })
    $(document).on('submit', '#message-form', function(e) { self.sendMessage(e) })
    $(document).on(globalEvents.logIn, function() {
      console.log("i am responding to that event you fired")
      self.getRandomUser()
    })
    $(document).on(globalEvents.signUp, function() {
      console.log("i am responding to that event you fired in signUp")
      self.getRandomUser()
    })

  },

  vote: function(opinion) {
    console.log('top of vote');
    var self = this;
    var vote = new Object();
    vote['voted_on_id'] = $('.user').data('id');
    vote['voter_id'] = self.auth.getCurrentUser();
    vote['opinion'] = opinion;
    $.post(this.baseUrl + '/votes', vote)
    .done(function(response) {
      // ignore the response, show the next user
      console.log(response);
      console.log('in the vote function');
       if (response.status === "yes")
      {
      console.log('you win');
      self.render("#match-message-template", response.votee);
      }
    else
      {
        console.log('sorry try again');
        self.getRandomUser();
    };
  });
},

  getRandomUser: function() {
    $('.signin-message').toggleClass('hidden')
    window.setTimeout(function() { $(".alert-success").alert('close'); }, 1500);
    console.log("in getRandomUser ");

    var self = this;
    var templateSelector = "#profile-template";
    $.ajax({ url: self.baseUrl + '/users/'+ localStorage['currentUser'] })
    .success(function(data) {
      console.log(data);
      var user = new User(data);
      self.render(templateSelector, user);
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
    $('.format_box').hide()
    $('body').append(template(data));

  },

  renderForm: function(templateSelector) {
    var source   = $(templateSelector).html()
    var template = Handlebars.compile(source)
    $('.format_box').hide()
    $('body').append(template)
  }, 

  sendMessage: function(e) {
    e.preventDefault();
    console.log("in the send message function");
    var messageData = new Object();
    messageData['receiver_id'] = $('.main-message-form').data('id');
    messageData['user_id'] = localStorage['currentUser'];
    messageData['content'] = $('#message-form').serializeArray();
    var templateSelector = "#message-inbox-template";
    var self = this;
    $.ajax({
      url: self.baseUrl + '/users/create_message',
      type: "POST",
      data: messageData
    })
    .done(function(data) {
      console.log('you have posted a message');
      console.log(data);
      self.render
      // self.render(templateSelector, data);
      // $('#greenbutton').on('click', voteOnProfile);
    });
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
};

function getLocation(){
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
};


