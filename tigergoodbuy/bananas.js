// DO NOT run this script unless you need more sample posts for some reason
// adds a tiny banana post

import { publishPost } from "./post.js";

function makeBananaPost()
{
    publishPost("banana", "../img/banana.jpg", new Date().getTime(), -1);
}

makeBananaPost();