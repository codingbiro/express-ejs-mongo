require('dotenv').config();
const mongoose = require('mongoose');
// Connecting to MongoDB
const MONGODB_URI = process.env.NODE_ENV ? `mongodb+srv://${process.env.MONGODB_MATECHUS}:${process.env.MONGODB_MATECHPW}@matech0-w7nyo.mongodb.net/${process.env.MONGODB_DEF_DB}` : 'mongodb://localhost:27017/matech_testenv';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

module.exports = mongoose;
