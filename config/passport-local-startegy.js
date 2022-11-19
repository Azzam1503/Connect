const passport = require('passport');

const LocalStartegy = require('passport-local').Strategy;

const User = require('../models/user');

//Authentication using passport
passport.use(new LocalStartegy({
    usernameField: 'email'
    },
    function(email, password, done){
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log('Error in finding user');
                return done(err);
            };

            if(!user || user.password != password){
                console.log("Invalid Username/password");
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


module.exports = passport;