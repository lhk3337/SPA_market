import { api } from "../api.js";
import { routeChange } from "../router.js";

export default function CartPage({ $target }) {
  // 타이틀
  const fetchCoupon = async () => {
    const couponApi = await api.fetchCoupon();
    this.setState({
      ...this.state,
      couponApi,
    });
  };
  fetchCoupon();
  const $page = document.createElement("div");
  $page.className = "CartPage";
  $page.innerHTML = `<h1>장바구니/결제</h1>`;
  $target.appendChild($page);

  // 홈 바로가기 버튼
  const homeBtn = () => {
    const $homeBtn = document.createElement("button");
    $homeBtn.className = "home__btn";
    $homeBtn.innerHTML = `<img src="/src/assets/icon-home-white.svg">`;
    $page.appendChild($homeBtn);
  };

  // 쿠폰 컴포넌트
  const couponComponent = (couponOptions) => {
    const $coupon = document.createElement("div");
    $coupon.className = "CouponeContainer";
    $page.appendChild($coupon);
    $coupon.innerHTML = `
    <h2>쿠폰 사용</h2>
    <hr />
    <div class="coupon__option__container">
      <div class="select-box">
        <div class="options-container">
          ${couponOptions
            .map(
              (couponOption) => `
          <div class="option">
            <input type="radio" class="radio" id="${couponOption.id}" value="${couponOption.id}" name="category" />
            <label for="${couponOption.id}">${couponOption.couponName}</label>
          </div>
        `
            )
            .join("")}
        </div>
        <div class="selected">옵션을 선택하세요</div>
      </div>
    </div>
    `;
    const $selected = document.querySelector(".selected");
    const optionsList = document.querySelectorAll(".option");
    const optionsContainer = document.querySelector(".options-container");
    const radio = document.querySelectorAll(".radio");
    $selected.addEventListener("click", () => {
      optionsContainer.classList.toggle("active");
    });
    optionsList.forEach((v, i) => {
      v.addEventListener("click", (e) => {
        $selected.innerHTML = v.querySelector("label").innerHTML;
        optionsContainer.classList.remove("active");
      });
    });
  };

  // setState
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  homeBtn();

  // render
  this.render = () => {
    if (this.state === undefined) {
      return;
    }
    const { couponApi } = this.state;

    couponComponent(couponApi);
  };
  document.querySelector(".home__btn").addEventListener("click", () => {
    routeChange("/");
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      return;
    }
  });
}
