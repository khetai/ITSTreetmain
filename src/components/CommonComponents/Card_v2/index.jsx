import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Logo from "../../../assets/imgs/Logo.jpg";
import useBasket from "../../../hooks/useBasket";
import useWishList from "../../../hooks/useWishList";
import style from "./index.module.scss";
import lang_json from "../../../helpers/language.json";

function Card_v2({
  productLanguages,
  price,
  id,
  productId,
  imageUrl,
  description,
  quantity,
  rating = 2,
  isActive,
  discountPrice,
  viewCount,
}) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const { checkIsInWishList, addWishList } = useWishList();
  const {
    addBasket,
    checkIsInBasket,
    increaseProductCount,
    decreaseProductCount,
  } = useBasket();
  const stars = [1, 2, 3, 4, 5];
  const isProductInBasket = checkIsInBasket(id);
  const isProductInWishList = checkIsInWishList(id);

  const addToWishList = () => {
    addWishList(
      productLanguages,
      price,
      id,
      imageUrl,
      discountPrice,
      description,
      rating
    );
  };

  const handleAddToBasket = () => {
    addBasket({
      productLanguages,
      price,
      discountPrice,
      productId: id,
      id: id,
      imageUrl,
      description,
      quantity: 1,
      rating,
      isActive,
    });
  };

  const renderAddToBasketButton = () => {
    if (!isProductInBasket) {
      return (
        <button onClick={handleAddToBasket}>
          {t("add_to_card")}
          <i className="fa-solid fa-cart-plus"></i>
        </button>
      );
    } else {
      return (
        <div className={style.countChanger}>
          <div onClick={() => increaseProductCount(id)}>
            <i className="fa-solid fa-plus"></i>
          </div>
          <p>{isProductInBasket.quantity}</p>
          <div onClick={() => decreaseProductCount(id)}>
            <i className="fa-solid fa-minus"></i>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.imgContainer}>
        <div className={style.iconContainer} onClick={addToWishList}>
          <i
            className={`${
              isProductInWishList ? "fa-solid" : "fa-regular"
            } fa-heart`}
          ></i>
        </div>
        <div className="endirim"></div>
        <Link to={"/product/" + id}>
          <img src={imageUrl || Logo} alt="img" loading="lazy" />
        </Link>
      </div>
      <div className={style.container}>
        <ProductPrice pricePerUnit={price} discountPrice={discountPrice} />
        <div className={style.starsContainer}>
          {stars.map(star => (
            <Star key={star} rating={rating} star={star} />
          ))}
        </div>
        <div className={style.name}>
          {productLanguages && productLanguages[lang_json[currentLanguage]]
            ? productLanguages[lang_json[currentLanguage]].name
            : productLanguages[0]?.name}
        </div>
        {renderAddToBasketButton()}
      </div>
    </div>
  );
}

function ProductPrice({ pricePerUnit = 0, discountPrice }) {
  return (
    <div className={style.pricePerUnit}>
      <span className={style.oldPrice}>{pricePerUnit} ₼</span>
      <span className={style.newPrice}>
        {(pricePerUnit - (pricePerUnit * discountPrice) / 100).toFixed(2)}₼{" "}
      </span>
    </div>
  );
}

function Star({ rating, star }) {
  const isFilled = star <= rating;
  const starClassName = isFilled ? "fa-solid fa-star" : "fa-regular fa-star";

  return <i className={starClassName} />;
}

export default Card_v2;
