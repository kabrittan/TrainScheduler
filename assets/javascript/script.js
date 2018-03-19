// Initialize Firebase
var config = {
  apiKey: "AIzaSyDCX0WpZtkhUZ0X64fi6ZJXObZGtzCpAC8",
  authDomain: "trainscheduler-53eda.firebaseapp.com",
  databaseURL: "https://trainscheduler-53eda.firebaseio.com",
  projectId: "trainscheduler-53eda",
  storageBucket: "trainscheduler-53eda.appspot.com",
  messagingSenderId: "751518924681"
};
firebase.initializeApp(config);

// Values from input form
var name = "";
var destination = "";
var frequency = 0;
var arrival = "";
var nextTrain = "";

$("#addTrain").on("click", function (event) {

  event.preventDefault();

  name = $("#train-name").val().trim();
  destination = $("#train-destination").val().trim();
  frequency = $("#train-frequency").val().trim();
  arrival = $("#train-time").val().trim();

  console.log(name);
  console.log(destination);
  console.log(frequency);
  console.log(arrival);

  // First time (pushed back 1 year to make sure it comes before current time)
  var firstArrival = moment(arrival, "HH:mm").subtract(1, "years");
  console.log(firstArrival);

  // Current time
  var currentTime = moment();
  console.log(moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstArrival), "minutes");
  console.log(diffTime);

  // Time remaining until next train 
  var timeRemain = diffTime % frequency;
  console.log(timeRemain);

  // Minutes until train
  var minutesUntil = frequency - timeRemain;
  console.log(minutesUntil);

  // Next train
  nextTrain = moment().add(minutesUntil, "minutes");
  console.log(moment(nextTrain).format("hh:mm"));


  var newTrain = {
    train: name,
    destination: destination,
    frequency: frequency,
    nextTrain: nextTrain.toLocaleString(),
    minA: minutesUntil,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };

  console.log(newTrain);

  database.ref().push(newTrain);

  database.ref().orderByChild("dateAdded").limitToLast(15).on("child_added", function(snapshot) {
      // storing the snapshot value in a variable
      var train = snapshot.val();

      // Console log the last data
      console.log(train.name);
      console.log(train.email);
      console.log(train.age);
      console.log(train.comment);

      // Change the HTML
      $("#train-name").text(train.name);
      $("#train-destination").text(train.destination );
      $("#train-frequency").text(train.frequency);
      $("#train-time").text(train.comment);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });




});
