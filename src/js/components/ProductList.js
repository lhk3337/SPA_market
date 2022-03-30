import { api } from "../api.js";
export default function ProductList({ $target }) {
  const $page = document.createElement("div");
  $page.className = "ProductList";

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  const fetchProducts = async () => {
    const response = await api.fetchProductsList();
    this.setState([...response.data]);
  };
  fetchProducts();
  this.render = () => {
    $target.appendChild($page);
    if (!this.state) {
      return;
    }
    console.log(this.state);
    $page.innerHTML = `
    <ul>
      ${this.state
        .map(
          (product) => `
            <li class="list">
              <div class="listTop">
                <img src="http://test.api.weniv.co.kr/${product.thumbnailImg}" />
                ${product.stockCount === 0 ? `<div class="soldout"><p>SOLDOUT</p></div>` : ``}
              </div>
              <div class="content">
                <div class="title">
                  <h2>${
                    product.productName.length < 30 ? product.productName : product.productName.substring(0, 25) + "..."
                  }</h2>
                </div>
                <div class="prices">
                  <div class="price__content">
                    <span class="price">${product.price}</span>
                    <div>원</div>
                  </div>
                </div>
              </div>
            </li>
      `
        )
        .join("")}
    </ul>
    <a href="/cart"><button><img src="/src/assets/cart-btn.svg"></button></a>
  `;
  };
}
