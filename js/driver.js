$(document).ready(runApp)

function runApp(){

  console.log('hi, runapp')
  var serverBase = "http://localhost:3000"

  // var
   auth = new AuthenticationController(serverBase)
  var testController = new Controller(serverBase, auth)
}



// //testing, debug helpers!
$(document).on("keydown", function(e){
  if(e.keyCode == 220){ //press "\" if you want to autofill
    $($("#profileform").children()[0]).val("asdf")
    $($("#profileform").children()[2]).val("asdf@asdf.com")
    $($("#profileform").children()[4]).val("asdfasdf")
  }
})
