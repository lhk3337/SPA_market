import { getItem, removeItem } from "../../storage.js";
import { routeChange } from "../../router.js";
export default function OrderProduct({ products, $page, cartRender }) {
  const $product = document.createElement("div");
  $product.className = "OrderProductContainer";
  $page.appendChild($product);
  $product.innerHTML = `<h2>주문 상품</h2>
    <hr />
    <div class="btn__container">
      <button class="sel__cancel__btn">선택 삭제하기</button>
    </div>
    <div class="title">
      <input type="checkbox" name="checker" id="titleCheck">
      <label for="titleCheck"></label>
      <p>상품정보</p>
      <p>쿠폰 할인</p>
      <p>배송비</p>
      <p>주문금액</p>
    </div>
    <ul>
    ${products
      .map(
        (product) => `
    <li class="check__cart">
      <input type="checkbox" data-item-id=${product.productId} name="checker${product.productId}" id="listCheck${
          product.productId
        }">
      <label for="listCheck${product.productId}"></label>
      <img class="cart__thumbnail" src="http://test.api.weniv.co.kr/${product.image}" />
      <div class="cart__product__info">
        <p>${product.productName.length < 25 ? product.productName : product.productName.substring(0, 20) + "..."}</p>
        <h3>${product.productPrice}원</h3>
        <p class="count">${
          product.option === undefined
            ? product.optionName === null
              ? `수량 ${product.qty}개`
              : `옵션 : ${product.optionName}(수량: ${product.qty}개)`
            : `${product.option
                .map((item) => `<span>옵션 : ${item.optionName}(수량: ${item.qty}개)</span>`)
                .join(" / ")}`
        }  </p>
      </div>
      <div class="cart__right__container">
        <div class="coupon__discount">
          <p>Hack Your Life 개발자 노트북...</p>
          <h3>-2000원</h3>
        </div>
        <p class="cart__shipFee">${product.shippingFee > 0 ? `${product.shippingFee}원` : "무료배송"}</p>
        <h3 class="cart__price">${product.productPrice + product.shippingFee}원</h3>
      </div>
    </li>
    `
      )
      .join("")}
    </ul>
    `;
  const btn = document.querySelector(".sel__cancel__btn");

  btn.addEventListener("click", () => {
    routeChange("/");
    removeItem("product_carts", []);
  });
}
