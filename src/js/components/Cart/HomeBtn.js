import { routeChange } from "../../router.js";
const HomeBtn = ($page) => {
  const $homeBtn = document.createElement("button");
  $homeBtn.className = "home__btn";
  $homeBtn.innerHTML = `<img src="/src/assets/icon-home-white.svg">`;
  $page.appendChild($homeBtn);

  document.querySelector(".home__btn").addEventListener("click", () => {
    routeChange("/");
  });
};

export default HomeBtn;
