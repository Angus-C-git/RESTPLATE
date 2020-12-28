const mongoose = require('mongoose');

/**
 * USER TABLE SCHEMA DEFINITION
 * */
const userSchema = new mongoose.Schema({
    usrName: {
        type: String,
        required: true,
        min: 6,
        max: 25
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    cracks: {
      type: Number,
      default: 0
    },
    solvedIDs: {
      type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
