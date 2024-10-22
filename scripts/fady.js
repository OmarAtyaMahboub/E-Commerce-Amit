//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
////  this page with it's html is designed to test out favor, unfavor, add to storage button function ////
////        so that the logic can be merged with Fady's branch's product.html and product.js          ////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// THE FILE IS MARKED FOR DELETION AFTER MERGING ///////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

import {updateStorage, appendToStorage, getItemIndex} from "./methods.js";

let bygones;
// localStorage.removeItem(`${sessionStorage.getItem("id")}cart`);
//i need products in bygones
fetch("https://dummyjson.com/products").then(function (response)
{
    return response.json();
}).then(function (response)
{
    bygones = response.products;
    console.log(bygones);
    showFavs();

    // initFavorites();



});

//i need users
fetch("https://jsonplaceholder.typicode.com/users").then(function (response)
{
    return response.json();
}).then(function (response)
{
    sessionStorage.setItem("id", response[0].id);
});

function showFavs()
{

    if(bygones === null || bygones.length === 0)
    {

        document.querySelector(".main-container").innerHTML = ``;
    }
    else
    {
        document.querySelector(".main-container").innerHTML = `
        <h1>Your favorite products</h1>
        <div class="fav-container"></div>`;
        let favs = JSON.parse(localStorage.getItem(`${sessionStorage.getItem("id")}fav`)) || [];
        for(let i = 0; i < bygones.length; i++)
        {
            document.querySelector(".fav-container").innerHTML += `
            <div class="fav-product-container" id="${bygones[i].id}">
                <img src="" alt="img here">
                <p>${bygones[i].title}</p>
                <p>${bygones[i].description}</p>
                <p>${bygones[i].rating}<span class ="yellow">★</span></p>
                <p>${bygones[i].price}$</p>
                <button class="cart-btn" >add to cart</button>
                <button class="fav-btn" >❤</button>
            </div>`;
            for(let j = 0; j < favs.length; j++)
            {
                if(favs[j].id === bygones[i].id)
                {
                    document.querySelector(".fav-product-container").classList.add("favored");
                }

            }

        }


        let btns = document.querySelectorAll("button");
        for(let i = 0; i < btns.length; i++)
        {
            let product = btns[i].closest('[id]');
            switch(btns[i].getAttribute("class"))
            {
                case "cart-btn":
                    btns[i].addEventListener("click", function ()
                    {
                        appendToStorage(bygones[getItemIndex(Number(product.id), bygones)], 'cart');
                    });
                    break;
                case "fav-btn":
                    btns[i].addEventListener("click", function ()
                    {
                        if(product.classList.contains("favored"))
                        {
                            favs.splice(getItemIndex(Number(product.id), favs), 1);
                            updateStorage(favs, "fav");
                            console.log(JSON.parse(localStorage.getItem(`${sessionStorage.getItem("id")}fav`)));
                            product.classList.remove("favored");
                            console.log("removed from favs!");
                        }
                        else
                        {
                            product.classList.add("favored");
                            appendToStorage(bygones[getItemIndex(Number(product.id), bygones)], 'fav');
                            favs = JSON.parse(localStorage.getItem(`${sessionStorage.getItem("id")}fav`)) || [];
                            console.log("added to favs!");
                        }
                    });
                    break;
                default:
                    console.log("error");
                    break;
            }
        }
    }
};