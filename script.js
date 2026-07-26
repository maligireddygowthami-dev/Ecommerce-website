// Get all product cards
const products = document.querySelectorAll(".product");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");
const sortPrice = document.getElementById("sortPrice");
const cartCount = document.getElementById("cart-count");

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

// Add product to cart
function addToCart(productName) {
    cart.push(productName);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(productName + " added to cart!");
}

// Update cart number
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Search products
searchInput.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    products.forEach(product => {

        let name = product.querySelector("h3").textContent.toLowerCase();

        if (name.includes(value)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });

});

// Filter by category
categoryFilter.addEventListener("change", function () {

    let category = this.value;

    products.forEach(product => {

        if (category === "all") {
            product.style.display = "block";
        } else if (product.classList.contains(category)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });

});

// Sort by price
sortPrice.addEventListener("change", function () {

    let container = document.querySelector(".products");

    let items = Array.from(products);

    items.sort(function (a, b) {

        let priceA = Number(a.dataset.price);
        let priceB = Number(b.dataset.price);

        if (sortPrice.value === "low") {
            return priceA - priceB;
        }

        if (sortPrice.value === "high") {
            return priceB - priceA;
        }

        return 0;

    });

    items.forEach(item => container.appendChild(item));

});
