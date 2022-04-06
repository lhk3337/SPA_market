import { api } from "../../api.js";

export default function ProductModal({ $target, productId }) {
  this.state = {
    product: null,
  };
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const $modal = document.createElement("div");
  $modal.className = "productModal";

  this.render = () => {
    console.log(this.state);
    $target.appendChild($modal);
    $modal.innerHTML = `
        <div class="product__content">
          <button class="closeBtn">X</button>
          <h1>${productId}</h1>
		      <div class="modal_text">
            자바스크립트로 모달창을 만들어 봤습니다. 
		      </div>
        </div>
    `;
    const $closeBtn = document.querySelector(".closeBtn");
    $closeBtn.addEventListener("click", () => {
      $modal.remove();
    });
  };
  this.fetchProduct = async () => {
    const product = await api.fetchProduct(productId);
    this.setState({
      ...this.state,
      product,
    });
  };
  this.fetchProduct();
}
