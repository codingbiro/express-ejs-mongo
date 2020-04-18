const express = require('express');
const app = express();

// Using EJS templating
app.set('view engine', 'ejs');

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
