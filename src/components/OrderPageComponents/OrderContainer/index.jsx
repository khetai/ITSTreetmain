import React, { useContext, useEffect, useState } from "react";
import OrderCard from "../OrderCard";
import style from "./index.module.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getCookie } from "../../../helpers/cookie";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import UsePrivate from "../../../ServicesRequest/useAxiosPrivate2";
function OrderContainer() {
  const { sendRequest } = UsePrivate();
  const { t } = useTranslation();
  const [data, setData] = useState();
  const [date, setDate] = useState();
  const [prod, setItem] = useState();
  const [page, setPage] = useState(1);
  const token = getCookie("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `Order/userOrders?page=${1}&take=${10}`,
          null
        );
        console.log(res);
        setData(res.data);
        setDate(res.data.items[0].date);
        setItem(res.data.items[0]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [page]);
  const handleChange = (event, value) => {
    setPage(Number(value));
  };
  const sum = data?.items?.reduce((acc, x) => acc + x.totalPrice, 0).toFixed(2);
  return (
    <div>
      {data?.items?.length > 0 ? (
        <section className={`container ${style.container}`}>
          <div>
            <h1>{t("orders")}</h1>
            {data.items.map((item, i) => {
              return (
                <ul className={style.order_items} key={item.id}>
                  <p
                    onClick={() => {
                      setDate(item.date);
                      setItem(item);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {new Date(item.date).toLocaleString()}{" "}
                    <i className="fa-solid fa-chevron-down"></i>
                  </p>
                  {item.orderItems.map(
                    order =>
                      date == item.date && (
                        <li key={order.productId}>
                          <OrderCard key={order.id} {...order} />
                        </li>
                      )
                  )}
                </ul>
              );
            })}
          </div>
          <ul className={style.info_card}>
            <li>
              <p>{t("payment")} : </p>
              {prod?.paymentMethod === 1
                ? t("cash")
                : prod?.paymentMethod == 2
                ? t("card_offline")
                : t("card_online")}
            </li>
            <li>
              <p>{t("delivery_address")} : </p> {prod?.address}
            </li>
            <li>
              <p>{t("total_amount")} : </p>
              {prod?.totalPrice} ₼
            </li>
          </ul>
        </section>
      ) : (
        <h1>Sifariş yoxdur</h1>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Stack spacing={2}>
          <Pagination
            count={data?.lastPage}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </div>
    </div>
  );
}

export default OrderContainer;
