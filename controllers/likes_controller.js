const Like = require('../models/like')
const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.toggleLike = async function(req, res){
    try{

        let likeable;
        let deleted = false;


        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // check if like already exist
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });


        // if a like already exist then delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted = true;
        }else{
            //otherwise make a like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();

        };

        return res.status(200).json({
            data: {
            deleted: deleted
            },
            message: "Request successful!",
        })

    }catch(err){
        if(err){console.log(err); 
            return resizeBy.json(500,{
                message: 'Internal server error'
            })
        }
    }
}