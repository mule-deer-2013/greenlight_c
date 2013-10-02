describe("Controller", function() {
  var controller;

  beforeEach(function() {
    controller = new Controller("http://localhost:3001/")
  });

  describe("authentication awareness", function(){
    it("can set the current user", function(){
      var user = controller.setCurrentUser("bob")
    })

    it("should be able to get user after setting it", function() {
      controller.setCurrentUser("bob")
      var user = controller.getCurrentUser()
      expect(user).toEqual("bob")
    })
  });
 });