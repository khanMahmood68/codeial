const passport = require('passport');
const LocalStartegy = require('passport-local').Strategy;
const User = require('../models/user')

// Authentication using passport

passport.use(new LocalStartegy({
        usernameField:'email',
        passReqToCallback:true,
    },
    async function(req,email,password,done){
        // Find the user and establish the identity
        try{
            const user = await User.findOne({email:email})

            if(!user || user.password != password){
                // console.log('Invalid Username/Password');
                req.flash('error','Invalid Username/Password')
                return done(null, false);
            }
            return done(null, user);
        }   catch (err) {
                // console.log('Error in finding user --->Passport');
                req.flash('error',err);
                return done(err);
            }
    }
));

// Serializing the user to decide which key is to be kept in the cookies

passport.serializeUser((user, done)=>{
    done(null, user.id);
})


// Deserializing the user from the key in the cookies

passport.deserializeUser(async (id, done)=>{
    try{
    const user = await User.findById(id)
        done(null, user);
    
}catch (err) {
    console.log('Error in finding user --->Passport');
    return done(err);
}
})


// check if the user is authenticated 

passport.checkAuthentication = function(req, res, next){
    // if the user is signed in , then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser = function(req, res, next){
    // req.user containes the current signed in ruser from the session cookie and we are just sending this to locals for the views
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next()
}

module.exports = passport;