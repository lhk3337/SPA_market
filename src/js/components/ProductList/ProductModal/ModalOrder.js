import { getItem, removeItem, setItem } from "../../../storage.js";
import { routeChange } from "../../../router.js";
export default function ModalOrder({ $target, data }) {
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
      product: { id, productName, price, stockCount, shippingFee, discountPrice, discountRate, viewCount, option },
      count,
      selectedOptions,
    } = this.state;
    let getLiked = getItem(id, null);
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
      ${
        Array.isArray(option) && option.length === 0
          ? `
        <div class="count__container">
          <button id="minus__btn">
            <img class="minus" src="/src/assets/icon-minus-line.svg" />
          </button>
          <input type="number" class="input__count" min="1" max="${stockCount}" value="${count}" />
          <button id="plus__btn">
            <img class="plus" src="/src/assets/icon-plus-line.svg" />
          </button>
        </div>
        `
          : `
        <div class="option__container">
          <div class="select-box">
            <div class="options-container">
              ${option
                .map(
                  (v) => `
              <div class="option">
                <input type="radio" class="radio" id="${v.id}" value="${v.id}" name="category" />
                <label for="${v.id}">${v.optionName} ${v.additionalFee > 0 ? `(+${v.additionalFee}원)` : ""}</label>
              </div>
              `
                )
                .join("")}
            </div>
            <div class="selected">옵션을 선택하세요</div>
          </div>
          ${selectedOptions
            .map(
              (selectedOption) => `
          <div class="option__count">
            <button class="close__option__Btn" data-option-id="${
              selectedOption.optionId
            }"><img src="/src/assets/icon-delete.svg" /></button>
            <h3 class="option__title">${selectedOption.optionName}</h3>
            <div class="option__price__container">
              <div class="option__count__container" data-count-id="${selectedOption.optionId}">
                <button id="option__minus__btn">
                  <img class="minus" src="/src/assets/icon-minus-line.svg" />
                </button>
                <input type="number" class="option__input__count" min="1" max="${stockCount}" value="${
                selectedOption.qty
              }"  data-option-inputid="${selectedOption.optionId}"/>
                <button id="option__plus__btn">
                  <img class="plus" src="/src/assets/icon-plus-line.svg" />
                </button>
              </div>
              <div>
                <span class="option__total__price">${
                  discountRate > 0
                    ? ((discountPrice + selectedOption.optionPrice) * selectedOption.qty).toLocaleString("ko-KR")
                    : (selectedOption.qty * (price + selectedOption.optionPrice)).toLocaleString("ko-KR")
                }</span>
              </div>
            </div>
          </div>
          `
            )
            .join("")}
        </div>
        `
      }

      </div>
      <div class="total__price__container">
        <h3>총 상품 금액</h3>
        <div class="total__price">
          <span class="price__text">
            총 수량 <span class="count">${
              Array.isArray(option) && option.length === 0
                ? `${count}`
                : `${selectedOptions.reduce((a, b) => a + b.qty, 0)}`
            }</span>개
          </span>
          <div class="border"></div>
          <h2 class="total__price__title">
          ${
            Array.isArray(option) && option.length === 0
              ? discountRate > 0
                ? (discountPrice * count).toLocaleString("ko-KR")
                : (count * price).toLocaleString("ko-KR")
              : discountRate > 0
              ? `${selectedOptions
                  .reduce((a, b) => a + (discountPrice + b.optionPrice) * b.qty, 0)
                  .toLocaleString("ko-KR")}`
              : `${selectedOptions.reduce((a, b) => a + b.qty * (price + b.optionPrice), 0)}`
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
            <div class="cart__detail__item">
              <img src="/src/assets/icon-shopping-cart.svg" />
            </div>
            <div class="add__cart__container">
              <span class="triangle"></span>
              <h1>장바구니에 추가되었습니다.</h1>
                <button class="go__cart__btn">장바구니 가기</button>
                <button class="continue__btn">계속 쇼핑 하기</button>
            </div>
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

    // 각각 태그를 선언
    const count__input = document.querySelector(".input__count");
    const minus__btn = document.getElementById("minus__btn");
    const plus__btn = document.getElementById("plus__btn");
    const $selected = document.querySelector(".selected");

    const optionsList = document.querySelectorAll(".option");
    const optionsContainer = document.querySelector(".options-container");
    const radio = document.querySelectorAll(".radio");
    const optionCloseBtn = document.querySelectorAll(".close__option__Btn");

    const optionCount = document.querySelectorAll(".option__count");
    const $buyBtn = document.querySelector(".buy__btn");
    const $cartBtn = document.querySelector(".cart__detail__item");

    // 옵션 선택을 클릭하면 count 및 가격 정보 창에 대한 이벤트 설정
    optionCount.forEach((v) => {
      v.addEventListener("change", (e) => {
        const { selectedOptions } = this.state;
        if (e.target.tagName === "INPUT") {
          const {
            dataset: { optionInputid },
          } = e.target;

          selectedOptions.map((value) => {
            if (value.optionId === parseInt(optionInputid)) {
              if (e.target.value <= 0) {
                value.qty = 1;
                this.render();
              } else if (e.target.value > stockCount) {
                value.qty = stockCount;
                this.render();
              } else {
                value.qty = parseInt(e.target.value);
                this.render();
              }
            }
          });
        }
      });
      v.addEventListener("click", (e) => {
        const id = v.querySelector(".option__count__container").dataset.countId;
        const count__input = v.querySelector(".option__input__count");
        if (e.target.className === "minus" || e.target.id === "option__minus__btn") {
          selectedOptions.map((value) => {
            if (value.optionId === parseInt(id)) {
              if (parseInt(count__input.value) === 1) {
                value.qty = parseInt(count__input.min);
                this.render();
              } else {
                value.qty = parseInt(value.qty) - 1;
                count__input.value = value.qty;
                this.render();
              }
            }
          });
        } else if (e.target.className === "plus" || e.target.id === "option__plus__btn") {
          selectedOptions.map((value) => {
            if (value.optionId === parseInt(id)) {
              if (parseInt(count__input.max) <= parseInt(count__input.value)) {
                value.qty = parseInt(count__input.max);
                this.render();
              } else {
                value.qty = parseInt(value.qty) + 1;
                count__input.value = value.qty;
                this.render();
              }
            }
          });
        }
      });
    });

    // 옵션 선택 시 이벤트 설정
    if (Array.isArray(option) && option.length !== 0) {
      // 옵션값이 있을경우 이벤트 실행
      $selected.addEventListener("click", () => {
        optionsContainer.classList.toggle("active");
      });
      optionsList.forEach((v, i) => {
        v.addEventListener("click", (e) => {
          $selected.innerHTML = v.querySelector("label").innerHTML;
          optionsContainer.classList.remove("active");
          if (e.target.tagName === "LABEL" || e.target.className === "option") {
            const {
              product: { option },
              selectedOptions,
            } = this.state;
            const selectedOptionId = parseInt(radio[i].value);
            const optionItem = option.find((optionValue) => optionValue.id === selectedOptionId);
            const selectedOption = selectedOptions.find(
              (selectedOption) => selectedOption.optionId === selectedOptionId
            );
            if (optionItem && !selectedOption) {
              const nextSelectedOptions = [
                ...selectedOptions,
                {
                  optionId: optionItem.id,
                  optionName: optionItem.optionName,
                  optionPrice: optionItem.additionalFee,
                  qty: 1,
                },
              ];
              this.setState({
                ...this.state,
                selectedOptions: nextSelectedOptions,
              });
            }
          }
        });
      });
      // 옵션 밑에 X 버튼 클릭시 삭제 이벤트
      optionCloseBtn.forEach((v) => {
        v.addEventListener("click", () => {
          const { optionId } = v.dataset;
          const { selectedOptions } = this.state;
          this.setState({
            ...this.state,
            selectedOptions: selectedOptions.filter((task) => task.optionId !== parseInt(optionId)),
          });
        });
      });
    } else {
      // 옵션값이 없을경우 이벤트 실행
      count__input.addEventListener("change", (e) => {
        // input 카운트 이벤트
        if (e.target.value <= 0) {
          this.setState({ ...this.state, count: parseInt(1) });
        } else if (e.target.value > stockCount) {
          this.setState({ ...this.state, count: parseInt(stockCount) });
        } else {
          this.setState({ ...this.state, count: parseInt(e.target.value) });
        }
      });
      minus__btn.addEventListener("click", () => {
        // 마이너스 버튼 이벤트
        if (parseInt(count__input.value) === 1) {
          this.setState({ ...this.state, count: parseInt(count__input.min) });
        } else {
          this.setState({ ...this.state, count: parseInt(this.state.count) - 1 });
          count__input.value = this.state.count;
        }
      });

      plus__btn.addEventListener("click", () => {
        // 플러스 버튼 이벤트
        if (parseInt(count__input.max) <= parseInt(count__input.value)) {
          this.setState({ ...this.state, count: parseInt(count__input.max) });
        } else {
          this.setState({ ...this.state, count: parseInt(this.state.count) + 1 });
          count__input.value = this.state.count;
        }
      });
    }

    const addsetItems = (className) => {
      const { selectedOptions } = this.state;
      const cartData = getItem("product_carts", []);
      if (stockCount > 0) {
        setItem(
          "product_carts",
          cartData.concat(
            Array.isArray(option) && option.length === 0
              ? {
                  qty: count,
                  optionId: null,
                  price: discountRate > 0 ? discountPrice : price,
                  productId: id,
                }
              : selectedOptions.map((selectedOption) => ({
                  qty: selectedOption.qty,
                  optionId: selectedOption.optionId,
                  price: discountRate > 0 ? discountPrice : price,
                  productId: id,
                }))
          )
        );
        if (className === "buy__btn") {
          routeChange("/cart");
        } else {
          document.querySelector(".add__cart__container").style.display = "flex";
        }
      }
    };

    $buyBtn.addEventListener("click", (e) => {
      addsetItems(e.target.className);
    });

    $cartBtn.addEventListener("click", (e) => {
      addsetItems(e.target.className);
    });

    if (stockCount > 0) {
      const $goCartBtn = document.querySelector(".go__cart__btn");
      const $continueCartBtn = document.querySelector(".continue__btn");

      $continueCartBtn.addEventListener("click", () => {
        document.querySelector(".add__cart__container").style.display = "none";
      });
      $goCartBtn.addEventListener("click", () => {
        routeChange("/cart");
      });
    }
  };

  const discount = () => {
    // 할인 가격을 계산해서 setState의 this.state 객체에 넣음
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
