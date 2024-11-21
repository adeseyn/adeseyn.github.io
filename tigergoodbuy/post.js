export class Post
{
    postId;
    userId;
    name;
    image;
    price; //price in cents
    date; //date in number

    constructor() {}
}

export function addMiniPostToDiv(div = HTMLDivElement, post = Post)
{
    const postDiv = document.createElement("div");
    postDiv.classList = ["miniPost"];

    const postImage = document.createElement("img");
    postImage.classList = ["miniPostImage"];
    postImage.src = post.image;
    postDiv.append(postImage);

    const postName = document.createElement("p");
    postName.classList = ["miniPostName"];
    postName.innerHTML = post.name;
    postDiv.append(postName);

    div.append(postDiv);
}