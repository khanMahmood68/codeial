const Comment = require('../models/comment')
const Post = require('../models/post');

module.exports.create =async (req, res)=>{

    try {
    
        const post = await Post.findById(req.body.postcomment);
            if(post){
                const comment = await Comment.create({
                    content:req.body.content,
                    post:req.body.postcomment,
                    user:req.user._id
                })
                    post.comments.push(comment);
                    post.save();
                    req.flash('success','Comment published')
                    return res.redirect('/')
                
            }
        
    } catch (error) {
        // console.log(error);
        req.flash('error',error);
        return res.redirect('back')
    }
  
}

module.exports.destroy = async (req,res)=>{
  const comment = await Comment.findById(req.params.id)
  console.log(comment);
  if(comment.user == req.user.id){
    let postId = comment.post;
    comment.deleteOne();
    await Post.findByIdAndUpdate(postId, { $pull:{comments:req.params.id}});
    req.flash('success','Comment is deleted')
    return res.redirect('back');
  }
  else{
    req.flash('error','You are able to delete this comment')
    return res.redirect('back');
  }
}