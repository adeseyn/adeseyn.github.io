import { getRecentPosts } from "../firebase.js";
import { Post, addMiniPostToDiv } from "../post.js"

document.addEventListener('DOMContentLoaded', () => {
    const allPostsDiv = document.getElementById("allPosts");

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