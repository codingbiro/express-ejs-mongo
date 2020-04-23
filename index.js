const express = require('express');
const app = express();
const bodyParser = require('body-parser');
/*const lm = require('./models/lesson');
var array = [];
var array1 = [];
var array2 = [];
const text = "Maecenas bibendum sodales ante sagittis. Morbi eget consectetur erat, sit amet feugiat felis. Praesent massa quam, bibendum interdum diam ac, elementum efficitur nunc. Mauris egestas pharetra augue, sed luctus ipsum placerat quis. Praesent mattis massa sed molestie lacinia. Fusce bibendum tortor elit, sit amet pharetra lacus interdum vitae. Curabitur vel mi condimentum, ullamcorper eros vitae, rhoncus tortor. Vivamus eleifend quis lorem quis lacinia. Suspendisse a rhoncus justo, quis elementum ex. Nunc id porta ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce dapibus ullamcorper ligula, in commodo nisi lobortis at. Aenean tempus libero eu diam vestibulum fermentum.";
const text2 = "ligula accumsan Quisque ultrices congue";
const text3 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
array = text.split(' ');
array1 = text2.split(' ');
array2 = text.split('.');
array3 = text3.split(' ');
array4 = text3.split(',');
var i = 0;
let newLesson = new lm();
newLesson.start = new Date(2020,5,10+Math.floor(Math.random() * 20),8+Math.floor(Math.random() * 10),Math.floor(Math.random() * 59));
newLesson.duration = 45+Math.floor(Math.random() * 45);
newLesson.subject = array3[i];
newLesson.desc = array4[i];
newLesson.price = 10+Math.floor(Math.random() * 10);
newLesson.city = array2[i];
newLesson._user = "5e9b588385018c3e38ff2c21";
newLesson.save(err => console.log(err));*/

// Using EJS templating
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Static folder
app.use(express.static('assets'));

// Load routing
require('./routes/index')(app);

// Port settings
const PORT = 3000;

// Start server
const server = app.listen(PORT, function () {
    console.log(`Hi port ${PORT}`);
});
