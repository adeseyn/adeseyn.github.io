import { publishPost } from "../firebase.js";
import { getCookie, setCookie, deleteCookie } from "../cookies.js";

const newPostForm = document.getElementById("newPostForm");
const priceText = document.getElementById("priceInput");
const newPostImage = document.getElementById("newPostImg");
const nameText = document.getElementById("nameInput");
const descText = document.getElementById("descInput");
const imageLinkText = document.getElementById("imageLink");

// gets the city the user is from and stores it as a cookie
// for use in analytics or something
let city = "";
if (getCookie("city") == null)
{
    const url = "https://ipgeolocation.abstractapi.com/v1/?api_key=f8be61bcdd004987b559d51cfee43b16&ip_address=2620:8d:8000:1064:6c18:37a1:cb92:fa19";
    $.getJSON(url, function(response)
    {
        setCookie("city", response.city + ", " + response.region_iso_code);
        city = response.city + ", " + response.region_iso_code;
    });
}
else city = getCookie("city");

document.addEventListener("DOMContentLoaded", () =>
{
    // initialize rich text editor for item descriptions
    const quill = new Quill("#quill-editor",
    {
        theme: "snow",
        placeholder: "Description & Notes",
        modules:
        {
            toolbar:
            [
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
            ]
        }
    });

    // updates the "description" section of the form when the rich presence
    // is updated by the user
    // so that the description is submitted correctly
    quill.on("text-change", () =>
    {
        descText.value = quill.root.innerHTML;
    });

    // get previous user inputs from the last session
    // so that the user doesn"t lose progress when they reload
    // or close out and reopen
    if (getCookie("name") != null) nameText.value = getCookie("name");
    if (getCookie("price") != null) priceText.value = getCookie("price");
    if (getCookie("image") != null) imageLinkText.value = getCookie("image");
    if (getCookie("desc") != null) quill.root.innerHTML = getCookie("desc");

    // set the post"s image to a banana if the link is empty
    // or to the specified image otherwise
    imageLinkText.addEventListener("input", (event) =>
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

    // save user progress with cookies
    newPostForm.addEventListener("input", (e) =>
    {
        setCookie("name", nameText.value, 7);
        setCookie("price", priceText.value, 7);
        setCookie("image", imageLinkText.value, 7);
        setCookie("desc", quill.root.innerHTML, 7);
    });

    // when the user submits, upload the post, clear all cookies,
    // and send them to the home page
    newPostForm.addEventListener("submit", (e) =>
    {
        e.preventDefault();

        const name = nameText.value.trim();
        let image;
        if (imageLinkText.value.trim() == "") image = "../img/banana.jpg";
        else image = imageLinkText.value.trim();
        const description = descText.value.trim();
        const price = parseFloat(priceText.value);

        publishPost(name, image, new Date().getTime(), description, price, -1, city)
        .then(() =>
        {
            deleteCookie("name");
            deleteCookie("price");
            deleteCookie("image");
            deleteCookie("desc");
            window.location.replace("../index.html");
        })
        .catch(error =>
        {
            console.error("unable to post");
            console.error(error);
        });
    })
});