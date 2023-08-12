const User = require('../models/post');

module.exports.home = async function(req, res){

    // Populate the user of each posts
    
    const posts = await User.find({}).populate('user').exec();
    return res.render('home',{
        title:'Codeial | Home',
        posts:posts
    })
   
}

// module.exports.actionName=function(req, res){}
