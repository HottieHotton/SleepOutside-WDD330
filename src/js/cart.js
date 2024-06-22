import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems == undefined || cartItems.length <= 0) {
    window.alert("Your cart is empty, please add an item!");
    window.location.href="/index.html";
  } else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    let totalPrice = 0.00;
    cartItems.forEach(cost => {
      totalPrice += cost.FinalPrice;
    });
    document.querySelector(".total").style.display = "grid";
    document.querySelector(".total").innerHTML = `<h3>Total: $${totalPrice}</h3>`
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
