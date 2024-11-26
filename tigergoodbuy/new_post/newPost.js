import { publishPost } from "../firebase.js";
import { getCookie, setCookie, deleteCookie } from "../cookies.js";

const newPostForm = document.getElementById("newPostForm");
const priceText = document.getElementById("priceInput");
const newPostImage = document.getElementById("newPostImg");
const nameText = document.getElementById("nameInput");
const descText = document.getElementById("descInput");
const imageLinkText = document.getElementById("imageLink");

function httpGetAsync(url, callback)
{
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}
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

document.addEventListener('DOMContentLoaded', () => {
    const quill = new Quill('#quill-editor', {
        theme: 'snow',
        placeholder: 'Description & Notes',
        modules:
        {
            toolbar:
            [
                ['bold', 'italic', 'underline'], // Basic text formatting
                [{ list: 'ordered' }, { list: 'bullet' }], // Lists
            ]
        }
    });

    quill.on('text-change', () => {
        descText.value = quill.root.innerHTML; // Get the HTML content of the editor
    });

    if (getCookie("name") != null) nameText.value = getCookie("name");
    if (getCookie("price") != null) priceText.value = getCookie("price");
    if (getCookie("image") != null) imageLinkText.value = getCookie("image");
    if (getCookie("desc") != null) quill.root.innerHTML = getCookie("desc");

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

    newPostForm.addEventListener("input", (e) => {
        setCookie("name", nameText.value, 7);
        setCookie("price", priceText.value, 7);
        setCookie("image", imageLinkText.value, 7);
        setCookie("desc", quill.root.innerHTML, 7);
    });

    newPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("running");

        const name = nameText.value.trim();
        let image;
        if (imageLinkText.value.trim() == "") image = "../img/banana.jpg";
        else image = imageLinkText.value.trim();
        const description = descText.value.trim();
        const price = parseFloat(priceText.value);

        publishPost(name, image, new Date().getTime(), description, price, -1, city)
        .then(result => {
                deleteCookie("name");
                deleteCookie("price");
                deleteCookie("image");
                deleteCookie("desc");
                window.location.replace("../index.html");
            }
        )
        .catch(error => {
            console.error("unable to post");
            console.error(error);
        });
    })
});