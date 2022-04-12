import CartPage from "./components/CartPage.js";
import ProductList from "./components/ProductList/ProductList.js";
import { init } from "./router.js";
function App({ $target }) {
  this.route = () => {
    const { pathname } = location; // '/' 문자 뒤의 URL 경로를 값으로 하는 String을 반환
    $target.innerHTML = "";
    if (pathname === "/") {
      // 만일 경로가 '/'이면 $target(<div id="root"></div>)을 ProductList로 보냄
      new ProductList({ $target }).render();
    } else if (pathname === "/cart") {
      // 만일 경로가 '/cart'이면 $target(<div id="root"></div>)을 CartPage로 보냄
      new CartPage({
        $target,
      }).render();
    }
  };
  init(this.route);
  this.route();
  window.addEventListener("popstate", this.route);
}

export default App;
