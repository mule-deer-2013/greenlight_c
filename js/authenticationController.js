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
    console.log(current_user)
    localStorage['currentUser'] = current_user
  },

  getCurrentUser:function(){
    return localStorage['currentUser']
  },
  isSignedIn:function(){
    var self = this
    return (self.getCurrentUser() != undefined)
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
    .fail(function(xhr) {
      alert(xhr.responseJSON.error);
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
      url: this.baseUrl + '/users',
      type: "POST",
      data: postData,
      cache: false,
      contentType: false,
      processData: false
    })
    .done(function(data) {
      console.log(data.id)
      self.setCurrentUser(data.id)
      $('.signupform').toggle()
      $(document).trigger(globalEvents.signUp)
    })
    .fail(function(){

      console.log("Authentication failed on signup")
    })
  },

  logout: function(e) {
    e.preventDefault()
    var self = this
    $.ajax({
      url: self.baseUrl + '/sessions/' + self.getCurrentUser(),
      type: "POST"
    })
    .done(function(){
      localStorage.clear()
      $('.format_box').hide()
      $('.logout-message').toggleClass('hidden')
      $(document).trigger(globalEvents.logOut)
      window.setTimeout(function() { $(".alert-danger").alert('close'); }, 1500);
    })
  }
}
