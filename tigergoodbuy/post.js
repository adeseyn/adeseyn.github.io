export class Post
{
    postId;
    userId;
    name;
    image;
    price; //price in DOLLARS
    date; //date in number
    desc;

    constructor(obj = Object)
    {
        this.name = obj.name;
        this.image = obj.image;
        this.date = obj.date;

        if ("id" in obj) this.postId = obj.id;
        else this.postId = -1;
        if ("user" in obj) this.userId = obj.user;
        else this.userId = -1;
        if ("desc" in obj) this.desc = obj.desc;
        else this.desc = "cool fruit";
        if ("price" in obj) this.price = obj.price;
        else this.price = 3;
    }
}

function redirectWithId(url, id)
{
    window.location.href = url + "?id=" + encodeURIComponent(id);
}

export function addMiniPostToDiv(div = HTMLDivElement, post = Post)
{
    const postDiv = document.createElement("div");
    postDiv.classList = ["miniPost"];
    postDiv.addEventListener("click", (e) => {
        //console.log(post.postId);
        redirectWithId("../post/index.html", post.postId);
    })

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