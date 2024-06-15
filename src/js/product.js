import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Initialize the cart array from local storage if it exists, otherwise set it to an empty array.
let cart = getLocalStorage("so-cart") || [];

function addProductToCart(list) {
  setLocalStorage("so-cart", list);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  cart.push(product);
  addProductToCart(cart);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
