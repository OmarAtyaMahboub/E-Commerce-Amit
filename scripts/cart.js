
import {updateStorage, deleteStorage, getItemIndex, sessionCheck} from "./methods.js";

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
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a href="index.html"><img src="../imgs/Screenshot_2024-10-23_155910-removebg-preview.png" alt=""></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="products.html">special offers</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="contactUs.html">Contact Us</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="aboutus.html">About Us</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Category
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="products.html">Smart Phone</a></li>
                            <li><a class="dropdown-item" href="products.html">Home Decoration</a></li>
                            <li><a class="dropdown-item" href="products.html">Groceries</a></li>
                            <li><a class="dropdown-item" href="products.html">Skin Care</a></li>
                            <li><a class="dropdown-item" href="products.html">Fragrances</a></li>
                            <li><a class="dropdown-item" href="products.html">Laptops</a></li>
                        </ul>
                    </li>
                </ul>
                <form class="d-flex search" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <a id="search-icon" href="#"><i class="fa-solid fa-magnifying-glass"></i></a>
                </form>

                <form class="icons">
                    <a href="cart.html"><i class="fa-solid fa-cart-shopping"></i></a>
                    <a href="favourites.html"><i class="fa-solid fa-heart"></i></a>
                    <a href="login.html"><i class="fa-solid fa-user"></i></a>
                </form>
            </div>
        </div>
    </nav>
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
        </div>
    <footer class="bg-dark text-center text-white mt-5">
        <div class="container p-4">
            <div class="mb-4">
                <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i class="fab fa-facebook-f"></i></a>
                <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i class="fab fa-twitter"></i></a>
                <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i class="fab fa-google"></i></a>
                <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i class="fab fa-instagram"></i></a>
                <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i class="fab fa-linkedin-in"></i></a>
                <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i class="fab fa-github"></i></a>
            </div>
            <div class="mb-4">
            </div>
            <div class="">
                <div class="row">
                <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                    <h5 class="text-uppercase">CATEGORY</h5>

                    <ul class="list-unstyled mb-0">
                    <li><a href="products.html" class="text-white">Smart phones</a></li>
                    <li><a href="products.html" class="text-white">Home decortion</a></li>
                    <li><a href="products.html" class="text-white">Skin Care</a></li>
                    <li><a href="products.html" class="text-white">Fragrances</a></li>
                    <li><a href="products.html" class="text-white">Laptobs</a></li>
                    </ul>
                </div>

                <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                    <h5 class="text-uppercase">Contact Us</h5>

                    <ul class="list-unstyled mb-0">
                    <li><a href="#!" class="text-white">Facebook</a></li>
                    <li><a href="#!" class="text-white">Twitter</a></li>
                    <li><a href="#!" class="text-white">Instagram</a></li>
                    <li><a href="#!" class="text-white">linkedIn</a></li>
                    </ul>
                </div>
                </div>
            </div>
        </div>

        <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
        © 2024 Copyright:
        <a class="text-white" href="https://yourwebsite.com/">yourwebsite.com</a>
        </div>
  </footer>`;

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
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a href="index.html"><img src="../imgs/Screenshot_2024-10-23_155910-removebg-preview.png" alt=""></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="products.html">special offers</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="contactUs.html">Contact Us</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="aboutus.html">About Us</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Category
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="products.html">Smart Phone</a></li>
                            <li><a class="dropdown-item" href="products.html">Home Decoration</a></li>
                            <li><a class="dropdown-item" href="products.html">Groceries</a></li>
                            <li><a class="dropdown-item" href="products.html">Skin Care</a></li>
                            <li><a class="dropdown-item" href="products.html">Fragrances</a></li>
                            <li><a class="dropdown-item" href="products.html">Laptops</a></li>
                        </ul>
                    </li>
                </ul>
                <form class="d-flex search" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <a id="search-icon" href="#"><i class="fa-solid fa-magnifying-glass"></i></a>
                </form>

                <form class="icons">
                    <a href="cart.html"><i class="fa-solid fa-cart-shopping"></i></a>
                    <a href="favourites.html"><i class="fa-solid fa-heart"></i></a>
                    <a href="login.html"><i class="fa-solid fa-user"></i></a>
                </form>
            </div>
        </div>
    </nav>
    <div class = "container text-center vh-100 d-flex flex-column justify-content-center">
        <h1>it Seems you haven't ordered anything</h1>
        <div class = "d-flex justify-content-evenly">
        <span>wanna buy something?</span>
        <span>check out our <a href="products.html">shop</a></span>
    </div>
    </div>
      <footer class="bg-dark text-center text-white mt-5">
    <div class="container p-4">
      <div class="mb-4">
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i class="fab fa-facebook-f"></i></a>
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i class="fab fa-twitter"></i></a>
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i class="fab fa-google"></i></a>
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i class="fab fa-instagram"></i></a>
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i class="fab fa-linkedin-in"></i></a>
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i class="fab fa-github"></i></a>
      </div>

      <div class="mb-4">

      </div>

      <div class="">
        <div class="row">
          <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 class="text-uppercase">CATEGORY</h5>

            <ul class="list-unstyled mb-0">
              <li><a href="products.html" class="text-white">Smart phones</a></li>
              <li><a href="products.html" class="text-white">Home decortion</a></li>
              <li><a href="products.html" class="text-white">Skin Care</a></li>
              <li><a href="products.html" class="text-white">Fragrances</a></li>
              <li><a href="products.html" class="text-white">Laptobs</a></li>
            </ul>
          </div>

          <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 class="text-uppercase">Contact Us</h5>

            <ul class="list-unstyled mb-0">
              <li><a href="#!" class="text-white">Facebook</a></li>
              <li><a href="#!" class="text-white">Twitter</a></li>
              <li><a href="#!" class="text-white">Instagram</a></li>
              <li><a href="#!" class="text-white">linkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
      © 2024 Copyright:
      <a class="text-white" href="https://yourwebsite.com/">yourwebsite.com</a>
    </div>
  </footer>`;

}

if(sessionCheck())
{
    main();
}
