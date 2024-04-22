import React, { useContext, useState, useEffect, useCallback } from "react";
import style from "./index.module.scss";
import logo from "../../assets/imgs/Logo.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MainContext } from "../../contexts/mainContextProvider";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { removeCookieAll } from "../../helpers/cookie";
import { useSelector } from "react-redux";

function Flags() {
  const [langStatus, setLangStatus] = useState("az");
  const { i18n } = useTranslation();
  const changeLanguage = useCallback(
    async lang => {
      await i18n.changeLanguage(lang);
    },
    [i18n]
  );
  useEffect(() => {
    changeLanguage(langStatus);
  }, [langStatus, changeLanguage]);
  return (
    <>
      <select
        className={style.select}
        name=""
        id=""
        value={langStatus}
        onChange={e => setLangStatus(e.target.value)}
      >
        <option value="az">AZ</option>
        <option value="rus">RU</option>
        <option value="en">EN</option>
      </select>
    </>
  );
}
function Navbar() {
  const url = useSelector(state => state.store.url);
  const { t } = useTranslation();
  const { basket, wishList, user, setUser, role } = useContext(MainContext);
  const [catalogue, setCatalogue] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [category, setCategory] = useState(null);
  const [category_name, setCategory_name] = useState(null);
  const [loading, setLoading] = useState(true);
  const [close, setClose] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setToggle(false);
    setClose(true);
  }, [location.pathname, location.search]);

  useEffect(() => {
    setLoading(true);
    fetch(`${url}Catalogs`)
      .then(res => res.json())
      .then(data => {
        // Processing the data
        const processedData = data.reduce(
          (acc, item) => {
            if (item.parentId === null) {
              // If parentId is null, it's a main category
              acc.mainCategories.push(item);
            } else {
              // If parentId is not null, it's a sub-category
              // Grouping sub-categories by parentId
              if (!acc.subCategories[item.parentId]) {
                acc.subCategories[item.parentId] = [];
              }
              acc.subCategories[item.parentId].push(item);
            }
            return acc;
          },
          { mainCategories: [], subCategories: {} }
        );

        // Update your state variables here
        setCatalogue(processedData.mainCategories);
        setSubcategories(processedData.subCategories);
        setCategory_name(
          processedData.mainCategories[0].catalogLanguages[0].name
        );
        setCategory(processedData.mainCategories[0].id);
        setLoading(false);
      });
  }, []);
  window.onpopstate = function (event) {
    if (window.location.pathname === "/login") {
      window.location.href = "/";
    }
  };
  useEffect(() => {
    setLoading(true);
    fetch(`${url}Brand`)
      .then(res => res.json())
      .then(data => {
        setBrands(data);
        setLoading(false);
      });
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    swipeToSlide: true,
    draggable: true,
    arrows: false,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const Logout = () => {
    removeCookieAll();
    setUser(null);
    navigate("/login");
  };
  const Search = () => {
    const search_input = document.getElementById("search_input");
    if (search_input.value) {
      navigate(`/filter?q=${search_input.value}&limit=8&page=1&order=desc`);
    }
  };
  return (
    <header className={`${style.header} `}>
      <div className={`container ${style.navLanguage}`}>
        <div className={style.NavBrand}>
          <Link to={"/"}>
            <img src={logo} alt="navBrand" />
          </Link>
        </div>
        <div className={style.controlsContainer}>
          {Flags()}
          {user ? (
            <>
              <Link to={`/user/${user}`}>
                <i className="fa-solid fa-user" /> {user}
              </Link>
              <button onClick={Logout} className={`${style.login}`}>
                {t("Logout")}
              </button>
            </>
          ) : (
            <Link to={"/login"}>
              <button className={`${style.login}`}>{t("Login")}</button>
            </Link>
          )}
          {role !== "User" && (
            <Link to={"https://admin.it-street.az/"}>
              <button className={`${style.login}`}>{t("admin")}</button>
            </Link>
          )}
        </div>
      </div>
      <nav className={`container`}>
        <div className={`${style.container} `}>
          <button
            onClick={() => setToggle(!toggle)}
            className={` ${style.toggle}`}
          >
            {!toggle ? (
              <i className="fa-solid fa-bars"></i>
            ) : (
              <i className="fa-solid fa-xmark"></i>
            )}
            <div>{t("catalogue")}</div>
          </button>
          <div className={`${style.searchContainer}`}>
            <input
              id="search_input"
              type="text"
              placeholder={t("nav_placeholder")}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  Search();
                }
              }}
            />
            <button onClick={() => Search()}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div className={`${style.list}`}>
            <Link to={"/order"}>
              <div>
                <i className="fa-solid fa-cube"></i>
                <div>{t("nav_order_icon")}</div>
              </div>
            </Link>
            <Link to={"/wishlist"}>
              <div className={style.wishListIcon}>
                {wishList.length ? <span>{wishList.length}</span> : null}
                <i className="fa-regular fa-heart"></i>
                <div>{t("nav_wishlist_icon")}</div>
              </div>
            </Link>
            <Link to={"/basket"}>
              <div className={style.basketIcon}>
                {basket.length ? <span>{basket.length}</span> : null}
                <i className="fa-solid fa-cart-shopping"></i>
                <div>{t("nav_basket_icon")}</div>
              </div>
            </Link>
          </div>
        </div>
      </nav>
      <nav className={`container`}>
        <ul>
          {brands && !loading ? (
            <Slider className={`${style.brands} `} {...settings}>
              {brands.map((brand, index) => (
                <Link
                  to={`/filter?limit=8&page=1&order=desc&brandIds=${brand.id}`}
                  key={brand.id}
                >
                  {brand.name}
                </Link>
              ))}
            </Slider>
          ) : (
            <i className="fa-solid fa-ellipsis fa-fade"></i>
          )}
        </ul>
      </nav>
      {toggle ? (
        <nav className={style.catalogue}>
          <div className={`container`}>
            <ul className={style.categories}>
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                catalogue.map(item => (
                  <li
                    key={item.id}
                    className={category === item.id ? style.active : null}
                    onMouseEnter={() => {
                      setCategory(item.id);
                      setCategory_name(item.catalogLanguages[0].name);
                      setClose(false);
                    }}
                  >
                    <p
                      onClick={() => {
                        navigate(
                          `/filter?parentCatalogIds=${item.id}&limit=8&page=1&order=desc`
                        );
                        setToggle(false);
                      }}
                    >
                      {item.catalogLanguages[0].name}{" "}
                    </p>
                    <i className="fa-solid fa-right-long"></i>
                  </li>
                ))
              )}
            </ul>
            <ul className={`${style.subcategories} ${close && style.close}`}>
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                <>
                  <h1 onClick={() => setClose(true)}>
                    <i className="fa-solid fa-angles-left"></i>
                    {category_name}
                  </h1>
                  {subcategories[category]?.map(item => (
                    <li key={item.id}>
                      <Link
                        to={`/filter?parentCatalogIds=${item.parentId}&catalogIds=${item.id}&limit=8&page=1&order=desc`}
                      >
                        {item.catalogLanguages[0].name}
                      </Link>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

export default Navbar;
