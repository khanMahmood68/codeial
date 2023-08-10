const User = require('../models/user')

module.exports.profile = (req, res) => {
    return res.render('user_profile', {
        title: 'User Page'
    });
}

// Render the signup page
module.exports.signUp = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }


    return res.render('user_sign_up', {
        title: "Codial | Sign Up"
    })
}

// Render the signin page
module.exports.signIn = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }


    return res.render('user_sign_in', {
        title: "Codial | Sign In"
    })
}

// Get the signUp data

module.exports.create = async (req, res) => {
    try {
        if (req.body.password != req.body.confirm_password) {
            return res.redirect('back');
        }
        const existingUser = await User.findOne({ email: req.body.email })
        if (!existingUser) {
            const newUser = await User.create(req.body);
            return res.redirect('/users/sign-in')

        }
        else {
            return res.redirect('back');
        }
    } catch (err) {
        console.error('Error in user registration:', err);
        return res.status(500).send('Internal Server Error');
    }
}


// Signin and create a session for user

module.exports.createSession = (req, res) => {
   return res.redirect('/');
}

module.exports.destroySession = (req, res)=>{
    req.logout(()=>{
        return res.redirect('/users/sign-in');
    })
    
}