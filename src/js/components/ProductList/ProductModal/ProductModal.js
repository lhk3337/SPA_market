import { api } from "../../../api.js";
import ModalOrder from "./ModalOrder.js";
import { getItem, removeItem, setItem } from "../../../storage.js";
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
    const {
      product: { thumbnailImg, pubDate, stockCount, detailInfoImage },
    } = this.state;
    $target.appendChild($modal);
    let getLiked = getItem(productId, null);
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
            <table>
              <tr>
                <td class="title">상품 번호</td>
                <td class="content">${pubDate.replace(/\-/g, "")}</td>
                <td class="title">재고 수량</td>
                <td class="content">${stockCount > 0 ? `${stockCount}개` : "-"}</td>
              </tr>
            </table>
          </div>
          <div class="detail__page">
            ${detailInfoImage.map((image) => `<img src="http://test.api.weniv.co.kr/${image}" />`).join("")}
          </div>
        </div>
    `;

    const $closeBtn = document.querySelector(".closeBtn");
    $closeBtn.addEventListener("click", () => {
      $modal.remove();
      listRender();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        $modal.remove();
      }
    });
    console.log(this.state);
    new ModalOrder({
      $target: $modal.querySelector(".container"),
      data: {
        product: this.state.product,
        count: this.state.count,
        getLiked: getLiked,
        selectedOptions: [],
      },
    });
  };

  $modal.addEventListener("click", (e) => {
    if (e.target.className === "like__detail__on") {
      removeItem(productId, "true");
      this.render();
    } else if (e.target.className === "like__detail__off") {
      setItem(productId, "true");
      this.render();
    }
  });
}
