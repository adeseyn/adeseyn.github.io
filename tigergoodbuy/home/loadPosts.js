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
        })
        .then(function ()
        {
            const seeAllDiv = document.createElement("div");
            seeAllDiv.classList = ["miniPost"];
            seeAllDiv.addEventListener("click", (e) => {
                window.location.href = "../all_posts";
            });
            newPostsDiv.append(seeAllDiv);

            const seeAllHeader = document.createElement("h1");
            seeAllHeader.innerHTML = "See All >";
            seeAllDiv.append(seeAllHeader);
        });
    }

    getYouPosts(10);
    getNewPosts(9);
});