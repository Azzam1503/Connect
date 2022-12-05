const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
        clientID: '1014675238587-dkec40obd6o4vqhrmkjgn2aaikpnpbge.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:8000/users/auth/googe/callback',

    },

    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log('erroring in google strategy passport', err);
                return;
            }
            console.log(profile);

            if(user){
                return done(null, user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString("hex")
                }, function(err, user){
                    if(err){ console.log('erroring in google strategy passport', err); return; }

                    return done(null , user);
                })
            }
        });
    }
))

module.exports = passport;
