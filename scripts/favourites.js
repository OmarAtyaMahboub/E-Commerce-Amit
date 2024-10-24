
import {updateStorage, appendToStorage, getItemIndex, sessionInit} from "./methods.js";

fetch("https://jsonplaceholder.typicode.com/users").then(function (response)
{
    return response.json();
}).then(function (response)
{
    sessionInit();
    main();
});

function main()
{


    let favs = JSON.parse(localStorage.getItem(`${sessionStorage.getItem("id")}fav`));
    if(favs === null || favs.length === 0)
    {
        //no favorites menu
        showFavNoItems();
    }
    else
    {
        // favorite items container
        document.querySelector("body").innerHTML = `
        <div class = "container text-center pt-5 pb-5">
            <h1>Your favorite products</h1>
        </div>
        <div class="container text-center">
            <div class="row"></div>
        </div>`;
        //show all favorite products
        for(let i = 0; i < favs.length; i++)
        {
            document.querySelector(".container .row").innerHTML += `
            <div class="card col-3 m-2" id="${favs[i].id}" style="width: 18rem;">
                <img src="${favs[i].images[0]}" class="card-img-top w-50 align-self-center mt-2" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${favs[i].title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted h4">${favs[i].rating}<span class ="text-warning">★</span></h6>
                    <p class="card-text">${favs[i].description}</p>
                </div>
                <div class = "d-flex justify-content-center mt-3 mb-3">
                    <button type="button" class="btn btn-primary ms-1 me-2">Add to Cart</button>
                    <button type="button" class="btn btn-danger ms-2 me-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                    </svg>
                    </button>
                </div>
            </div>`;
        }

        //reading each favorite product's buttons
        let btns = document.querySelectorAll("button");
        for(let i = 0; i < btns.length; i++)
        {
            //get the button's parent that has an ID -> the product card/row
            let product = btns[i].closest('[id]');
            //add to cart
            if(btns[i].classList.contains("btn-primary"))
            {
                btns[i].addEventListener("click", function ()
                {
                    appendToStorage(favs[getItemIndex(Number(product.id), favs)], 'cart');
                });
            }
            //unfavor
            else if(btns[i].classList.contains("btn-danger"))
            {
                btns[i].addEventListener("click", function ()
                {
                    favs.splice(getItemIndex(Number(product.id), favs), 1);
                    updateStorage(favs, "fav");
                    product.remove();
                    // favorites is empty
                    if(favs === null || favs.length === 0)
                    {
                        showFavNoItems();
                    }
                });
            }
            else
            {
                console.log("error");
            }
        }
    }
};

function showFavNoItems()
{
    document.querySelector("body").innerHTML = ``;
    document.querySelector("body").innerHTML += `
        <div class = "container text-center vh-100 d-flex flex-column justify-content-center">
            <h1>it Seems you haven't favored anything</h1>
            <div class = "d-flex justify-content-evenly">
            <span>wanna favor something?</span>
            <span>check out our <a href="#">shop</a></span>
        </div>
        </div>`;

}