const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    duration: {
        type: Date,
    },
    tumbnail_url: {
        type: String,
    },
    tags: {
        type: Array,
    },
    channelTitle: {
        type: String,
    },
    category: { 
        type: Schema.Types.ObjectId, ref: 'Category',
        required: true,
    },
});

module.exports = mongoose.model('videos', videoSchema);