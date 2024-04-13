import { useContext } from "react";
import { MainContext } from "../contexts/mainContextProvider";
import { getCookie } from "../helpers/cookie";
import apiCall from "../helpers/BasketApi";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import usePrivate from "../ServicesRequest/useAxiosPrivate2";
function useBasket() {
  const { t } = useTranslation();
  const { sendRequest } = usePrivate();
  const { basket, setBasket } = useContext(MainContext);
  const token = getCookie("token");
  const checkIsInBasket = id => {
    return basket?.find(x => x.productId == id);
  };
  const updateLocalStorage = newBasket => {
    localStorage.setItem("basket", JSON.stringify(newBasket));
  };
  const addBasket = async data => {
    console.log(data);
    if (!data.isActive) {
      alert(t("zeroStock"));
      return;
    }
    const productInBasket = checkIsInBasket(data.productId);
    if (productInBasket) {
      // Update product count if it's already in the basket
      await updateProductCount(data.productId, data.quantity);
    } else {
      const debouncedUpdateBasket = _.debounce(async data => {
        try {
          const Quantity = data.quantity == 0 ? 1 : data.quantity;
          const formData = new FormData();

          formData.append("ProdcutId", data.productId);
          formData.append("Quantity", Quantity);
          const newBasket = await sendRequest(
            "POST",
            "/Basket",
            formData,
            "multipart/form-data"
          );
          console.log(newBasket);

          if (newBasket.status === 201) setBasket([...basket, data]);
        } catch (error) {
          console.log("error");
          console.log("Failed to add item to basket:", error);
        }
      }, 300);
      if (token) {
        debouncedUpdateBasket(data);
      } else {
        const newBasket = [...basket, data];
        setBasket(newBasket);
        updateLocalStorage(newBasket);
      }
    }
  };
  const updateProductCount = async (productId, newQuantity) => {
    const existingItemIndex = basket.findIndex(
      item => item.productId == productId
    );

    if (existingItemIndex !== -1) {
      const updatedBasket = [...basket];

      updatedBasket[existingItemIndex].quantity = newQuantity;

      if (token) {
        try {
          const formData = new FormData();

          formData.append("ProdcutId", productId);
          formData.append("Quantity", newQuantity);
          await sendRequest("POST", "/Basket", formData, "multipart/form-data");
          setBasket(updatedBasket);
        } catch (error) {
          console.error("Failed to update item count in basket:", error);
        }
      } else {
        updateLocalStorage(updatedBasket);
        setBasket(updatedBasket);
      }
    } else {
      console.log("Item not found in basket");
    }
  };
  const increaseProductCount = productId => {
    const product = basket.find(item => item.productId == productId);
    if (product) {
      updateProductCount(productId, product.quantity + 1);
    }
  };
  const decreaseProductCount = productId => {
    const product = basket.find(item => item.productId === productId);
    if (product && product.quantity > 1) {
      updateProductCount(productId, product.quantity - 1);
    } else if (product && product.quantity === 1) {
      deleteProduct(product.id);
    }
  };
  const deleteProduct = async productId => {
    const newBasket = basket.filter(item => item.id !== productId);
    console.log(productId);
    if (token) {
      // Use API call
      try {
        const response = await sendRequest("DELETE", `/Basket/${productId}`);
        console.log(response);
        if (response.status === 200) setBasket(newBasket);
      } catch (error) {
        console.error("Failed to delete item from basket:", error);
      }
    } else {
      // Use localStorage
      setBasket(newBasket);
      updateLocalStorage(newBasket);
    }
  };

  return {
    basket,
    addBasket,
    checkIsInBasket,
    increaseProductCount,
    decreaseProductCount,
    deleteProduct,
  };
}

export default useBasket;
