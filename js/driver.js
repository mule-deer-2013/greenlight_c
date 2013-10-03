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
    $($("#profileform").children()[0]).val("asdf"+new Date().getTime())
    $($("#profileform").children()[2]).val("asdf"+new Date().getTime()+"@asdf.com")
    $($("#profileform").children()[4]).val("123")
    var my_tagline = ["You wanna be on this", "Buff hockey player, just lookin for love", "Can you shave my balls?", "Can you sniff my balls?", "I love teabagging", "tit smash", "I just want to get married so I can have babies!!!!!! I swear I'm like totally cool and fun!!!!", "Butterface"]
    $($("#profileform").children()[19]).val(_.sample(my_tagline))
    var my_age = ["18", "19", "20", "21"]
    $($("#profileform").find('select')[0]).val(_.sample(my_age))
    var gender = Math.round(Math.random())
    $($("#profileform").find('input[name="sex"]')[gender]).prop("checked", true)
    var pref = Math.round(Math.random())
    $($("#profileform").find('input[name="sex_preference"]')[pref]).prop("checked", true)
  }

})