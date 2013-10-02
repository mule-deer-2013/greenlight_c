describe("authentication controller", function() {
  var auth

  beforeEach(function() {
    BASEURL = "http://localhost:3000"
    auth = new AuthenticationController(BASEURL)
    auth.clear()
  })

  describe("authentication awareness", function(){
    it("can set the current user", function(){
      var user = auth.setCurrentUser("bob")
    })

    it("should be able to get user after setting it", function() {
      auth.setCurrentUser("bob")
      var user = auth.getCurrentUser()
      expect(user).toEqual("bob")
    })
  })

  describe("signing in", function(){
    var e
    beforeEach(function(){
      e = {
        preventDefault:function(){},
      }
      spyOn(e, "preventDefault")
    })

    it("prevents default", function(){
      auth.signin(e)
      expect(e.preventDefault).toHaveBeenCalled()
    })

    it("makes ajax call with params we build", function(){
      var signinRequestObject = { pants:"jacket" }
      spyOn(auth, "buildSigninRequestObject").andReturn(signinRequestObject)
      spyOn($, "ajax").andReturn({
        success:function(){},
        fail:function(){}
      })

      auth.signin(e)
      expect($.ajax.mostRecentCall.args[0]).toEqual(signinRequestObject)
    })

    describe("on ajax success", function(){
      it("we set the user", function(){
        spyOn(auth, "setCurrentUser")
        spyOn($, "ajax").andReturn({
          success:function(callback){
            callback({id:4})
          },
          fail:function(){}
        })
        auth.signin(e)
        expect(auth.setCurrentUser).toHaveBeenCalled()
      })
      "toggle away the form"
      "fire 'logged-in' event" //note: other controller needs to add a listener for 'logged-in' events that loads random user
    })

    "on ajax fail, maybe we display some message and don't toggle the form"
      'console log for now'


    it("should set the user", function(){
      auth.signin(e)
      // expect(auth.getCurrentUser()).toEqual(jasmine.any(Number))
    })
  })

  describe("dont fuck with this", function(){
    describe("seriously", function(){
      it("the params we build match the routes for signin", function(){
        var serializedFormData = "doesnt really matter, just what jquery('form').serialize() would have returned"
        spyOn(auth, "getForm").andReturn(serializedFormData)

        signinObj = auth.buildSigninRequestObject()

        // this is the current output of `rake routes`:`
        // POST     /sessions(.:format)     sessions#create
        expect(signinObj.url).toEqual(BASEURL+'/sessions')
        expect(signinObj.type).toEqual("POST")
        expect(signinObj.data).toEqual(serializedFormData)
      })
    })
  })
})