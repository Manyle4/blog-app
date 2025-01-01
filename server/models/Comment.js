const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
    {
    comment: {},
    author: {},
    postId: {},
    userI: {}
}, {timestamps: true}
)

module.exports = mongoose.model('comments', commentSchema);