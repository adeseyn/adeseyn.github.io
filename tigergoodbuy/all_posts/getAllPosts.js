import { getRecentPosts } from "../firebase.js";
import { Post, addMiniPostToDiv } from "../post.js"

document.addEventListener("DOMContentLoaded", () =>
{
    const allPostsDiv = document.getElementById("allPosts");

    // receives all posts from the database and adds them as mini
    // posts to the allPosts div
    // (receives 9999 posts from the database)
    // assumes there are less than 10000 posts in the database
    function getAllPosts()
    {
        getRecentPosts(9999).then(posts => 
        {
            posts.forEach(post =>
            {
                let realPost = new Post(post);
                
                addMiniPostToDiv(allPostsDiv, realPost);
            });
        });
    }

    getAllPosts();
});