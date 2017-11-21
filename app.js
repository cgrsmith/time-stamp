const express   = require("express");
const app       = express();
const sass      = require("node-sass-middleware");
const path      = require("path");

app.use(
    sass({
        src: __dirname + "/public",
        dest: __dirname + "/public",
        debug: true
    })
);
app.use(express.static(path.join(__dirname, "public")));


app.get("/", function(req, res) {
    res.sendFile("index.html");
});

app.get("/:date", function(req, res) {
    let date;
    if (isNaN(parseInt(req.params.date))) {
        date = new Date(req.params.date);
    } else {
        date = new Date(parseInt(req.params.date));
    }
    if (isNaN(date.getTime())) {
        res.send({ unix : null, natural : null});
    } else {
        res.send({ unix : date.getTime(), natural : date.toDateString()});
    }
});

app.listen(process.argv[2], function() {
    console.log("Timestamp server running on Port " + process.argv[2]);
});
