import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Logo from "../../assets/imgs/Logo.jpg";
import Comments from "../../components/DetailPageComponents/Comments";
import TopSlickSlider from "../../components/HomePageComponents/TopSlickSlider";
import { MainContext } from "../../contexts/mainContextProvider";
import style from "./index.module.scss";
import useWishList from "../../hooks/useWishList";
import useBasket from "../../hooks/useBasket";
import lang_json from "../../helpers/language.json";
import { useSelector } from "react-redux";
import { getCookie } from "../../helpers/cookie";
function ProductDetail() {
  const token = getCookie("token");
  const url = useSelector(state => state.store.url);
  let { id } = useParams();
  const { basket } = useContext(MainContext);
  const { checkIsInWishList, addWishList } = useWishList();
  const { addBasket, checkIsInBasket, deleteProduct } = useBasket();
  const stars = [1, 2, 3, 4, 5];
  const [datum, setDatum] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}Product/` + id);
        const data = await response.json();
        console.log(data);
        data.productId = data.id;
        setDatum(data);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const product = checkIsInBasket(datum?.id);

  return loaded ? (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Helmet>
        <title>
          Product{" "}
          {/* {datum.productLanguages && '| ' + datum.productLanguages[0].name} */}
        </title>
      </Helmet>
      <main className="container">
        <section className={style.product_container}>
          <figure>
            <img
              src={datum?.imageUrl || Logo}
              alt={datum.productLanguages && datum?.productLanguages[0].name}
            />
          </figure>
          <article>
            <h1>
              {datum.productLanguages &&
              datum.productLanguages[lang_json[currentLanguage]]
                ? datum.productLanguages[lang_json[currentLanguage]].name
                : datum.productLanguages[0].name}
            </h1>
            <div className={style.stars}>
              {stars.map((item, index) => {
                return (
                  <i
                    key={index}
                    className={
                      item <= datum?.rating
                        ? "fa-solid fa-star"
                        : "fa-regular fa-star"
                    }
                  ></i>
                );
              })}
            </div>
            <div className={style.pricePerUnit}>
              <span className={style.oldPrice}>{datum.price} ₼</span>
              <span className={style.newPrice}>
                {((datum.price * datum.discountPrice) / 100).toFixed(2)}₼{" "}
              </span>
            </div>
            <p>
              {datum.productLanguages &&
              datum.productLanguages[lang_json[currentLanguage]]
                ? datum.productLanguages[lang_json[currentLanguage]].description
                : datum.productLanguages[0].description}
            </p>

            <div>
              <button
                className={product && style.active}
                onClick={() =>
                  product ? deleteProduct(datum.id) : addBasket(datum)
                }
              >
                {product ? (
                  <>
                    {t("added_to_card")} <i className="fa-solid fa-check"></i>
                  </>
                ) : (
                  <>
                    {t("add_to_card")} <i className="fa-solid fa-cart-plus"></i>
                  </>
                )}
              </button>
              <button
                className={checkIsInWishList(id) && style.active}
                onClick={() =>
                  addWishList(
                    datum.productLanguages[0].name,
                    datum.price,
                    datum.id,
                    datum.imageUrl,
                    datum?.productLanguages &&
                      datum.productLanguages[0]?.description
                  )
                }
              >
                {checkIsInWishList(id) ? (
                  <>
                    {t("added_to_fav")} <i className="fa-solid fa-check"></i>
                  </>
                ) : (
                  <>
                    {t("add_to_fav")} <i className="fa-regular fa-heart"></i>
                  </>
                )}
              </button>
            </div>
          </article>
        </section>
        <Comments product_id={id} />
        <TopSlickSlider header={"Ən çox tövsiye edilən"}></TopSlickSlider>
        {/* <TopSlickSlider header={'Ən çox satılan'}></TopSlickSlider> */}
      </main>
    </motion.div>
  ) : (
    <section className="loading-page">
      <i className="fa-solid fa-spinner fa-spin"></i>
    </section>
  );
}

export default ProductDetail;
