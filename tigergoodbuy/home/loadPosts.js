import { getRecentPosts, getRandomPosts } from "../firebase.js";
import { Post, addMiniPostToDiv } from "../post.js"

document.addEventListener('DOMContentLoaded', () => {
    const forYouPostDiv = document.getElementById("forYouPosts");
    const newPostsDiv = document.getElementById("newItemsPosts");

    function getYouPosts(postNumber)
    {
        getRandomPosts(postNumber).then(posts => 
        {
            posts.forEach(post =>
            {
                let realPost = new Post(post);
                
                addMiniPostToDiv(forYouPostDiv, realPost);
            });
        });
    }

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

    getYouPosts(10);
    getNewPosts(10);
});