// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require("moment");

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get("/:dt", function (req, res) {
  
  var dt = (req.params.dt || "").toString();
  
  if (dt.length == 0)    
    res.sendFile(__dirname + '/views/index.html');
  else {
    
    var o = {
        unix: null,
        natural: null
      };
    
    try {
      var mdt = moment(isNaN(+dt) ? dt : +dt);

      if (mdt.isValid()) {
        o.unix = mdt.valueOf();
        o.natural = mdt.format("YYYY MMM d");
      }
    } catch (ex) {}
      
    res.json(o);
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
