import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCounter } from "./productdetails.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";


const category = getParams('category');
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();

async function init(){
  await loadHeaderFooter();
  await updateCartCounter();
}

init();