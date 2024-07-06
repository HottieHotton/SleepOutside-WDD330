import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCounter } from "./productdetails.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";



async function init() {
  await loadHeaderFooter();
  let form = document.getElementById("searchForm");
  const category = getParams("category");
  const dataSource = new ProductData();
  const element = document.querySelector(".product-list");
  let listing = new ProductList(category, dataSource, element);

  listing.init();
  
  if (form) {
    let searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent form from submitting normally
      const searchQuery = document.getElementById("searchCall").value;      
      listing = new ProductList(category, dataSource, element, searchQuery);

      listing.init();
    });
  }

  await updateCartCounter();
}

init();
