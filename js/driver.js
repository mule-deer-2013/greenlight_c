$(document).ready(runApp)

function runApp(){

  var testController = new Controller("http://localhost:3000/")
} 



// //testing, debug helpers!

function autoFillProfile(){
  $($("#profileform").children()[0]).val("asdf")
  $($("#profileform").children()[2]).val("asdf@asdf.com")
  $($("#profileform").children()[4]).val("asdfasdf")

}
