// we're not doing anything with this ajax call right now

// var Showprofile = {
//   init: function() {
//     console.log("im in the showprofile function");
//     $.ajax({
//       url: 'http://localhost:3000/users/1', //hard coded; need to fix
//       type: "GET",
//       success: function(data) {
//         console.log(data);
//         var source = $("#entry-template").html();
//         var template = Handlebars.compile(source);
//         $('body').append(template({
//           name: data.user.name,
//           age: data.user.age,
//           sex: data.user.sex,
//           sex_preference: data.user.sex_preference,
//           photo: data.user.photo
//         })
//         );
//       }
//     })
//   }
// }
// //


// ("#signup").on('click', funsuction() {
//   var source   = $("#signup-template").html();
//   var template = Handlebars.compile(source);
//   $('body').append(template)
//   $("#profileform").on("submit", createUser);
// });

// // };
// var signup = function() {
//   $('#signup').toggle();
//   var source   = $("#signup-template").html();
//   var template = Handlebars.compile(source);
//   $('body').append(template);
//   $("#profileform").on("submit", createUser);

// };


// var createUser = function(e) {

//   e.preventDefault();
//   console.log("I'm in the submit function");
//   var postData = new FormData($('form')[0]);
//   $.ajax({
//     url: 'http://localhost:3000/users',
//     type: "POST",
//     data: postData,
//       //Options to tell JQuery not to process data or worry about content-type
//       cache: false,
//       contentType: false,
//       processData: false,
//       success: function(data){
//         console.log(data);
//         $('.signupform').toggle();
//         $('#start_looking').on('click',showUsers());
//         localStorage['currentUser']= data.id
//       }
//     })

// };

// var showUsers = function() {
//   $.ajax({url: 'http://localhost:3000/users'})
//   .done(function(data) {
//     var source   = $("#profile-template").html();
//     var template = Handlebars.compile(source);
//     //photo is coming back undefined here
//     console.log(data);
//     $('body').html(template({name: data.user.name, age: data.user.age, tagline: data.user.tagline, photo: data.photo, id: data.user.id}));
//     $('#greenbutton').on('click', voteOnProfile);
//     //getLocation()
//   })
//   .fail(function() {
//     console.log("FUck you Jeffrey");
//   });
// };

// var voteOnProfile = function() {
//   var idsHash = new Object();
//   idsHash['voted_on_id'] = $('.body').data('id');
//   idsHash['voter_id'] = localStorage['currentUser'];
//   idsHash['opinion'] = "yes";
//   $.ajax({
//     url: 'http://localhost:3000/votes',
//     type: "POST",
//     dataType: "JSON",
//     data: idsHash,
//     success: function(data) {
//       console.log(data);
//       showUsers();
//     }
//   })
// }

// // var getLocation = function() {
// //   if (geo_position_js.init()) {
// //     geo_Position_js.getCurrentPosition(geoSuccess, geoError);
// //   }
// //   else{
// //     alert("Functionality not available")
// //   }

// //   function geoSuccess(p) {
// //     var latitude = p.coords.latitude
// //     var longtitude = p.coords.longtitude
// //     alert(latitude)
// //   }

// //   function geoError(){
// //     alert('please allow access to your location')
// //   }
// // }




