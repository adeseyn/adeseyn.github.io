import { publishPost } from "../firebase.js";

const newPostForm = document.getElementById("newPostForm");
const priceText = document.getElementById("priceInput");
const newPostImage = document.getElementById("newPostImg");
const nameText = document.getElementById("nameInput");
const descText = document.getElementById("descInput");
const imageLinkText = document.getElementById("imageLink");

imageLinkText.addEventListener('input', (event) =>
{
    let daInput = event.target.value.trim();

    if (daInput == "")
    {
        newPostImage.src = "../img/banana.jpg";
    }
    else
    {
        newPostImage.src = daInput;
    }
});

newPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("running");

    const name = nameText.value.trim();
    let image;
    if (imageLinkText.value.trim() == "") image = "./img/banana.jpg";
    else image = imageLinkText.value.trim();
    const description = descText.value.trim();
    const price = parseFloat(priceText.value);

    publishPost(name, image, new Date().getTime(), description, price, -1)
    .then(result => {
            //console.log(result);
            window.location.replace("../index.html");
        }
    )
    .catch(error => {
        console.error("unable to post");
        console.error(error);
    });
})