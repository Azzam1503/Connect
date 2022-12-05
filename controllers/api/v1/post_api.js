const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

        return res.status(200).json({
            data:{
                posts: posts
            },
            message: "List of posts",    
        })
}

module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});

            return res.status(200).json({
                message: "Post and assciated comments deleted successfully"
            });
        }else{
            return res.json(401, {
                message: "You cannot delete this post!"
            })
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}; 