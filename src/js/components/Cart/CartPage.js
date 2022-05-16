import { api } from "../../api.js";
import { getItem, removeItem } from "../../storage.js";
import HomeBtn from "./HomeBtn.js";
import CouponContainer from "./Coupon.js";
import OrderProduct from "./CartOrder.js";

export default function CartPage({ $target }) {
  const cartData = getItem("product_carts", []);

  // setState
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const fetchData = async () => {
    const couponApi = await api.fetchCoupon();
    const products = await Promise.all(
      cartData.map(async (cartItem) => {
        const product = await api.fetchProduct(cartItem.productId);
        const selectedOption = product.option.find((option) => option.id === cartItem.optionId);

        return {
          productId: product.id,
          image: product.thumbnailImg,
          productName: product.productName,
          productPrice: cartItem.price,
          discountRate: product.discountRate,
          shippingFee: product.shippingFee,
          optionId: selectedOption?.id !== undefined ? selectedOption?.id : null,
          optionName: selectedOption?.optionName !== undefined ? selectedOption?.optionName : null,
          optionPrice: selectedOption?.additionalFee !== undefined ? selectedOption?.additionalFee : null,
          qty: cartItem.qty,
        };
      })
    );

    this.setState({
      ...this.state,
      couponApi,
      products,
    });
  };

  fetchData();

  const orderData = (products) => {
    return Object.values(
      products.reduce((prev, curr) => {
        if (prev[curr.productId]) {
          const data = prev[curr.productId];
          if (!data.option) {
            data.option = [];
            data.option.push({
              optionName: data.optionName,
              optionPrice: data.optionPrice,
              qty: data.qty,
              optionId: data.optionId,
            });
            delete data.optionName;
            delete data.optionPrice;
            delete data.qty;
            delete data.optionId;
          }

          prev[curr.productId].option.push({
            optionName: curr.optionName,
            optionPrice: curr.optionPrice,
            qty: curr.qty,
            optionId: curr.optionId,
          });
        } else {
          prev[curr.productId] = curr;
        }
        return prev;
      }, {})
    );
  };

  const $page = document.createElement("div");
  $page.className = "CartPage";
  $page.innerHTML = `<h1>장바구니/결제</h1>`;
  $target.appendChild($page);

  const totalPrice = () => {};
  const orderBtn = () => {};

  // 홈 바로가기 버튼
  HomeBtn($page);

  // render
  this.render = () => {
    if (this.state === undefined) {
      return;
    }

    const { couponApi, products } = this.state;

    // 쿠폰 컴포넌트
    new CouponContainer({ couponOptions: couponApi, $page });

    // 구매 물품 리스트 컴포넌트
    new OrderProduct({ products: orderData(products), $page, cartRender: () => this.render() });
    totalPrice();
    orderBtn();
    console.log(this.state);
  };
}
