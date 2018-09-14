
document.addEventListener('deviceready', function(){
  // navigator.tts.speak('Welcome to my awesome app');
  // navigator.speechRecognition.requestPermission(function (){
  //   alert('requesting');
  // }, function (err){
  //     alert(err);
  // });
//   function alertDismissed() {
// // do something
//   }
//
//   navigator.notification.alert(
//       'You are the winner!',  // message
//       alertDismissed,         // callback
//       'Game Over',            // title
//       'Done'                  // buttonName
//   );

  // $('#searchForm').submit(function(){
  //   alert('submit');
  // });

}, false);

function search(){
  let url = document.getElementById('searchIn').value;
  $.ajax('https://jsonplaceholder.typicode.com/todos/1', {
    success: function(data){
      alert(data.id);
    }
  });
  return false;
}
