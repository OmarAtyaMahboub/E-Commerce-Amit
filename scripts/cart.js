
import {updateStorage, deleteStorage, getItemIndex} from "./methods.js";


//TODO: get logged-in user session data
//fetching user dummy data
fetch("https://jsonplaceholder.typicode.com/users").then(function (response)
{
    return response.json();
}).then(function (response)
{
    sessionStorage.setItem("id", response[0].id);
    main();
});

function main()
{
    let cart = JSON.parse(localStorage.getItem(`${sessionStorage.getItem("id")}cart`));
    if(cart === null || cart.length === 0)
    {
        //no cart menu
        showCartNoItems();
    }
    else
    {
        //cart items container and checkout container 
        document.querySelector("body").innerHTML = `
        <div class="container text-center pt-5 pb-5">
            <h1>Cart</h1>
        </div>
        <div class="container text-center d-flex flex-column justify-content-center align-items-center ">
            <table class="table table-light align-middle">
                <thead class="table-warning">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider"></tbody>
            </table>
            <div
            class="container d-flex flex-column justify-content-center align-items-center bg-dark-subtle rounded p-0 m-5 w-50">
                <div
                class="text-center display-3 bg-primary-subtle pt-3 pb-3 rounded-top border-bottom border-black border-2 w-100">
                <b>Cart Totals</b>
                </div>
            </div>
        </div>`;

        //checkout totals calculation
        let sum = cart.reduce((accumulator, current) => accumulator + current.price, 0).toFixed(2);
        for(let i = 0; i < cart.length; i++)
        {
            //show all cart products
            document.querySelector("tbody").innerHTML += `
            <tr id="${cart[i].id}">
                <th scope="row"><button type="button" class="btn-close" aria-label="Close"></button></th>
                <td><img src="${cart[i].images[0]}" class="img-fluid" style="height:100px; width:100px;" alt="..."></td>
                <td>${cart[i].title}</td>
                <td>${cart[i].price}</td>
            </tr>`;
            //checkout container totals price
            if(i === cart.length - 1)
            {

                document.querySelectorAll(".container")[2].innerHTML += `
                <div
                class="text-center display-1 text-body-secondary  pt-2 pb-2  border-bottom border-black border-1 w-100">
                ${sum}$</div>
                <button type="button"
                class="btn btn-secondary rounded-bottom mt-3 mb-3 pt-3 pb-3 ps-0 pe-0 w-25 h2">Checkout</button>`;


            }

        }
        //reading each cart product's button and checkout button
        let btns = document.querySelectorAll("button");
        for(let i = 0; i < btns.length; i++)
        {


            //get the button's parent that has an ID -> the product card/row
            let product = btns[i].closest('[id]');
            //checkout button
            if(btns[i].classList.contains("btn-secondary"))
            {
                btns[i].addEventListener("click", function ()
                {
                    deleteStorage('cart');
                    showCartNoItems();
                });
            }
            //remove from cart button
            else if(btns[i].classList.contains("btn-close"))
            {
                btns[i].addEventListener("click", function ()
                {
                    cart.splice(getItemIndex(Number(product.id), cart), 1);
                    updateStorage(cart, "cart");
                    sum = Math.round(cart.reduce((accumulator, current) => accumulator + current.price, 0));
                    document.querySelectorAll(".container")[2].querySelector("div:nth-child(2)").textContent = `${sum}$`;
                    product.remove();
                    // cart is empty
                    if(cart === null || cart.length === 0)
                    {
                        showCartNoItems();
                    }
                });
            }
            else
            {
                console.log("error");
            }

        }
    }
}

function showCartNoItems()
{
    document.querySelector("body").innerHTML = ``;
    document.querySelector("body").innerHTML += `
        <div class = "container text-center vh-100 d-flex flex-column justify-content-center">
            <h1>it Seems you haven't ordered anything</h1>
            <div class = "d-flex justify-content-evenly">
            <span>wanna buy something?</span>
            <span>check out our <a href="products.html">shop</a></span>
        </div>
        </div>`;

}