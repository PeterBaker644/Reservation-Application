const express = require("express");
const path = require("path");
const _ = require("lodash");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const tablesArray = _.slice(reservations, [start=0], [end=4]);
// const waitlist = _.slice(array, [start=5], [end=array.length]);
const reservations = [];
const waitlist = [];

// Routes
// =============================================================

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/manager", function (req, res) {
    res.sendFile(path.join(__dirname, "manager.html"));
});

app.get("/api/tables", function (req, res) {
    return res.json(reservations);
});

app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);
});

// I don't get why we are sending a reservation to an empty page...
app.post("/api/tables", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;
    // This is where the logic that checks the size of the arrays goes.
    console.log(newReservation);
        if (reservations.length == 5) {
            waitlist.push(newReservation);
            //shouldn't be return, needs to be something else.
        } else {
            reservations.push(newReservation);
            res.json("true");
        }
});

// This one is going to be difficult
app.post("api/clear", function (req, res){
    if (res.body == "all") {
        waitlist = [];
        reservations = [];
    } else {
// ??? Hasn't been written yet
    }
});

// Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
