//User puts content in input lines and clicks submit
//need variable for each input line and for Next Arrival and Minutes Away
//need to connect input lines to table rows dynamically adding tr, th, and td
//need to use moment.js to alter both Next Arrival and Minutes Away using the First Train time and frequency of the trains
//need to add a new table row on click of submit button along with calculated fields
var config = {
    apiKey: "AIzaSyCAPq_Ns5WbczBXT46TjiQweWi4Iz5C6VE",
    authDomain: "trainscheduler-6b577.firebaseapp.com",
    databaseURL: "https://trainscheduler-6b577.firebaseio.com",
    projectId: "trainscheduler-6b577",
    storageBucket: "",
    messagingSenderId: "613040371372"
};

firebase.initializeApp(config);

let dataRef = firebase.database();

let trainName = "";
let destination = "";
let frequency = 0;
let firstTime = "";
let nextArrival = 0;
let minAway = 0;

$(".btn").on("click", function (event) {

    event.preventDefault();

    trainName = $("#name").val().trim();
    destination = $("#trainDestination").val().trim();
    frequency = $("#trainFrequency").val().trim();
    firstTime = $("#firstTrainTime").val().trim();

    firstTime = moment(firstTime, "HH:mm").format("hh:mm A");
    let convertedYear = moment(firstTime, "hh:mm A").subtract(1, "year");
    let currentTime = moment().format("hh:mm A");
    let diffTime = moment().diff(moment(convertedYear), "minutes");
    let remainder = diffTime % frequency;

    if (currentTime > firstTime) {

        minAway = frequency - remainder;
        nextArrival = moment().add(minAway, "minutes").format("hh:mm A");
    } else if (currentTime < firstTime) {
        minAway = frequency - remainder;
        nextArrival = moment().add(minAway, "minutes").format("hh:mm A");


    } else {
        nextArrival = currentTime;
    }

    dataRef.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival,
        minAway: minAway
    })


    let newTableRow = `<tr>
        <th scope="row">${trainName}</th>
        <td>${destination}</td>
        <td>${frequency}</td>
        <td>${nextArrival}</td>
        <td>${minAway}</td>
    </tr>`
    $("tbody").append(newTableRow);

    $("form").trigger("reset");

})