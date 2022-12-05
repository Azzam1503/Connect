module.exports.index = function(req, res){
    return res.json(200,{
        messages: "List of version 2 posts",
        posts: []
    })
}