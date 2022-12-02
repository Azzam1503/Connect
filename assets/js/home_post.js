{
    //Method to submit the new form post using AJAX
    let createPost = function(){
        let newPostForm = $("#new-post-form");

        newPostForm.submit(function(e){
            e.preventDefault ();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('.post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                }, error: function(){
                    console.log(error.responseText);
                }
            });
        });
    };

    //Method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                <p> 
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                    </small>
                        ${post.content}
                    <br>
                    <small>
                        ${post.user.name}
                    </small>
                </p>
                <div class="post-comment">
                    <form action="/comments/create" method="POST">
                        <input type="text" name="content" placeholder="type comment" required>
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Add Comment">
                    </form>
                    <div class="post-comment-list">
                        <ul class="post-comment-${post._id}">
                        </ul>
                    </div>
                </div>
    </li>`)
    }

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();
}