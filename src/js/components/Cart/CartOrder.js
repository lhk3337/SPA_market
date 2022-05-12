import { getItem, removeItem } from "../../storage.js";
import { routeChange } from "../../router.js";
export default function OrderProduct({ products, $page, cartRender }) {
  const cartData = getItem("product_carts", []);

  const aaa = cartData.map((cartItem) => {
    return products.filter((value) => value.productId === cartItem.productId);
  });

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
    <li  class="check__cart">
      <input type="checkbox" data-item-id=${product.productId} name="checker${product.productId}" id="listCheck${
          product.productId
        }">
      <label for="listCheck${product.productId}"></label>
      <img class="cart__thumbnail" src="http://test.api.weniv.co.kr/${product.image}" />
      <h2>${product.productName}</h2>
      <h2>${product.productPrice}</h2>
      <p>${product.shippingFee}</p>
      <p>${product.optionName === null ? `수량 ${product.qty}개` : `${product.optionName} ${product.qty}개`}  </p>
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
