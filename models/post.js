const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //include the array of ids of all comments in the post schema itself
    comments:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
        }
    ]
},{
    timestamps: true,
    toJSON: {virtuals: true}
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;