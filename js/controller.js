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
    var self = this;
    var vote = new Object();
    vote['voted_on_id'] = $('.user').data('id');
    vote['voter_id'] = self.auth.getCurrentUser();
    vote['opinion'] = opinion;
    $.post(this.baseUrl + '/votes', vote)
    .done(function(response) {
      // ignore the response, show the next user
      self.getRandomUser();
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
      if(data.error) {
        self.renderNoMatch('#no-match-template')
      } else {
        var user = new User(data);
        self.render(templateSelector, user);
        getLocation()
      }
    });
  },

  renderNoMatch: function(templateSelector) {
    var source   = $(templateSelector).html();
    var template = Handlebars.compile(source);
    $('.format_box').remove()
    $('#main').append(template);

  },

  render: function(templateSelector, data) {
    var source   = $(templateSelector).html();
    var template = Handlebars.compile(source);
    $('.format_box').remove();
    $('#main').append(template(data));

  },
  renderForm: function(templateSelector) {
    var source   = $(templateSelector).html()
    var template = Handlebars.compile(source)
    $('.format_box').remove()
    $('#main').append(template)
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
  //alert('please turn on your location settings for greenlight' );
};

function getLocation(){
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
};


