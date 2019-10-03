// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Data later from front end

var table = [];
var waitList = [];


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/view", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/make", function (req, res) {
    res.sendFile(path.join(__dirname, "make.html"));
});

//Clear Route
app.get("/clear", function (req, res) {
    table = [];
    waitList = [];
    res.sendFile(path.join(__dirname, "view.html"));
});


//API Table
app.get("/api/table", function (req, res) {
    res.json(table);
});

//API Wait
app.get("/api/wait", function (req, res) {
    res.json(waitList);
});

// Create New Reservations - takes in JSON input
app.post("/make", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newTable = req.body;


    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    if (table.length < 5) {
        table.push(newTable)
        res.send("Added to the table")
    }
    else {
        waitList.push(newTable)
        res.send("Added to the Waiting List")
    }

});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
