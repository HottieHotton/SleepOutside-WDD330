import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { updateCartCounter } from "./productdetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

export function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems == undefined || cartItems.length <= 0) {
    window.alert("Your cart is empty, please add an item!");
    window.location.href = "/index.html";
  } else {
    let sortItems = cartItems;
    // Update quantities and remove duplicates
    let uniqueIds = [];
    sortItems = sortItems.reduce((acc, item) => {
      if (!uniqueIds.includes(item.Id)) {
        uniqueIds.push(item.Id);
        acc.push(item);
        item.quantity = item.quantity || 1;
      } else {
        let existingItem = acc.find((i) => i.Id === item.Id);
        if (existingItem) {
          existingItem.quantity += 1; // Increment quantity if duplicate
        }
      }
      return acc;
    }, []);

    setLocalStorage("so-cart", sortItems);

    const htmlItems = sortItems.map((item) => cartItemTemplate(item));
    let totalPrice = 0.0;
    sortItems.forEach((cost) => {
      let itemTotal = cost.quantity * cost.FinalPrice;
      totalPrice += itemTotal;
    });
    document.querySelector(".total").style.display = "grid";
    document.querySelector(".total").innerHTML =
      `<h3>Sub-Total: $${totalPrice}</h3>`;
    if (document.querySelector(".cart-product-list") != null) {
      document.querySelector(".cart-product-list").innerHTML =
        htmlItems.join("");
    }
    //add click event listener to each remove button and change quantity
    const removeButtons = document.querySelectorAll(".remove-item");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.target.dataset.id;
        removeFromCart(productId);
      });
    });
    const incrementButtons = document.querySelectorAll(".increment-quantity");
    incrementButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.target.dataset.id;
        updateItemQuantity(productId, 1);
      });
    });
    const decrementButtons = document.querySelectorAll(".decrement-quantity");
    decrementButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.target.dataset.id;
        updateItemQuantity(productId, -1);
      });
    });
  }
}

function removeFromCart(productId) {
  let cartItems = getLocalStorage("so-cart");
  cartItems = cartItems.filter((item) => item.Id !== productId);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
  updateCartCounter();
}

function updateItemQuantity(productId, change) {
  let cartItems = getLocalStorage("so-cart");
  const item = cartItems.find((item) => item.Id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      setLocalStorage("so-cart", cartItems);
      renderCartContents();
      updateCartCounter();
    }
  }
}

function cartItemTemplate(item) {
  const newItem = `
  <li class="cart-card divider">
    <section class="cart-details">
      <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
        <h2 class="card__name">${item.Name}</h2>
        <img src="${item.Images.PrimaryMedium}" alt="${item.Name}"/>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <span class="cart-card__quantity">Quantity: ${item.quantity}</span>
    </section>
    <div class="cart-card__quantity-controls">
      <button class="remove-item" data-id="${item.Id}">X</button>
      <button class="increment-quantity" data-id="${item.Id}">+</button>
      <button class="decrement-quantity" data-id="${item.Id}">-</button>
    </div>
  </li>`;
  return newItem;
}

// export function renderData() {
//   const cartItems = getLocalStorage("so-cart");
//   let sortItems = cartItems;
//   let uniqueIds = [];
//   sortItems = sortItems.reduce((acc, item) => {
//     if (!uniqueIds.includes(item.Id)) {
//       uniqueIds.push(item.Id);
//       acc.push(item);
//       item.quantity = item.quantity || 1;
//     } else {
//       let existingItem = acc.find((i) => i.Id === item.Id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       }
//     }
//     return acc;
//   }, []);
// }

renderCartContents();
async function init() {
  await loadHeaderFooter();
  await updateCartCounter();
}

init();
