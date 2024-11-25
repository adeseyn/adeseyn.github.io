import { searchPosts } from "../firebase.js"
import { Post, addLongPostToDiv } from "../post.js"

async function loadPosts(query)
{
    const postsContainer = document.getElementById('postResults');
    postsContainer.innerHTML = '<h1>Loading...</h1>';

    // Simulate fetching posts based on the query
    try
    {
        // Call your searchPosts function here
        const results = await searchPosts(query, 0.4); // Assuming you have a searchPosts function defined
        postsContainer.innerHTML = ''; // Clear loading message

        if (results.length === 0)
        {
            postsContainer.innerHTML = '<h1>No posts found.</h1>';
        }
        else
        {
            results.forEach(post => {
                let realPost = new Post(post);

                addLongPostToDiv(postsContainer, realPost);
            });
        }
    } catch (error)
    {
        postsContainer.innerHTML = `<p>Error loading posts: ${error.message}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchQuery = document.getElementById('searchQuery');
    const searchForm = document.getElementById('searchForm');

    // Populate the search field if "query" is present in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    if (query) {
        searchQuery.value = query;
        // Load posts based on the query
        loadPosts(query);
    }

    // Handle form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchQuery.value;

        // Update the URL and reload the page with the new query parameter
        const newUrl = `${window.location.origin}${window.location.pathname}?query=${encodeURIComponent(query)}`;
        window.location.href = newUrl;
    });
});