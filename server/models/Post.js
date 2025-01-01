const mongoose = require('mongoose');

const postShema = mongoose.Schema(
    {
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
    },
    photo: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
    categories: {
        type: Array
    }
}, {timestamps: true}
)

module.exports = mongoose.model("posts", postSchema);