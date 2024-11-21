import { getRecentPosts } from "../firebase.js";
import { Post, addMiniPostToDiv } from "../post.js"

const forYouPostDiv = document.getElementById("forYouPosts");
const newPostsDiv = document.getElementById("newItemsPosts");

function getNewPosts(postNumber)
{
    getRecentPosts(postNumber).then(posts => 
    {
        posts.forEach(post =>
        {
            let realPost = new Post(post);
            
            addMiniPostToDiv(newPostsDiv, realPost);
        });
    });
}

getNewPosts(10);