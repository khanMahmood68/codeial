const User = require('../models/user');
const fs = require('fs');
const path = require('path')

module.exports.profile = async (req, res) => {
    const user = await User.findById(req.params.id)
    return res.render('user_profile', {
        title: 'User Page',
        profile_user:user
    });
};


module.exports.update = async (req,res)=>{
    // This will not work because of enctype="multipart/form-data"
    // if(req.user.id == req.params.id){
    //     const user = await User.findByIdAndUpdate(req.params.id, req.body);
    //     return res.redirect('back');
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }


    if(req.user.id == req.params.id){

    try {

        let user = await User.findById(req.params.id);

        User.uploadedAvatar(req, res, function(err){
            if(err){console.log('*****',err);}
            
            user.name = req.body.name;
            user.email = req.body.email;
            if(req.file){
                if(user.avatar){
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                }
                
                // This is the saving the path of the uploaded file into the avatar field in the user
                user.avatar = User.avatarPath+'/'+req.file.filename;
            }
            user.save();
            return res.redirect('back')
        })

        
    } catch (error) {
        req.flash('error',error);
        console.log(error);
    }

    }else{
        return res.status(401).send('Unauthorized');
     }

    
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
    req.flash('success','Logged in successfully')
   return res.redirect('/');
}

module.exports.destroySession = (req, res)=>{
    req.logout(()=>{
        req.flash('success','You have logged out');
        return res.redirect('/users/sign-in');
    })
   
}

