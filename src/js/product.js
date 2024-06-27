import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productdetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { updateCartCounter } from "./productdetails.mjs";

const productId = getParams("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();

await loadHeaderFooter();
await updateCartCounter();