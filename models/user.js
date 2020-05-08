const Schema = require('mongoose').Schema;
const db = require('../config/db');

const User = db.model('User', {
    name: String,
    email: String,
    password: String,
    img: String,
    desc: String,
    price: Number,
    city: String,
    role: String,
    subjects: [String],
    apps: [{
        uid: Schema.Types.ObjectId,
        updated: { type: Date, default: Date.now },
    }],
});

module.exports = User;