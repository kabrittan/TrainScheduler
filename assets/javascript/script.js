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

// set local variable to firebase.database() \\
var database = firebase.database();