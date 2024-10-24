'use strict'
function fetchingData(url = "https://dummyjson.com/products") {
    fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error("Unable to fetch data 404!");
        }
        return response.json();
    })

        .then((data) => {
            let products = data.products;
            let productDiv = document.getElementById("cardContainer");
            removeChildFromDiv("cardContainer")
            addProducts(products, productDiv);
        })

        .catch(
            (error) => {
                console.log(error.message);
            })
}

function addProducts(products, parentDiv) {
    products.forEach((productRow) => {
        let innerProductDiv = document.createElement("div");
        innerProductDiv.className = "productCard";
        innerProductDiv.innerHTML = `
<div class= "divImage">
    <img class= "productImage" src="${productRow.thumbnail}" alt="${productRow.title}">
</div>
<div class= "productDetails">
    <p class= "productCategory">${productRow.category}</p>
    <h2 class= "productTitle">${productRow.title}</h2>
            <hr class= "line">

    <p class= "productPrice">${productRow.price}$</p>
    <p class= "productRating">${productRow.rating} ★★★☆☆</p>
    <p class= "productStock">${productRow.stock} left in stock</p>
</div>
<div class = "buttons">
    <button class= "buttonBuy">Buy now</button>
    <button class= "buttonCart">Add To Cart</button>
</div>
`;
        parentDiv.appendChild(innerProductDiv);
    });
}

function removeChildFromDiv(elementID) {
    let parentDiv = document.getElementById(elementID);
    while (parentDiv.firstChild) {
        parentDiv.removeChild(parentDiv.firstChild);
    }
}

function search() {
    const searchInput = document.querySelector("#searchInput");
    searchInput.addEventListener('input', (x) => {
        const value = x.target.value;
        if (value) {
            fetchingData(`https://dummyjson.com/products/search?q=${value}`)
        } else {
            fetchingData();
        }
    });
}

const categoryButtons = document.querySelectorAll('#categoryButtons button');
categoryButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const selectedCategory = event.target.getAttribute("data-category");
        const categories = ["beauty", "fragrances", "furniture", "groceries"];
        if (categories.includes(selectedCategory)) {
            fetchingData(`https://dummyjson.com/products/category/${selectedCategory}`)
        }
        else {
            fetchingData();
        }
    })
});




search()
fetchingData()
