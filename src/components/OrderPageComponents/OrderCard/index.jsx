import React, { useState, useContext } from "react";
import style from "./index.module.scss";
import Logo from "../../../assets/imgs/Logo.jpg";
import { useTranslation } from "react-i18next";
import { shortenString } from "../../../helpers/string";
import lang_json from "../../../helpers/language.json";

function OrderCard({
  discount,
  orderId,
  id,
  pricePerUnit,
  quantity,
  total,
  product,
}) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  return (
    <div className={style.card}>
      <figure>
        <img src={product.attachmentUrl || Logo} alt={name} />
      </figure>
      <article>
        <h2 className={style.cardName}>
          <span>{Number(pricePerUnit).toFixed(2)} ₼</span>
          {discount ? <span>{pricePerUnit - discount} ₼</span> : ""}
        </h2>
        <p>
          {product.productLanguages &&
          product.productLanguages[lang_json[currentLanguage]]
            ? shortenString(
                product.productLanguages[lang_json[currentLanguage]].name,
                90
              )
            : shortenString(product.productLanguages[0]?.name || "", 90)}
        </p>
        <div className={style.settings}>
          <div className={style.counter}>
            {t("qty")} : {quantity}
          </div>
        </div>
      </article>
    </div>
  );
}

export default OrderCard;
