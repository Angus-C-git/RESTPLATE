const mongoose = require('mongoose');

// DB Post schema
const postSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        min: 6,
        max: 25
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);