class Post
{
    postId;
    userId;
    name;
    image;
    price; //price in cents

    constructor(name = String, image = String, price = Number)
    {
        this.name = name;
        this.image = image;
        this.price = price;
    }
}

function makeBananaPost()
{
    let post = new Post("banana", "./img/banana.jpg", 500);
    return post;
}

function addMiniPostToDiv(div = HTMLDivElement, post = Post)
{
    postDiv = document.createElement("div");
    postDiv.classList = ["miniPost"];

    postImage = document.createElement("img");
    postImage.classList = ["miniPostImage"];
    postImage.src = post.image;
    postDiv.append(postImage);

    postName = document.createElement("p");
    postName.classList = ["miniPostName"];
    postName.innerHTML = post.name;
    postDiv.append(postName);

    div.append(postDiv);
}

const forYouPosts = [makeBananaPost(), makeBananaPost(), makeBananaPost(), makeBananaPost()];
const forYouPostDiv = document.getElementById("forYouPosts")

for (const bananaPost of forYouPosts)
{
    addMiniPostToDiv(forYouPostDiv, bananaPost)
}

const newPosts = [makeBananaPost(), makeBananaPost(), makeBananaPost(), makeBananaPost()];
const newPostsDiv = document.getElementById("newItemsPosts")

for (const bananaPost of newPosts)
{
    addMiniPostToDiv(newPostsDiv, bananaPost)
}