var express = require('express');
var app = express();

app.set('view engine', 'ejs');
//app.use(express.static('static'));

// Load routing
require('./routes/index')(app);

//app.use(function(req,res){res.render('index',{})})

var server = app.listen(3000, function () {
});
