// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();


app.use('/public', express.static(process.cwd() + '/public'));
require('./server/mongoose')();
require('./server/route')(app);

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
