const API_URL = "https://test.api.weniv.co.kr";
// API 데이터 비동기 설정 함수
const request = async (url) => {
  try {
    const response = await fetch(url, {});
    if (response.ok) {
      // fetch가 제대로 들어 왔는지 판별
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (e) {
    console.log(e);
  }
};
//url 매개변수를 받아 fetch후 async await로 비동기 설정

export const api = {
  fetchProductsList: async () => {
    const itemData = await request(`${API_URL}/mall`); // 위의 request함수에서 반환된 데이터를 변수 itemData에 저장 후  api의 객체함수에서 export 시킴
    return {
      data: itemData,
    };
  },
  fetchProduct: async (Id) => {
    return await request(`${API_URL}/mall/${Id}`);
  },
  fetchCoupon: async () => {
    return await request(`${API_URL}/coupon`);
  },
};

export default api;
