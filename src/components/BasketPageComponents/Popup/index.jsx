import React, { useState } from "react";
import style from "./index.module.scss";
import { useTranslation } from "react-i18next";
import { getCookie } from "../../../helpers/cookie";
import apiCall from "../../../helpers/Order";
import usePrivate from "../../../ServicesRequest/useAxiosPrivate2";

export const Popup = ({
  setIsOpen,
  payment_method,
  setPaymentMethod,
  basket,
}) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  return (
    <div className={style.popup_wrapper}>
      <div className={style.popup}>
        {step == 1 ? (
          <Choose_payment
            setIsOpen={setIsOpen}
            payment_method={payment_method}
            setPaymentMethod={setPaymentMethod}
            setStep={setStep}
          />
        ) : (
          <Form
            setIsOpen={setIsOpen}
            payment_method={payment_method}
            setStep={setStep}
            basket={basket}
          />
        )}
      </div>
    </div>
  );
};

const Choose_payment = ({
  setIsOpen,
  payment_method,
  setPaymentMethod,
  setStep,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("choose_payment")}</h1>
      <i
        className="fa-regular fa-circle-xmark"
        onClick={() => {
          setIsOpen(false);
        }}
        style={{ color: "#ff0000" }}
      />
      <ul>
        <li>
          <button
            className={payment_method == 1 && style.active}
            onClick={() => setPaymentMethod(1)}
          >
            {t("cash")}
            <i className="fa-solid fa-sack-dollar"></i>
          </button>
        </li>
        <li>
          <button
            className={payment_method == 2 && style.active}
            onClick={() => setPaymentMethod(2)}
          >
            {t("card_offline")}
            <i className="fa-regular fa-credit-card"></i>
          </button>
        </li>
        <li>
          <button
            className={payment_method == 3 && style.active}
            onClick={() => setPaymentMethod(3)}
          >
            {t("card_online")}
            <i className="fa-brands fa-cc-visa"></i>
          </button>
        </li>
      </ul>
      <button
        onClick={() => {
          setStep(2);
        }}
      >
        {t("continue_payment")}
      </button>
    </>
  );
};
const initialstate = {
  paymentMethod: 0,
  phone: "",
  address: "",
  description: "",
  orderItems: [],
};
const Form = ({ setIsOpen, setStep, payment_method, basket }) => {
  const [form, setForm] = useState(initialstate);
  const { sendRequest } = usePrivate();
  const { t } = useTranslation();
  const token = getCookie("token");
  const SubmitForm = async e => {
    e.preventDefault();
    console.log("start");
    if (token) {
      try {
        let data = {
          paymentMethod: payment_method,
          phone: e.target.phone.value,
          address: e.target.address.value,
          description: e.target.description.value,
          orderItems: basket.map(x => ({
            productId: x.productId,
            quantity: x.quantity,
          })),
        };
        var res = await sendRequest("POST", "/Order", data, null);
        console.log(res);
        if (res) {
          setIsOpen(false);
        }
        // var res = await apiCall("/api/Order", "POST", data);
        // console.log(res);
      } catch (error) {
        console.error("Failed to update item count in basket:", error);
      }
    } else {
      console.log("error");
    }
  };
  return (
    <>
      <h1>{t("fill_form")}</h1>
      <i
        className="fa-regular fa-circle-xmark"
        onClick={() => {
          setIsOpen(false);
        }}
        style={{ color: "#ff0000" }}
      />
      <form onSubmit={e => SubmitForm(e)}>
        <label htmlFor="name">
          {t("name")}
          <input type="text" name="name" id="name" />
        </label>
        <label htmlFor="surname">
          {t("surname")}
          <input type="text" name="surname" id="surname" />
        </label>
        <label htmlFor="phone">
          {t("phone_number")}
          <input type="text" name="phone" id="phone" />
        </label>
        <label htmlFor="address">
          {t("delivery_address")}
          <input type="text" name="address" id="address" />
        </label>
        <label htmlFor="description">
          {t("description")}
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
          ></textarea>
        </label>

        <div className={style.buttons}>
          <button
            onClick={() => {
              setStep(1);
            }}
          >
            {t("back")}
          </button>
          <button type="submit">{t("buy")}</button>
        </div>
      </form>
    </>
  );
};

export default Popup;
