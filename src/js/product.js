import ProductData from "./ProductData.mjs";
import ProductDetails from "./productdetails.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";
import { updateCartCounter } from "./productdetails.mjs";

const productId = getParams("product");
const dataSource = new ProductData();

const product = new ProductDetails(productId, dataSource);
product.init();

async function init(){
    await loadHeaderFooter();
    await updateCartCounter();
}
  
init();