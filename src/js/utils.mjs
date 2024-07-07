// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

export function getParams(params){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(params)
  return product;
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback)
{
  parentElement.insertAdjacentHTML("afterbegin", template)
  if(callback) {
    callback(data);
  }
}

export async function loadHeaderFooter()
{
  const header = await loadTemplate("/partials/header.html")
  const footer = await loadTemplate("/partials/footer.html")

  const headerElement = document.querySelector("#main-header")
  const footerElement = document.querySelector("#footer")

  renderWithTemplate(header, headerElement)
  renderWithTemplate(footer, footerElement)
}

export async function loadTemplate(path) {
  const res =  await fetch(path)
  const template =  await res.text()
  return template;
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<b>${message} <span>X</span></b>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      section.removeChild(this);
    }
  });
  const section = document.querySelector("section");
  section.prepend(alert);

  if (scroll) window.scrollTo(0, 0);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("section").removeChild(alert));
}