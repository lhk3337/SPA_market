import { api } from "../../../api.js";
import ModalOrder from "./ModalOrder.js";
export default function ProductModal({ $target, productId, listRender }) {
  this.state = {
    product: null,
    count: 1,
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
    console.log(this.state);
    const {
      product: { thumbnailImg },
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
            </div>
          <div class="product__info">
            <h1 class="info__title">상품 정보</h1>
          </div>
        </div>
    `;

    const $closeBtn = document.querySelector(".closeBtn");
    $closeBtn.addEventListener("click", () => {
      $modal.remove();
      listRender();
    });
    new ModalOrder({
      $target: $modal.querySelector(".container"),
      getLiked: getLiked,
      data: this.state,
    });
  };

  $modal.addEventListener("click", (e) => {
    if (e.target.className === "like__detail__on") {
      localStorage.removeItem(productId, "true");
      this.render();
    } else if (e.target.className === "like__detail__off") {
      localStorage.setItem(productId, "true");
      this.render();
    }
  });
}
