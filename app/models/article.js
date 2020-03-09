'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = Schema({
    title: { 
        type: String, 
        required: [true, 'The title is required'],
        trim:true
    },
    content: { 
        type: String, 
        required: [true, 'The content is required'],
        trim:true
    },
    date: { 
        type: Date, 
        default: Date.now
    },
    image: {
        type: String,
        default: 'image-default.jpg'
    },
});

module.exports = mongoose.model('Article', ArticleSchema);