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

// set local variable to firebase
var database = firebase.database();

var trainName = "";
var trainDestination = "";
var trainTime = "";
var trainFrequency = "";

function sendtoDatabase() {
    trainName = $("#train-name").val().trim();
    trainDestination = $("#train-destination").val().trim();
    trainTime = $("#train-time").val().trim();
    trainFrequency = $("#train-frequency").val().trim();

    database.ref().push({
      trainName:trainName,
      trainDestination:trainDestination,
      trainTime:trainTime,
      trainFrequency:trainFrequency
  });
};

// Send to Firebase
  database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());
    var times = snapshot.val().trainTime;
    var newRow = $('<tr>');

    newRow.addClass("row" + e);
    $('.trains').append(newRow);
    newRow.append("<th class='train-name'>" + snapshot.val().trainName + "</th>");
    newRow.append("<th class='train-destination'>" + snapshot.val().trainDestination + "</th>");
    newRow.append('<th class="train-time">' + times + "</th>");
    newRow.append('<th class="train-frequency">' + times + "</th>");
    
    var lastRow = $('<th class="last">');
    newRow.append(lastRow);
    newRow.append('<button class="row' + e + '">Delete</button>');
    e++;

  }
