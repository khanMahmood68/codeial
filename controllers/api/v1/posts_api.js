const Post = require('../../../models/post');
const Comment = require('../../../models/comment')


module.exports.index = async (req, res)=>{
    const posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
    }
});

    return res.json(200,{
        message:'List of posts',
        posts:posts,
    })
}


module.exports.destroy = async (req, res)=>{
    try {
      
      const post = await Post.findById(req.params.id);
      
      if(post.user == req.user.id){
        await post.deleteOne();
  
        await Comment.deleteMany({post:req.params.id})
  
          return res.json(200,{
            message:'Post and associated comments are deleted successfully'
          });
        
      }else{
        return res.json(401,{
          message:'You cannot delete this post!'
        })
      }
      
    } catch (error) {
      // console.log(error);
    //   req.flash('error',error);
      return res.json(500,{
        message:'Internal Server error'
      });
    }
  }
