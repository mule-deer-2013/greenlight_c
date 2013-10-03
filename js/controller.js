globalEvents = {
  logIn:"log-in",
  signUp: "sign-up",
  logOut: "log-out"
}

var Controller = function(baseUrl, authenticator) {
  this.baseUrl = baseUrl
  this.auth = authenticator
  this.initialize()
};

Controller.prototype = {
  initialize: function() {
    var self = this;
    self.showAppropriateNavBar()
    $(document).on('click', '#green-button', function() { self.vote("yes") })
    $(document).on('click', '#red-button', function() { self.vote("no") })
    $(document).on('submit', '#message-form', function(e) { self.sendMessage(e) })
    $(document).on('click', "#signup", function() {
      self.renderForm("#signup-template")
      self.showAppropriateNavBar()
    })
    $(document).on('click', "#signin", function() {
      self.renderForm("#signin-template")
      self.showAppropriateNavBar()
    })
    $(document).on(globalEvents.logIn, function() {
      console.log("i am responding to that event you fired")
      self.getRandomUser()
      self.showAppropriateNavBar()
    })
    $(document).on(globalEvents.signUp, function() {
      console.log("i am responding to that event you fired in signUp")
      self.getRandomUser()
      self.showAppropriateNavBar()
    })
    $(document).on(globalEvents.logOut, function() {
      console.log("i am responding to that event you fired in logOut")
      self.showAppropriateNavBar()
    })

  },
  showAppropriateNavBar:function () {
    if(this.auth.isSignedIn()){
      $('#logout').removeClass("hidden")
      $('#signup').addClass("hidden")
      $('#signin').addClass("hidden")
    }else{
      $('#signup').removeClass("hidden")
      $('#signin').removeClass("hidden")
      $('#logout').addClass("hidden")
    }
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
      console.log('in vote - there is a match');
      self.render("#match-message-template", response.votee);
      }
    else
      {
        console.log('in vote - there is no match');
        self.getRandomUser();
    };
  });
},

  getRandomUser: function() {
    $('.signin-message').toggleClass('hidden')
    window.setTimeout(function() { $(".alert-success").alert('close'); }, 1500);
    console.log("in getRandomUser before ajax call ");

    var self = this;
    var templateSelector = "#profile-template";
    $.ajax({ url: self.baseUrl + '/users/'+ localStorage['currentUser'] })
    .success(function(data) {
      console.log(data);
      getLocation()
      if(data.e) {
        self.renderNoMatch('#no-match-template')
        console.log('we have ran out of matches')
      } else {
        var user = new User(data);
        self.render(templateSelector, user);
      console.log('we still have matches')
        getLocation()
      }
      })
  },

  renderNoMatch: function(templateSelector) {
    var source   = $(templateSelector).html();
    var template = Handlebars.compile(source);
    $('.format_box').remove()
    $('body').append(template);

  },

  render: function(templateSelector, data) {
    var source   = $(templateSelector).html();
    var template = Handlebars.compile(source);
    $('.format_box').remove();
    $('body').append(template(data));

  },
  renderForm: function(templateSelector) {
    var source   = $(templateSelector).html()
    var template = Handlebars.compile(source)
    $('.format_box').remove()
    $('body').append(template)
  },

  sendMessage: function(e) {
    e.preventDefault();
    console.log("in the send message function");
    var messageData = new Object();
    messageData['receiver_id'] = $('.main-message-form').data('id');
    messageData['user_id'] = localStorage['currentUser'];
    messageData['content'] = $('#message-form').serializeArray();
    var templateSelector = "#conversation-template";
    var self = this;
    $.ajax({
      url: self.baseUrl + '/users/create_message',
      type: "POST",
      data: messageData
    })
    .done(function(data) {
      console.log('you have posted a message');
      console.log(data);
      self.renderForm(templateSelector);
      _.each(data, function(messageObject) {
          $('<p>' + messageObject.body + ' -' +'</p>').insertAfter('.message-conversation');
      });
    });
  }
}


 // sendMessage: function(e) {
 //    e.preventDefault();
 //    console.log("in the send message function");
 //    var messageData = new Object();
 //    messageData['receiver_id'] = $('.main-message-form').data('id');
 //    messageData['user_id'] = localStorage['currentUser'];
 //    messageData['content'] = $('#message-form').serializeArray();
 //    var templateSelector = "#conversation-template";
 //    var self = this;
 //    $.ajax({
 //      url: self.baseUrl + '/users/create_message',
 //      type: "POST",
 //      data: messageData
 //    })
 //    .done(function(data) {
 //      console.log('you have posted a message');
 //      console.log(data);
 //      _.each(data, function(messageObject) {
 //        _.each(messageObject.body, function(message){
 //          alert(message)
 //        });
 //      });
 //    });
 //  }



var onSuccess = function(position) {
  var coords = new Object();
  coords['latitude']= position.coords.latitude;
  coords['longitude'] = position.coords.longitude;
  console.log(localStorage['currentUser'] + 'on success in location')
  $.post('http://localhost:3000/users/' +localStorage['currentUser'], coords)
};

function onError(error) {
  alert('please turn on your location settings for greenlight' );
};

function getLocation(){
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
  console.log('getlocation is working')
};


