import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import Alert from "./Alert.mjs";



function productDetailsTemplate(product) {
  return `
  <section class="product-detail"> 
  <h3>${product.Brand.Name}</h3>
  <h2 class="divider">${product.NameWithoutBrand}</h2>
  <img
  class="divider"
  src="${product.Images.PrimaryLarge}"
  alt="${product.NameWithoutBrand}"
  />
  <p class="product-card__price">$${product.FinalPrice}</p>
  <p class="product__color">${product.Colors[0].ColorName}</p>
  <p class="product__description">${product.DescriptionHtmlSimple}</p>
  <div class="product-detail__add">
  <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
  </div>
  </section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails("main");
    document
    .getElementById("addToCart")
    .addEventListener("click", this.addToCart.bind(this));

    // breadcrumb
    document.querySelector(".breadcrumb-item-category").innerHTML = this.product.Category;
    document.querySelector(".breadcrumb-item-category").setAttribute("href", `/product-listing/index.html?category=${this.product.Category}`);
    document.querySelector("#breadcrumb-item-product").innerHTML = this.product.NameWithoutBrand;
  }
  async addToCart() {
    let cart = await getLocalStorage("so-cart") || [];
    cart.push(this.product)
    await setLocalStorage("so-cart", cart);

    const alert = new Alert();
    alert.getAlerts();
    console.log(updateCartCounter());
    updateCartCounter();

  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product),
    );
  }
}


export function updateCartCounter(){
  let cart = getLocalStorage("so-cart") || [];
  // let sortItems = cart;
  // let uniqueIds = [];
  // sortItems = sortItems.reduce((acc, item) => {
  //   if (!uniqueIds.includes(item.Id)) {
  //     uniqueIds.push(item.Id);
  //     acc.push(item);
  //     item.quantity = item.quantity || 1;
  //   } else {
  //     let existingItem = acc.find((i) => i.Id === item.Id);
  //     if (existingItem) {
  //       existingItem.quantity += 1;
  //     }
  //   }
  //   return acc;
  // }, []).then(setLocalStorage('so-cart', sortItems));
  let cartCountElement = document.getElementById("cart-count");
  let total;
  if(cart[0].quantity != undefined){
    total=0;
    cart.forEach((count) =>{
      total += count.quantity
    })
  }else if(cart.length){
    total = cart.length
  }
  cartCountElement.textContent = total;
}