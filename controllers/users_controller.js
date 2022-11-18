const User = require('../models/user');

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    });

}

module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: 'Connect | Sign Up'
    });
}

module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: 'Connect | Sign In'
    });
}


module.exports.create = function(req, res){
    
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("Erorr in finding user in signing up"); return;
        }

        if(!user){
            User.create(req.body, function(err){
                if(err){console.log("Error creating the user while signing up"); return;}

                return res.redirect('/users/sign-in');
        });
        }else{return res.redirect('back');}
    })
}


module.exports.createSession = function(req, res){

    //Finding the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log("Error in finding the user while signing In"); return}

        
        if(user){
            //Handle password which doesn't match
            if(user.password != req.body.password){ 
                return res.redirect('back');
            }

            //Handle the create session
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }else{
            //Handle user not found
            res.redirect("back")
        }
    })
}