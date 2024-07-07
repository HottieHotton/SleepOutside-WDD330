import { getLocalStorage, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }
  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }
  calculateItemSummary() {
    const summaryElement = document.querySelector(
      this.outputSelector + " .cartTotal"
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + " .num-items"
    );
    let totalPrice = 0.00;
    let total = 0;
    this.list.forEach((count) =>{
        total += count.quantity;
      })
    itemNumElement.innerHTML = total;
    // calculate the total of all the items in the cart
    this.list.forEach((cost) => {
        let itemTotal = cost.quantity * cost.FinalPrice;
        totalPrice = totalPrice + itemTotal;
      });
    summaryElement.innerHTML = "$" + totalPrice.toFixed(2);
    this.calculateOrdertotal(total, totalPrice);
  }
  calculateOrdertotal(total, totalPrice) {
    this.shipping = 10 + (total - 1) * 2;
    this.tax = (totalPrice * 0.06).toFixed(2);
    this.orderTotal = parseFloat(totalPrice) + parseFloat(this.shipping) + parseFloat(this.tax);
    this.displayOrderTotals();
  }
  displayOrderTotals() {
    const shipping = document.querySelector(".shipping");
    const tax = document.querySelector(".tax");
    const orderTotalField = document.querySelector(".orderTotal");
    shipping.innerHTML = "$" + this.shipping;
    tax.innerHTML = "$" + this.tax;
    orderTotalField.innerHTML = "$" + this.orderTotal;
  }
  async checkout() {
    const formElement = document.forms["checkout"];

    const json = formDataToJSON(formElement);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = parseFloat(this.tax);
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    try {
      const res = await services.checkout(json);
      console.log(res);
      window.location.href= "/checkout/success.html";
      setLocalStorage('so-cart',[])
    } catch (err) {
      removeAllAlerts();
      for (let message in err.message) {
        alertMessage(err.message[message]);
      }
    }
  }
}