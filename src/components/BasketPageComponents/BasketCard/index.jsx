import React, { useState, useContext } from "react";
import style from "./index.module.scss";
import { Link } from "react-router-dom";
import { color } from "framer-motion";
import { MainContext } from "../../../contexts/mainContextProvider";
import Logo from "../../../assets/imgs/Logo.jpg";
import { shortenString } from "../../../helpers/string";
import useBasket from "../../../hooks/useBasket";
import useWishList from "../../../hooks/useWishList";
import lang_json from "../../../helpers/language.json";
import { useTranslation } from "react-i18next";

function BasketCard({
  productLanguages,
  price,
  discountPrice,
  productId,
  id,
  attachmentUrl,
  description,
  quantity,
  isActive,
  rating = 2,
}) {
  const {
    increaseProductCount,
    decreaseProductCount,
    deleteProduct,
    checkIsInBasket,
  } = useBasket();
  const { checkIsInWishList, addWishList } = useWishList();
  price = +price;
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <div className={style.card}>
      <Link to={`/product/${productId}`}>
        <img src={attachmentUrl || Logo} alt={name} />
      </Link>
      <article>
        <h2 className={style.cardName}>
          <Link to={`/product/${productId}`} />
          <span className={style.oldPrice}>{price} ₼</span>
          <span className={style.newPrice}>
            {(price - (price * discountPrice) / 100).toFixed(2)}₼{" "}
          </span>
        </h2>
        <p>
          {productLanguages && productLanguages[lang_json[currentLanguage]]
            ? shortenString(
                productLanguages[lang_json[currentLanguage]].name,
                90
              )
            : productLanguages[0] &&
              shortenString(productLanguages[0].name, 90)}
        </p>
        <div className={style.settings}>
          <div className={style.icons}>
            <i
              onClick={() =>
                addWishList(
                  productLanguages,
                  price,
                  productId,
                  attachmentUrl,
                  description,
                  discountPrice
                )
              }
              style={{ color: "red" }}
              className={`${
                checkIsInWishList(productId) ? "fa-solid" : "fa-regular"
              }  fa-heart`}
            ></i>
            <i
              onClick={() => deleteProduct(id)}
              className="fa-solid fa-trash-can"
            ></i>
          </div>
          <div className={style.counter}>
            <i
              onClick={() => increaseProductCount(productId)}
              className="fa-solid fa-plus"
            ></i>
            {quantity}
            <i
              onClick={() => decreaseProductCount(productId)}
              style={
                quantity == 1 ? { pointerEvents: "none", opacity: 0.5 } : null
              }
              className="fa-solid fa-minus"
            ></i>
          </div>
        </div>
      </article>
    </div>
  );
}

export default BasketCard;
