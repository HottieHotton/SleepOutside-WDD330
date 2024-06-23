import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCounter } from "./productdetails.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, element);

listing.init();


  // Call updateCartCount on page load
  document.addEventListener("DOMContentLoaded", () => {
    updateCartCounter();
  });