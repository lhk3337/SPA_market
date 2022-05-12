export default function CouponContainer({ couponOptions, $page }) {
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
            .reverse()
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
}
