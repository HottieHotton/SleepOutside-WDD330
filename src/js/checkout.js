import { loadHeaderFooter } from "./utils.mjs";
import { updateCartCounter } from "./productdetails.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

// document
//   .querySelector(".zip")
//   .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));
// listening for click on the button
document.querySelector(".checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if(chk_status){
    myCheckout.checkout()};
});

async function load(){
    await loadHeaderFooter();
    await updateCartCounter();
}

load();