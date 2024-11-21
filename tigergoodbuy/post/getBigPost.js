import { getPostById } from "../firebase.js";
import { Post } from "../post.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get('id');

const priceText = document.getElementById("priceText");
const bigPostImg = document.getElementById("newPostImg");
const nameText = document.getElementById("nameText");
const descText = document.getElementById("descText");

getPostById(postId)
.then(response => {
    //console.log(response);
    let daPost = new Post(response);

    priceText.innerHTML = "Price: " + new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(daPost.price);

    bigPostImg.src = daPost.image;
    nameText.innerHTML = daPost.name;
    descText.innerHTML = daPost.desc;
});