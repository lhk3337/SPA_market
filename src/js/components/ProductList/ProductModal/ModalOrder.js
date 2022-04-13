export default function ModalOrder({ $target, getLiked, data }) {
  const $component = document.createElement("div");
  $component.className = "right__container";
  $target.appendChild($component);
  this.state = data;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const {
      product: {
        id,
        productName,
        price,
        stockCount,
        shippingFee,
        discountPrice,
        detailInfoImage,
        discountRate,
        viewCount,
        thumbnailImg,
      },
      count,
    } = this.state;
    $component.innerHTML = `
    <h2>${productName}</h2>
    <div class="price">
    ${
      discountRate > 0
        ? `<div class="price__content">
            <span class="discount__price">${discountPrice.toLocaleString("ko-KR")}</span><div>원</div>
            <span class="original__price">${price.toLocaleString("ko-KR")}원</span>
            <span class="discountRate">${discountRate}%</span>
          </div>
          `
        : `
          <span class="price__title">${price.toLocaleString("ko-KR")}</span>
          <span>원</span>
          `
    }
    </div>
    <div class="${stockCount > 0 ? `` : `not__count__info`}">
      <p class="shipFee">택배배송 / ${shippingFee === 0 ? "무료배송" : `${shippingFee.toLocaleString("ko-KR")}원`}</p>
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
          <span class="price__text">
            총 수량 <span class="count">${count}</span>개
          </span>
          <div class="border"></div>
          <h2 class="total__price__title">
          ${
            discountRate > 0 ? (discountPrice * count).toLocaleString("ko-KR") : (count * price).toLocaleString("ko-KR")
          }
            
            <span class="total__price__text">원</span>
          </h2>
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
  
    `;
    const count__input = document.querySelector(".input__count");
    const minus__btn = document.getElementById("minus__btn");
    const plus__btn = document.getElementById("plus__btn");

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
  const discount = () => {
    const { price, discountRate } = this.state.product;
    const discounted = Math.round(price * (discountRate / 100)); // 할인가 계산
    const discountValue = Math.floor((price - discounted).toPrecision(2)); // 현재가 - 할인가
    if (discountRate > 0) {
      this.setState({ ...this.state, product: { ...this.state.product, discountPrice: discountValue } });
    } else {
      this.setState({ ...this.state, product: { ...this.state.product, discountPrice: 0 } });
    }
  };
  discount();
  this.render();
}
