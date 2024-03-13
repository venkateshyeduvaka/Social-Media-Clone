const mongoose = require('mongoose');

const postSchema =mongoose.Schema(
    {
    userId: { type: String, required: true },
    desc: String,
    likes: [],
    image: String,
    },
    {
        timestamps: true,
      }
)

var PostModel=mongoose.model('posts',postSchema)

module.exports = PostModel;