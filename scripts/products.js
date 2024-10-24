import {updateStorage, appendToStorage, getItemIndex, sessionInit} from "./methods.js";

'use strict';

function fetchingData(url = "https://dummyjson.com/products")
{
    fetch(url).then((response) =>
    {
        if(!response.ok)
        {
            throw new Error("Unable to fetch data 404!");
        }
        return response.json();
    })

        .then((data) =>
        {
            sessionInit();
            let products = data.products;
            let productDiv = document.getElementById("cardContainer");
            removeChildFromDiv("cardContainer");
            addProducts(products, productDiv);
        })

        .catch(
            (error) =>
            {
                console.log(error.message);
            });
}

function addProducts(products, parentDiv)
{
    let favs = JSON.parse(localStorage.getItem(`${sessionStorage.getItem("id")}fav`)) || [];
    for(let i = 0; i < products.length; i++)
    {

        let innerProductDiv = document.createElement("div");
        innerProductDiv.className = "productCard";
        innerProductDiv.id = products[i].id;
        innerProductDiv.innerHTML = `
        <div class= "divImage">
            <img class= "productImage" src="${products[i].thumbnail}" alt="${products[i].title}">
        </div>
        <div class= "productDetails">
            <p class= "productCategory">${products[i].category}</p>
            <h2 class= "productTitle">${products[i].title}</h2>
            <hr class= "line">
            <p class= "productPrice">${products[i].price}$</p>
            <p class= "productRating">${products[i].rating} ★★★☆☆</p>
            <p class= "productStock">${products[i].stock} left in stock</p>
        </div>
        <div class = "buttons">
            <button class= "buttonFavor">❤</button>
            <button class= "buttonCart">Add To Cart</button>
        </div>`;
        parentDiv.appendChild(innerProductDiv);

        for(let j = 0; j < favs.length; j++)
        {
            if(favs[j].id === products[i].id)
            {
                document.querySelectorAll(".productCard")[i].classList.add("favored");
            }
        }
    }
    readButtons(products, favs);
}

function removeChildFromDiv(elementID)
{
    let parentDiv = document.getElementById(elementID);
    while(parentDiv.firstChild)
    {
        parentDiv.removeChild(parentDiv.firstChild);
    }
}

function search()
{
    const searchInput = document.querySelector("#searchInput");
    searchInput.addEventListener('keydown', (e) =>
    {
        if(e.key === "Enter")
        {
            const value = searchInput.value;
            if(value)
            {
                fetchingData(`https://dummyjson.com/products/search?q=${value}`);
            } else
            {
                fetchingData();
            }
        }
    });
}



const categoryButtons = document.querySelectorAll('#categoryButtons button');
categoryButtons.forEach(button =>
{
    button.addEventListener('click', (event) =>
    {
        const selectedCategory = event.target.getAttribute("data-category");
        const categories = ["beauty", "fragrances", "furniture", "groceries"];
        if(categories.includes(selectedCategory))
        {
            fetchingData(`https://dummyjson.com/products/category/${selectedCategory}`);
        }
        else
        {
            fetchingData();
        }
    });
});


function readButtons(products, favs)
{
    let btns = document.querySelectorAll(".buttons button");
    for(let i = 0; i < btns.length; i++)
    {
        let product = btns[i].closest('[id]');
        //add to cart
        if(btns[i].classList.contains("buttonCart"))
        {
            btns[i].addEventListener("click", function ()
            {
                appendToStorage(products[getItemIndex(Number(product.id), products)], 'cart');
            });
        }
        //unfavor & favor
        else if(btns[i].classList.contains("buttonFavor"))
        {
            btns[i].addEventListener("click", function ()
            {
                if(product.classList.contains("favored"))
                {
                    product.classList.remove("favored");
                    favs.splice(getItemIndex(Number(product.id), favs), 1);
                    updateStorage(favs, "fav");
                }
                else
                {
                    product.classList.add("favored");
                    appendToStorage(products[getItemIndex(Number(product.id), products)], 'fav');
                    favs = JSON.parse(localStorage.getItem(`${sessionStorage.getItem("id")}fav`)) || [];
                }
            });
        }
        else
        {
            console.log("error");
        }
    }
}

search();
fetchingData();
