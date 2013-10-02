describe("authentication controller", function() {
  var auth;

  beforeEach(function() {
    auth = new AuthenticationController("http://localhost:3001/")
  });

  describe("authentication awareness", function(){
    it("can set the current user", function(){
      var user = auth.setCurrentUser("bob")
    })

    it("should be able to get user after setting it", function() {
      auth.setCurrentUser("bob")
      var user = auth.getCurrentUser()
      expect(user).toEqual("bob")
    })
  });
 });