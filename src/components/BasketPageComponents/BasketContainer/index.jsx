import React, { useContext, useState, useEffect } from "react";
import BasketCard from "../BasketCard";
import style from "./index.module.scss";
import { MainContext } from "../../../contexts/mainContextProvider";
import { Popup } from "../Popup";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
function BasktContainer() {
  // const location = useLocation();
  const { t } = useTranslation();
  const { basket, role, user } = useContext(MainContext);
  const [isOpen, setIsOpen] = useState(false);
  const [payment_method, setPaymentMethod] = useState(null);
  const sum = basket
    .reduce((acc, x) => acc + x.quantity * (x.price - x.discountPrice), 0)
    .toFixed(2);

  const checkAccess = () => {
    if (user) {
      setIsOpen(true);
    } else {
      window.location.replace("/login");
    }
  };

  return (
    <div>
      {isOpen && (
        <Popup
          setIsOpen={setIsOpen}
          payment_method={payment_method}
          setPaymentMethod={setPaymentMethod}
          basket={basket}
        />
      )}
      {basket.length > 0 ? (
        <section className={`container ${style.container}`}>
          <h1>Səbət</h1>

          <div className={style.list_container}>
            {basket.map(x => (
              <BasketCard key={x.id} {...x}></BasketCard>
            ))}
          </div>
          <div className={style.buy}>
            <p>
              {" "}
              <i className="fa-solid fa-tags"></i> {sum} AZN
            </p>
            <button onClick={() => checkAccess()}>{t("buy")}</button>
          </div>
        </section>
      ) : (
        <h1>Səbət boşdur</h1>
      )}
    </div>
  );
}

export default BasktContainer;
