const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Lesson = db.model('Lesson', {
    start: Date,
    duration: Number,
    subject: String,
    desc: String,
    price: Number,
    city: String,
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Lesson;