document.addEventListener('DOMContentLoaded', function () {

    var startBtn = document.getElementById("start-order-btn");
    var welcome = document.getElementById("welcome-screen");;
    var menu = document.getElementById("menu-screen");
    var sideNavigation = document.querySelector(".side-navigation");
    var sidebar = document.querySelector(".sidebar");

    startBtn.addEventListener("click", function () {
        welcome.style.display = "none";
        menu.style.display = "block";
        sideNavigation.style.left = "0px";
        sidebar.style.right = "0px";

        document.querySelector(".sandwich--icon").style.display = "none";
        document.querySelector(".cart-icon").style.display = "none";
    });

    var cartItems = [];
    var total = 0;

    var cartCount = document.querySelector(".cart-icon span");
    var orderItems = document.querySelector(".order-items");
    var cartTotal = document.querySelector(".cart-total");

    function updateCart() {
        orderItems.innerHTML = "";
        cartCount.textContent = cartItems.reduce((sum, item) => sum + item.qty, 0);
        cartItems.forEach((item, index) => {
            var itemDiv = document.createElement("div");
            itemDiv.className = "order-item";
            itemDiv.innerHTML = `
                ${item.qty}x ${item.name} - ₱${(item.qty * item.price).toFixed(2)}
                <button class='remove-btn' data-i='${index}'>x</button>
            `;
            orderItems.appendChild(itemDiv);
        });
        cartTotal.textContent = "₱" + total.toFixed(2);

        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                var index = this.getAttribute("data-i");
                total -= cartItems[index].price * cartItems[index].qty;
                cartItems.splice(index, 1);
                updateCart();
            });
        });
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            var card = this.closest(".card");
            var title = card.querySelector(".card--title").textContent.trim();
            var priceText = card.querySelector(".price").textContent;
            var priceNum = parseFloat(priceText.replace("₱", ""));;

            var found = cartItems.find(item => item.name === title);
            if (found) {
                found.qty += 1;
            } else {
                cartItems.push({ name: title, price: priceNum, qty: 1 });
            }
            total += priceNum;
            updateCart();
        });
    });

    // Ccartegory filter
    var categories = document.querySelectorAll(".category-item");
    var cards = document.querySelectorAll(".card");

    categories.forEach(categoryBtn => {
        categoryBtn.addEventListener("click", function () {
            var category = this.getAttribute("data-category");
            categories.forEach(c => c.classList.remove("active"));
            this.classList.add("active");

            cards.forEach(card => {
                var cardCat = card.getAttribute("data-category");
                card.style.display = (category === "all" || cardCat === category) ? "flex" : "none";
            });
        });
    });

    // side navigation bar
    document.querySelectorAll(".side-nav-item").forEach(btn => {
        btn.addEventListener("click", function () {
            var cat = this.getAttribute("data-category");;
            var match = document.querySelector(".category-item[data-category='" + cat + "']");
            if (match) match.click();
        });
    });

    var closeNav = document.querySelector(".close-side-nav");
    if (closeNav) {
        closeNav.addEventListener("click", function (e) {
            e.preventDefault();
        });
    }

    // CHheckout
    var checkoutBtn = document.querySelector(".checkout-btn");
    checkoutBtn.addEventListener("click", function () {
        if (cartItems.length === 0) {
            alert("Select your items to proceed dumbass.");
        } else {
            alert("Order done. Total: ₱" + total.toFixed(2));
            cartItems = [];
            total = 0;
            updateCart();
            orderItems.innerHTML = "<div class='empty-cart'>Your cart is empty</div>";
        }
    });

    // searchbarr
    var searchInput = document.querySelector(".search--box input");
    searchInput.addEventListener("input", function () {
        var term = this.value.toLowerCase();
        cards.forEach(card => {
            var name = card.querySelector(".card--title").textContent.toLowerCase();
            card.style.display = name.includes(term) ? "flex" : "none";
        });
    });

});
