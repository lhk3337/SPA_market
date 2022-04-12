import { api } from "../../api.js";

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
      product: { id, productName, price, stockCount, shippingFee, detailInfoImage, viewCount, thumbnailImg },
      count,
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
                <div class="${stockCount > 0 ? `` : `not__count__info`}">
                  <p class="shipFee">택배배송 / ${
                    shippingFee === 0 ? "무료배송" : `${shippingFee.toLocaleString("ko-KR")}원`
                  }
                  </p>
                  <div class="count__box">
                    <div class="count__countainer">
                      <button id="minus__btn">
                        <img class="minus" src="/src/assets/icon-minus-line.svg" />
                      </button>
                      <input type="number" class="input__count" min="1" max="${stockCount}" value="${count}" />
                      <button id="plus__btn">
                        <img class="plus" src="/src/assets/icon-plus-line.svg" />
                      </button>
                    </div>
                  </div>
                  <div class="total__price__container">
                    <h3>총 상품 금액</h3>
                    <div class="total__price">
                      <span class="price__text">총 수량 <span class="count">${count}</span>개</span>
                      <div class="border"></div>
                      <h2 class="total__price__title">${(count * price).toLocaleString(
                        "ko-KR"
                      )}<span class="total__price__text">원</span></h2>
                    </div>
                  </div>
                </div>
                <div class="btn__container ${stockCount > 0 ? `` : `margin`}">
                ${
                  stockCount > 0
                    ? `
                  <button class="buy__btn">바로 구매</button>
                  <div class="cart__detail__item"><img src="/src/assets/icon-shopping-cart.svg" /></div>
                `
                    : `
                  <button class="buy__btn   cancel">품절된 상품입니다.</button>
                  <div class="cart__detail__item cancel"><img src="/src/assets/icon-shopping-cart-white.svg" /></div>
                `
                }
                  <div class="like__detail__item">
                  ${
                    getLiked === null
                      ? `<img class="like__detail__off" src="/src/assets/icon-heart.svg">`
                      : `<img class="like__detail__on" src="/src/assets/icon-heart-on.svg">`
                  }
                  </div>
                </div>
              </div>
            </div>
          <div class="product__info">
            <h1 class="info__title">상품 정보</h1>
          </div>
        </div>
    `;
    const $closeBtn = document.querySelector(".closeBtn");
    const count__input = document.querySelector(".input__count");
    const minus__btn = document.getElementById("minus__btn");
    const plus__btn = document.getElementById("plus__btn");

    $closeBtn.addEventListener("click", () => {
      $modal.remove();
      listRender();
    });

    count__input.addEventListener("change", (e) => {
      if (e.target.value <= 0) {
        this.setState({ ...this.state, count: parseInt(1) });
      } else if (e.target.value > stockCount) {
        this.setState({ ...this.state, count: parseInt(stockCount) });
      } else {
        this.setState({ ...this.state, count: parseInt(e.target.value) });
      }
    });

    minus__btn.addEventListener("click", () => {
      if (parseInt(count__input.value) === 1) {
        this.setState({ ...this.state, count: parseInt(count__input.min) });
      } else {
        this.setState({ ...this.state, count: parseInt(this.state.count) - 1 });
        count__input.value = this.state.count;
      }
    });

    plus__btn.addEventListener("click", () => {
      if (parseInt(count__input.max) <= parseInt(count__input.value)) {
        this.setState({ ...this.state, count: parseInt(count__input.max) });
      } else {
        this.setState({ ...this.state, count: parseInt(this.state.count) + 1 });
        count__input.value = this.state.count;
      }
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
