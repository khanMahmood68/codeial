const Post = require('../models/post');

module.exports.create = async (req, res)=>{
  try {
    const post = await Post.create({
        content:req.body.content,
        user:req.user._id
    });
 
    if(post){
        return res.redirect('back')
    }
    
  } catch (error) {
    console.log(error);
  }
    
    
}