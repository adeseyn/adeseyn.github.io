import { searchPosts } from "../firebase.js"
import { Post, addLongPostToDiv } from "../post.js"

// searches for posts and adds them to the postResults div
// while looking for posts, put a loading message
// if no posts are found, put a no posts found message
async function loadPosts(query)
{
    const postsContainer = document.getElementById("postResults");
    postsContainer.innerHTML = "<h1>Loading...</h1>";

    try
    {
        const results = await searchPosts(query, 0.4);
        postsContainer.innerHTML = "";

        if (results.length === 0)
        {
            postsContainer.innerHTML = "<h1>No posts found.</h1>";
        }
        else
        {
            results.forEach(post =>
            {
                let realPost = new Post(post);

                addLongPostToDiv(postsContainer, realPost);
            });
        }
    }
    catch (error)
    {
        postsContainer.innerHTML = "<p>Error loading posts: " + error.message + "</p>";
    }
}

document.addEventListener("DOMContentLoaded", () =>
{
    const searchQuery = document.getElementById("searchQuery");
    const searchForm = document.getElementById("searchForm");

    // search for posts if there is a query url param
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");
    if (query)
    {
        searchQuery.value = query;
        loadPosts(query);
    }

    // when the user searches, reload the page with the query as a url param
    searchForm.addEventListener("submit", (e) =>
    {
        e.preventDefault();
        const query = searchQuery.value;

        const newUrl = window.location.origin + window.location.pathname + "?query=" + encodeURIComponent(query);
        window.location.href = newUrl;
    });
});