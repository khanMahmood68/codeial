{
    // Method to submit the form data for new posts using AJAX
    let createPost = ()=>{
        let newPostForm = $('#new-post-form');
        newPostForm.submit((e)=>{
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data){
                let newPost =newPostDom(data.data.post);
                $('#posts-list-container>ul').prepend(newPost);
                deletePost($(' .delete-post-button', newPost))
                },error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    // Method to create a post in DOM

    let newPostDom = function(post){
        return $(`  <li id="post-${post._id}">
                    <p>
                       
                            <small>
                                <a class="delete-post-button" href="/posts/destroy/${post._id}">x</a>
                            </small>
                          
                                    ${post.content}
                                    <br>
                                    <small>
                                        ${post.user.name}
                                    </small>
                                    <br>
                                    <small>
                                        ${post.user.email}
                                    </small>
                    </p>
                    <div class="post-comment">
                       
                            <form action="/comments/create" method="post">
                                <input type="text" name="content" placeholder="Type Here To Add Commens"
                                    required>
                                <input type="hidden" name="postcomment" value="${post._id}">
                                <input type="submit" value="Add Comment">
                            </form>

                          
                                <div class="post-comments-list">
                                    <ul id="post-comments-${post._id}">
                                        
                                    </ul>

                                </div>
                    </div>
                 </li>`)
    }



    // Method to delete the post from DOM

    let deletePost = (deleteLink)=>{
        $(deleteLink).click((e)=>{
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:(data)=>{
                    $(`#post-${data.data.post_id}`).remove();
                },error:(error)=>{
                    console.log(error.responseText);
                }
            })
        })
    }

    createPost();
}