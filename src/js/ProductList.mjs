import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement, searchQuery) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.searchQuery = searchQuery || null;
    this.products = [];
  }

  async init() {
    try {
      const list = await this.dataSource.getData(this.category);
      // delete duplicated products
      this.products = list.filter(
        (product, index, self) =>
          index === self.findIndex((p) => p.Id === product.Id),
      );
      if (this.products.length > 0) {
        if (this.searchQuery != null) {
          let searchFilter = [];
          list.forEach((element) => {
            if (element.Name.includes(this.searchQuery)) {
              searchFilter.push(element);
            }
          });
          this.renderList(searchFilter);
          document.querySelector(".title").innerHTML = this.searchQuery;
          document.querySelector(".breadcrumb-item-category").innerHTML =
            `${this.category} (${this.products.length})`;
          this.addSortEventListeners();
        } else {
          this.renderList(this.products);
          document.querySelector(".title").innerHTML = this.category;
          document.querySelector(".breadcrumb-item-category").innerHTML =
            `${this.category} (${this.products.length})`;
          this.addSortEventListeners();
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  renderList(list) {
    // Clean list to avoid duplicated products
    this.listElement.innerHTML = "";
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  sortByNameAZ() {
    this.products.sort((a, b) => a.Name.localeCompare(b.Name));
    this.renderList(this.products);
  }

  sortByNameZA() {
    this.products.sort((a, b) => b.Name.localeCompare(a.Name));
    this.renderList(this.products);
  }

  sortByPriceLowHigh() {
    this.products.sort((a, b) => a.FinalPrice - b.FinalPrice);
    this.renderList(this.products);
  }

  sortByPriceHighLow() {
    this.products.sort((a, b) => b.FinalPrice - a.FinalPrice);
    this.renderList(this.products);
  }

  addSortEventListeners() {
    const sortSelect = document.getElementById("sort-select");

    if (sortSelect) {
      sortSelect.addEventListener("change", (event) => {
        switch (event.target.value) {
          case "name-az":
            this.sortByNameAZ();
            break;
          case "name-za":
            this.sortByNameZA();
            break;
          case "price-low-high":
            this.sortByPriceLowHigh();
            break;
          case "price-high-low":
            this.sortByPriceHighLow();
            break;
        }
      });
    }
  }
}
