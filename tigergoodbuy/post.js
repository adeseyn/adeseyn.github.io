// general post object
export class Post
{
    postId;
    userId;
    name;
    image;
    price; //price in dollars
    date; //date in number
    desc;

    constructor(obj = Object)
    {
        this.name = obj.name;
        this.image = obj.image;
        this.date = new Date(obj.date);

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

// redirect to a url with the url param "id"
function redirectWithId(url, id)
{
    window.location.href = url + "?id=" + encodeURIComponent(id);
}

// creates a square post and adds it to a div
// consists of an image, name
// used on home page and all posts page
export function addMiniPostToDiv(div = HTMLDivElement, post = Post)
{
    const postDiv = document.createElement("div");
    postDiv.classList = ["miniPost"];
    postDiv.addEventListener("click", (e) =>
    {
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

// creates a long post and adds it to a div
// consists of an image, name, description
// used on search page
export function addLongPostToDiv(div = HTMLDivElement, post = Post)
{
    const postDiv = document.createElement("div");
    postDiv.classList = ["longPost"];
    postDiv.addEventListener("click", (e) => {
        //console.log(post.postId);
        redirectWithId("../post/index.html", post.postId);
    })

    const postImage = document.createElement("img");
    postImage.classList = ["longPostImage"];
    postImage.src = post.image;
    postDiv.append(postImage);

    const textDiv = document.createElement("div");
    textDiv.classList = ["longPostText"];
    postDiv.append(textDiv);

    const postName = document.createElement("p");
    postName.classList = ["longPostName"];
    postName.innerHTML = post.name;
    textDiv.append(postName);

    const postDesc = document.createElement("p");
    postDesc.classList = ["longPostDesc"];
    postDesc.innerHTML = post.desc;
    textDiv.append(postDesc);

    div.append(postDiv);
}