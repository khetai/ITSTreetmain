import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { useTranslation } from "react-i18next";

const olmamaliCategoryaIDleri = [
  5, 21, 29, 49, 48, 50, 51, 52, 53, 109, 115, 117, 122, 97,
];
function BuildPcSection() {
  const { t } = useTranslation();
  const [catalogue, setCatalogue] = useState(null);
  const [spin, setSpin] = useState(null);
  const [selectedCategoryId_products, setselectedCategoryId_products] =
    useState({
      id: 0,
      products: [],
    });
  const [readyCategoies, setReadyCategoies] = useState([]);
  const [selectedPcParts, setSelectedPcParts] = useState([]);
  useEffect(() => {
    getCatalogue();
  }, []);

  async function getCatalogue() {
    const res = await fetch("https://apistreet.kursline.az/api/Catalogs");
    const data = await res.json();
    setCatalogue(data);
  }
  async function getProduct(id) {
    if (id === selectedCategoryId_products.id) return;
    setSpin(id);
    const unicats = [115, 117, 122, 97];
    const catId = unicats.find(item => item === id);
    const ids = selectedPcParts.map(part => part.id);

    if (catId) {
      const res = await fetch(
        `https://apistreet.kursline.az/api/Search/Search?parentCatalogIds=${id}&limit=10&page=1&order=desc`
      );
      const data = await res.json();
      setselectedCategoryId_products({
        id,
        products: data.items,
      });
      setSpin(null);
      return;
    }
    if (selectedPcParts.length > 0) {
      const res = await fetch(
        `https://apistreet.kursline.az/api/Product/GetProductConnections/${id}`,
        {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ids),
        }
      );
      const data = await res.json();
      setselectedCategoryId_products({
        id,
        products: data,
      });
      setSpin(null);
      return;
    }
    const res = await fetch(
      `https://apistreet.kursline.az/api/Search/Search?parentCatalogIds=${id}&limit=10&page=1&order=desc`
    );
    const data = await res.json();
    setselectedCategoryId_products({
      id,
      products: data.items,
    });

    setSpin(null);
  }
  function handleDropDown(x) {
    getProduct(x.id);

    // if (selectedPcParts.length > 0) {
    //     GetProductConnections(x.id,selectedPcParts)
    // }
    // else{
    // getProduct(x.id);

    // }
  }
  function handleAddSelectedPcParts(x) {
    const categoryID = selectedPcParts.find(
      item => item.catalogId === x.catalogId
    );

    if (categoryID) {
      setSelectedPcParts([
        ...selectedPcParts.filter(item => item.catalogId !== x.catalogId),
        x,
      ]);
      return;
    }
    if (!readyCategoies.includes(x.catalogId)) {
      setReadyCategoies([...readyCategoies, x.catalogId]);
    }
    setSelectedPcParts([...selectedPcParts, x]);
  }
  return catalogue ? (
    <section className={`container ${style.section}`}>
      <h1>{t("HomePageBuildYourPC_button")}</h1>
      <div className={style.container}>
        <div className={style.categories}>
          {catalogue.map(x => {
            if (
              x.parentId === null &&
              olmamaliCategoryaIDleri.some(item => item === x.id)
            ) {
              return (
                <div className={style.category}>
                  <p onClick={() => handleDropDown(x)}>
                    {x.catalogLanguages[0].name}
                  </p>

                  {spin == x.id ? (
                    <div className={style.spinner}>
                      <i className="fa-solid fa-spinner fa-spin fa-spin-reverse" />
                    </div>
                  ) : selectedCategoryId_products.id === x.id ? (
                    <ul>
                      {selectedCategoryId_products?.products?.map(x => (
                        <li
                          onClick={() => {
                            handleAddSelectedPcParts(x);
                          }}
                        >
                          <img
                            src={x.attachmentUrl ? x.attachmentUrl : ""}
                            style={{ width: "80px", marginRight: "5px" }}
                          />
                          <p>{x.productLanguages[0]?.name}</p>
                          <span>
                            {isNaN(parseFloat(x.pricePerUnit))
                              ? "0.00"
                              : parseFloat(x.pricePerUnit).toFixed(2)}{" "}
                            AZN
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            }
          })}
        </div>
        <div className={style.choosen}>
          <h3>{t("selected")}</h3>
          <span>
            {t("total_amount")}:{" "}
            {selectedPcParts
              .reduce((acc, item) => {
                const price = parseFloat(item.pricePerUnit);
                return acc + (isNaN(price) ? 0 : price);
              }, 0)
              .toFixed(2)}
            AZN
          </span>
          <ol type="I">
            {selectedPcParts.map(x => (
              <li>
                <img
                  src={x.attachmentUrl ? x.attachmentUrl : ""}
                  style={{ width: "80px", marginRight: "5px" }}
                />
                {x.productLanguages[0]?.name}
                <i
                  onClick={() => {
                    setSelectedPcParts(
                      selectedPcParts.filter(item => item.id !== x.id)
                    );
                    setReadyCategoies(
                      readyCategoies.filter(item => item !== x.catalogId)
                    );
                  }}
                  className="fa-regular fa-circle-xmark"
                  style={{ color: "#ff0000" }}
                ></i>
              </li>
            ))}
          </ol>
          <button>{t("complete")}</button>
        </div>
      </div>
    </section>
  ) : (
    <section className={style.spinner}>
      <i className="fa-solid fa-spinner fa-spin fa-spin-reverse" />
    </section>
  );
}

export default BuildPcSection;
