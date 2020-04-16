var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use(express.static('assets'));

// Load routing
require('./routes/index')(app);

var server = app.listen(3000, function () {
    console.log("Hi :3 000");
});
