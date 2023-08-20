const Post = require('../models/post');

const User = require('../models/user')

module.exports.home = async function(req, res){

    // Populate the user of each posts
    
    const posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
        }
    });
    const users = await User.find({})
    return res.render('home',{
        title:'Codeial | Home',
        posts:posts,
        all_users:users,
    })
   
}

// module.exports.actionName=function(req, res){}
