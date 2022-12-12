const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId
    },
    //defines the object id of the liked object
    likeable:{
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    // this field is used for defining the types of liked objects since this is a dynamic refrence
    onModel:{
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
},{
    timestamps: true
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;