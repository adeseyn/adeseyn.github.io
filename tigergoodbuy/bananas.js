//DO NOT run this unless you need more sample posts for some reason
import { publishPost } from "./post.js";

function makeBananaPost()
{
    publishPost("banana", "./img/banana.jpg", new Date().getTime(), -1);
}

makeBananaPost();