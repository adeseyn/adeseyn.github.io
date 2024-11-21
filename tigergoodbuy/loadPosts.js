import { getRecentPosts } from "./firebase.js";
import { Post, addMiniPostToDiv } from "./post.js"

const forYouPostDiv = document.getElementById("forYouPosts");
const newPostsDiv = document.getElementById("newItemsPosts");

function getNewPosts(postNumber)
{
    getRecentPosts(postNumber).then(posts => 
    {
        posts.forEach(post =>
        {
            let realPost = new Post();

            realPost.name = post.name;
            realPost.image = post.image;
            realPost.date = post.date;

            if (post.hasOwnProperty("id")) realPost.postId = post.id;
            else realPost.postId = -1;
            if (post.hasOwnProperty("user")) realPost.userId = post.user;
            else realPost.userId = -1;
            
            addMiniPostToDiv(newPostsDiv, realPost);
        });
    });
}

getNewPosts(4);