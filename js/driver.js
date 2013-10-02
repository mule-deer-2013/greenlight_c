$(document).ready(runApp)

function runApp(){

  console.log('hi, runapp')
  var serverBase = "http://localhost:3000"
  globalEvents = {
    logIn:"log-in",
    signUp: "sign-up"
  }
  // var
   auth = new AuthenticationController(serverBase)
  var testController = new Controller(serverBase, auth)
}




// //testing, debug helpers!

function autoFillProfile(){
  $($("#profileform").children()[0]).val("asdf")
  $($("#profileform").children()[2]).val("asdf@asdf.com")
  $($("#profileform").children()[4]).val("asdfasdf")

}
