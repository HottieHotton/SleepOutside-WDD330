import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCounter } from "./productdetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, element);

listing.init();

async function init(){
  await loadHeaderFooter();
  await updateCartCounter();
}

init();