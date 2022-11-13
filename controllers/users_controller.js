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