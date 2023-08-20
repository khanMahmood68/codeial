const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// Tell the passport to use a new strategy for google
passport.use(new googleStrategy({
    clientID: '858514751095-5c4p5qn609aikmuf7p949tgfdsf3bo4a.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/users/auth/google/callback'
},
    async function (accessToken, refreshToken, profile, done) {
        try {
             // find a user
            const user = await User.findOne({ email: profile.emails[0].value })
                if (user) {
    
                    // if found, set this user as req.user 
                    return done(null, user);
                } else {
    
                    // if not found, create the user and set it as req.user
                    const newUser = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    });
                        return done(null, newUser);
                    
                }

        } catch (error) {
            console.log('Error in Google strategy-passport', err);
            return done(err);
        }
       
    }
))

module.exports = passport