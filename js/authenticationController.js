var AuthenticationController = function(baseUrl){
  this.baseUrl = baseUrl
  this.initialize()
}

AuthenticationController.prototype = {
  initialize: function() {
    var self = this;
    $(document).on('submit', "#profileform", function(e) { self.signup(e) });
    $(document).on('submit', "#signin-form", function(e) { self.signin(e) });
    $(document).on('click', '.btn-danger', function(e) { self.logout(e) })
    $(document).on('click', "#signup", function() { self.renderForm("#signup-template") });
    $(document).on('click', '#signin', function() { self.renderForm("#signin-template") });
  },

  setCurrentUser:function(current_user){
    localStorage['currentUser'] = current_user
  },

  getCurrentUser:function(){
    return localStorage['currentUser']
  },

  signin: function(e) {
    e.preventDefault();
    var self = this;
    $.ajax({
      url: self.baseUrl + 'sessions',
      type: "POST",
      data: $('form').serialize()
    })
    .done(function(data){
      setCurrentUser(data.id)
      $('.signinform').toggle();
        self.getRandomUser();
    })
  },

  signup: function(e) {
    e.preventDefault();
    var self = this;
    var postData = new FormData($('form')[0]);
    $.ajax({
      // shouldn't "this" be "self" instead?
      url: this.baseUrl + '/users',
      type: "POST",
      data: postData,
      cache: false,
      contentType: false,
      processData: false
    })
    .done(function(data) {
      setCurrentUser(data.id)
      $('.signupform').toggle();

      self.getRandomUser();
    })
    .fail(function(){
      console.log("FUCK!");
    })
  },

  logout: function(e) {
    e.preventDefault();
    var self = this;
    $.ajax({
      url: self.baseUrl + 'sessions/' + getCurrentUser(),
      type: "POST"
    })
    .done(function(){
      localStorage.clear()
    })
  }
}