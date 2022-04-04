import { api } from "../api.js";
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
    console.log(this.state);
    // 클래스가 ProductList인 div 아래 innerHTML을 통해 태그를 생성한다.
    $page.innerHTML = `
    <ul>
      ${this.state // API 데이터(배열 객체 구조)[{},{}], 맵을 통해 요소를 html태그에 적용하고 있다.
        .map(
          (product) => `
            <li class="list">
              <div class="listTop">
                <img src="http://test.api.weniv.co.kr/${product.thumbnailImg}" />
                ${product.stockCount === 0 ? `<div class="soldout"><p>SOLDOUT</p></div>` : ``}
              </div>
              <div class="content">
                <div class="title">
                  <h2>${
                    product.productName.length < 30 ? product.productName : product.productName.substring(0, 25) + "..."
                  }</h2>
                </div>
                <div class="prices">
                  <div class="price__content">
                    <span class="price">${product.price.toLocaleString("ko-KR")}</span>
                    <div>원</div>
                  </div>
                </div>
              </div>
            </li>
      `
        )
        .join("")}
    </ul>
    <a href="/cart"><button><img src="/src/assets/cart-btn.svg"></button></a>
  `;
  };
}
