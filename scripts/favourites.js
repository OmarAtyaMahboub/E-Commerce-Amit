
import {updateStorage, appendToStorage, getItemIndex, sessionCheck} from "./methods.js";

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
        <div class = "container text-center pt-5 pb-5">
            <h1>Your favorite products</h1>
        </div>
        <div class="container text-center">
            <div class="row"></div>
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
            <h1>it Seems you haven't favored anything</h1>
            <div class = "d-flex justify-content-evenly">
            <span>wanna favor something?</span>
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
