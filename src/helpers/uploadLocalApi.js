import axios from "axios";

const uploadAllLocalStorage = async token => {
  const local = localStorage.getItem("basket");
  const basket = JSON.parse(local) || [];
  const data = [];
  console.log("uploadLocalApi.js => token", token);
  console.log("uploadLocalApi.js => basket", basket);
  for (let i = 0; i < basket.length; i++) {
    data.push({
      prodcutId: basket[i].productId,
      quantity: basket[i].quantity,
    });
  }

  const url = "https://api.it-street.az/api/Basket/CreateAll";
  console.log("uploadLocalApi.js => basket duzeldildikden sonra", data);

  try {
    const response = data.length
      ? await fetch(url, {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        })
      : { status: 201 };

    console.log(
      "uploadLocalApi.js => localstorage i backende upload eden api nin response u:",
      response
    );

    if (response.status == 201) {
      console.log(
        "uploadLocalApi.js => localstorage i backende upload etdi status:201"
      );
      localStorage.removeItem("basket");
      return "ok";
    }
  } catch (error) {
    console.error(error);
    // Handle errors appropriately
  }
};

export default uploadAllLocalStorage;
