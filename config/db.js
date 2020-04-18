const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/matech_testenv', { useNewUrlParser: true , useUnifiedTopology: true});

module.exports = mongoose;