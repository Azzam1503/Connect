const User = require('../../../models/user');
const jwt  = require('jsonwebtoken')

module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            })
        }

        return res.json(200, {
            message: "Sign-in successful, here is your token",
            data: {
                token: jwt.sign(user.toJSON(), 'connect', {expiresIn: '100000'})            }
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

}