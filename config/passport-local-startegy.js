const passport = require('passport');

const LocalStartegy = require('passport-local').Strategy;

const User = require('../models/user');

//Authentication using passport
passport.use(new LocalStartegy({
    usernameField: 'email',
    passReqToCallback: true
    },
    function(req, email, password, done){
        User.findOne({email: email}, function(err, user){
            if(err){
                req.flash('error', err);
                return done(err);
            };

            if(!user || user.password != password){
                req.flash('error', "Invalid Username/Password")
                return done(null, false);
            }

            return done(null, user);
        });

    }

));

//Serializing the user to decide which is used to kept in cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('error in finding the user');
            return done(err);
        }

        return done(null, user);
    });
});

//check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    if (req.isAuthenticated()){
        return next();
    };

    // if the user is not signed in
    res.redirect('/users/sign-in');

};

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    return next();
}


module.exports = passport;