var AuthenticationController = function(baseUrl){
  this.baseUrl = baseUrl
  this.initialize()
}

AuthenticationController.prototype = {
  initialize: function() {
    var self = this
    $(document).on('submit', "#profileform", function(e) { self.signup(e) })
    $(document).on('submit', "#signin-form", function(e) { self.signin(e) })
    $(document).on('click', '.btn-danger', function(e) { self.logout(e) })
  },
  clear:function(){
    localStorage.clear()
  },
  setCurrentUser:function(current_user){
    localStorage['currentUser'] = current_user
  },

  getCurrentUser:function(){
    return localStorage['currentUser']
  },

  signin: function(e) {
    e.preventDefault()
    var self = this
    $.ajax(self.buildSigninRequestObject())
    .success(function(data){
      self.setCurrentUser(data.id)
      $('.signinform').toggle()
      $(document).trigger(globalEvents.logIn)
    })
  },
  buildSigninRequestObject:function(){
    var self = this
    return {
      url: self.baseUrl + '/sessions',
      type: "POST",
      data: self.getForm()
    }
  },
  getForm:function(){
    return $('form').serialize()
  },
  signup: function(e) {
    e.preventDefault()
    var self = this
    var postData = new FormData($('form')[0])
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
      self.setCurrentUser(data.id)
      $('.signupform').toggle()
      $(document).trigger(globalEvents.signUp)
    })
    .fail(function(){
      console.log("FUCK!")
    })
  },

  logout: function(e) {
    e.preventDefault()
    var self = this
    $.ajax({
      url: self.baseUrl + '/sessions/' + getCurrentUser(),
      type: "POST"
    })
    .done(function(){
      localStorage.clear()
    })
  }
}