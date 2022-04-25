import { api } from "../../api.js";
import { routeChange } from "../../router.js";
import ProductModal from "./ProductModal/ProductModal.js";
import { getItem, setItem, removeItem } from "../../storage.js";
export default function ProductList({ $target }) {
  const $page = document.createElement("div");
  $page.className = "ProductList";

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  const fetchProducts = async () => {
    const response = await api.fetchProductsList(); // api 데이터를 response에 저장
    this.setState([...response.data]); // setState의 매개변수 nextState로 들어가서 this.state에 저장한다.
  };
  fetchProducts();
  this.render = () => {
    // 화면이 표시 되는 부분
    $target.appendChild($page);
    // <div id="root"></div>아래에 className이 ProductList라는 div를 생성
    if (!this.state) {
      // api의 데이터가 없다면 출력하지 않고 return한다.
      return;
    }
    // 클래스가 ProductList인 div 아래 innerHTML을 통해 태그를 생성한다.
    $page.innerHTML = `
    <ul>
      ${this.state // API 데이터(배열 객체 구조)[{},{}], 맵을 통해 요소를 html태그에 적용하고 있다.
        .map((product) => {
          let liked = getItem(product.id, null);
          const discounted = Math.round(product.price * (product.discountRate / 100)); // 할인가 계산
          const discountValue = Math.floor((product.price - discounted).toPrecision(2)).toLocaleString("ko-KR"); // 현재가 - 할인가
          return `
            <li class="list" data-product-id="${product.id}">
              <div class="listTop">
                <img class="product__thumbnail" src="http://test.api.weniv.co.kr/${product.thumbnailImg}" />
                ${product.stockCount === 0 ? `<div class="soldout"><p>SOLDOUT</p></div>` : ``}
              </div>
              <div class="content">
                <div class="title">
                  <h2>${
                    product.productName.length < 30 ? product.productName : product.productName.substring(0, 25) + "..."
                  }</h2>
                  <div class="like__item">
                  ${
                    liked === null
                      ? `<button><img class="like__off" src="/src/assets/icon-heart.svg"></button>`
                      : `<button><img class="like__on" src="/src/assets/icon-heart-on.svg"></button>`
                  }
                  </div>
                </div>
                <div class="prices">
                ${
                  product.discountRate > 0 // 할인율이 있으면 할인가 적용 아니면 현재가
                    ? // 할인율 계산
                      `<div class="price__content">
                        <span class="price">${discountValue}</span><div>원</div>
                        <span class="original__price">${product.price.toLocaleString("ko-KR")}원</span>
                        <span class="discountRate">${product.discountRate}%</span>
                      </div>`
                    : `<div class="price__content">
                        <span class="price">${product.price.toLocaleString("ko-KR")}</span> 
                        <div>원</div>
                      </div>`
                }
                </div>
              </div>
            </li>
      `;
        })
        .join("")}
    </ul>
    <button class="cart__btn"><img src="/src/assets/cart-btn.svg"></button>
    `;

    document.querySelector(".cart__btn").addEventListener("click", () => {
      routeChange(`/cart`);
    });
  };

  // 각 리스트의 클릭 이벤트
  $page.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if ($li === null) {
      return;
    } else {
      const { productId } = $li.dataset;
      if (e.target.className === "product__thumbnail") {
        if (productId) {
          new ProductModal({
            $target,
            productId,
            listRender: () => this.render(),
          }).render();
        }
      } else if (e.target.className === "like__on") {
        removeItem(productId);
        this.render();
      } else if (e.target.className === "like__off") {
        setItem(productId, "true");
        this.render();
      }
    }
  });
}
// ${product.stockCount === 0 ? `<div class="soldout"><p>SOLDOUT</p></div>` : ``} stockCount가 0이면 soldout 표시
// product.productName.length < 30 ? product.productName : product.productName.substring(0, 25) + "..." 문자열이 길면 substring을 이용하여 문자열을 생략 후 말줄임표 삽입
// product.price.toLocaleString("ko-KR") 이부분은 천단위 콤마 설정
