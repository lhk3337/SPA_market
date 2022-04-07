import { api } from "../../api.js";

export default function ProductModal({ $target, productId }) {
  this.state = {
    product: null,
  };
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.fetchProduct = async () => {
    const product = await api.fetchProduct(productId);
    this.setState({
      ...this.state,
      product,
    });
  };
  this.fetchProduct();

  const $modal = document.createElement("div");
  $modal.className = "productModal";

  this.render = () => {
    if (this.state.product === null) {
      return;
    }
    const {
      product: { id, productName, price, stockCount, shippingFee, detailInfoImage, viewCount, thumbnailImg },
    } = this.state;

    $target.appendChild($modal);
    let getLiked = localStorage.getItem(productId);
    $modal.innerHTML = `
        <div class="product__content">
          <button class="closeBtn"><img src="/src/assets/icon-delete.svg" /></button>
            <div class="container">
              <div class="left__container">
                <img class="thumbnailImg" src="http://test.api.weniv.co.kr/${thumbnailImg}" />
              </div>
              <div class="right__container">
                <h2>${productName}</h2>
                <div class="price">
                  <span class="price__title">${price.toLocaleString("ko-KR")}</span><span>원</span>         
                </div>
                <p class="shipFee">택배배송 / ${
                  shippingFee === 0 ? "무료배송" : `${shippingFee.toLocaleString("ko-KR")}원`
                }
                </p>
              </div>
            <div>
        </div>
    `;
    const $closeBtn = document.querySelector(".closeBtn");
    $closeBtn.addEventListener("click", () => {
      $modal.remove();
    });
  };
}
