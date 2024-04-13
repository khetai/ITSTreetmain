import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { Helmet } from 'react-helmet-async'
import Logo from '../../assets/imgs/Logo.jpg'
import { motion } from 'framer-motion'
import Card_v2 from '../../components/CommonComponents/Card_v2'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
function Filter() {
  const url = useSelector(state => state.store.url);
  const { t } = useTranslation()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [catalogue, setCatalogue] = useState([])
  const [subcategories, setSubcategories] = useState({})
  const [activeCatalog, setActiveCatalog] = useState(null)
  const [brands, setBrands] = useState([])
  const [queryParams, setQueryParams] = useState({
    parentCatalogIds: [],
    catalogIds: [],
    brandIds: [],
    ids: [],
    q: '',
    limit: 8,
    page: 1,
    orderBy: '',
    order: 'desc',
  })
  // inStock: 0,
  const fetchData = (newQueryParams) => {
    const queryString = Object.keys(newQueryParams)
      .map((key) => {
        if (Array.isArray(newQueryParams[key])) {
          return newQueryParams[key]
            .map(
              (value) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
            )
            .join('&')
        } else if (newQueryParams[key] != '') {
          return `${encodeURIComponent(key)}=${encodeURIComponent(
            newQueryParams[key],
          )}`
        } else {
          return ''
        }
      })
      .filter((param) => param != '')
      .join('&')

    setLoading(true)
    fetch(`${url}Search/Search?${queryString}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }
  const location = useLocation()
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const newQueryParams = {
      parentCatalogIds: [],
      catalogIds: [],
      brandIds: [],
      ids: [],
      q: '',
      limit: 8,
      page: 1,
      orderBy: '',
      order: 'desc',
    }
    for (const key of searchParams.keys()) {
      if (Array.isArray(newQueryParams[key])) {
        newQueryParams[key] = searchParams.getAll(key)
      } else {
        newQueryParams[key] = searchParams.get(key)
      }
    }
    setQueryParams(newQueryParams)
    fetchData(newQueryParams)
  }, [location.search])
  useEffect(() => {
    setLoading(true)
    fetch(`${url}Brand`)
      .then((res) => res.json())
      .then((data) => {
        setBrands(data)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    setLoading(true)
    fetch(`${url}Catalogs`)
      .then((res) => res.json())
      .then((data) => {
        const processedData = data.reduce(
          (acc, item) => {
            if (item.parentId === null) {
              acc.mainCategories.push(item)
            } else {
              if (!acc.subCategories[item.parentId]) {
                acc.subCategories[item.parentId] = []
              }
              acc.subCategories[item.parentId].push(item)
            }
            return acc
          },
          { mainCategories: [], subCategories: {} },
        )

        // Update your state variables here
        setCatalogue(processedData.mainCategories)
        setSubcategories(processedData.subCategories)
        setLoading(false)
      })
  }, [])
  const handleChangeSubcategory = (catId, subcatId, isChecked) => {
    setSubcategories((prevState) => {
      const updatedSubcats = prevState[catId].map((subcat) =>
        subcat.id == subcatId ? { ...subcat, isChecked } : subcat,
      )

      // Check if all subcategories are now checked
      const allChecked = updatedSubcats.every((subcat) => subcat.isChecked)

      // Update queryParams for subcategories
      setQueryParams((prevParams) => {
        const newCatalogIds = isChecked
          ? [...prevParams.catalogIds, subcatId] // Add subcatId if checked
          : prevParams.catalogIds.filter((id) => id != subcatId) // Remove subcatId if not checked

        return {
          ...prevParams,
          catalogIds: newCatalogIds,
        }
      })

      // Immediately update the state of the main category checkbox
      setCatalogue((prevCatState) =>
        prevCatState.map((cat) =>
          cat.id == catId ? { ...cat, isChecked: allChecked } : cat,
        ),
      )

      return {
        ...prevState,
        [catId]: updatedSubcats,
      }
    })
  }
  const handleChangeMainCategory = (catId, isChecked) => {
    setCatalogue((prevState) =>
      prevState.map((cat) => (cat.id == catId ? { ...cat, isChecked } : cat)),
    )

    // Update queryParams for main categories and related subcategories
    setQueryParams((prevParams) => {
      const newParentCatalogIds = isChecked
        ? [...prevParams.parentCatalogIds, catId] // Add catId if checked
        : prevParams.parentCatalogIds.filter((id) => id != catId) // Remove catId if not checked

      // When a main category is checked/unchecked, update all its subcategories
      const newCatalogIds = isChecked
        ? [
            ...prevParams.catalogIds,
            ...subcategories[catId].map((subcat) => subcat.id),
          ]
        : prevParams.catalogIds.filter(
            (id) =>
              !subcategories[catId].map((subcat) => subcat.id).includes(id),
          )

      return {
        ...prevParams,
        parentCatalogIds: newParentCatalogIds,
        catalogIds: newCatalogIds,
      }
    })

    // Update the state of all related subcategory checkboxes
    setSubcategories((prevState) => ({
      ...prevState,
      [catId]: prevState[catId].map((subcat) => ({ ...subcat, isChecked })),
    }))
  }
  const handleChangeBrand = (e) => {
    const { value, checked } = e.target
    setQueryParams((prevParams) => {
      const newBrandIds = checked
        ? [...prevParams.brandIds, value]
        : prevParams.brandIds.filter((id) => id != value)

      return { ...prevParams, brandIds: newBrandIds }
    })
  }
  const ResetData = () => {
    const reseted_json = {
      parentCatalogIds: [],
      catalogIds: [],
      brandIds: [],
      ids: [],
      q: '',
      limit: 8,
      page: 1,
      orderBy: '',
      order: 'desc',
    }
    setQueryParams(reseted_json)
    fetchData(reseted_json)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Helmet>
        <title>IT STREET</title>
        <link rel="shortcut icon" href={Logo} type="image/x-icon" />
        <link
          rel="shortcut icon"
          href="https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/IMG_Academy_Logo.svg/640px-IMG_Academy_Logo.svg.png"
          type="image/x-icon"
        />
      </Helmet>
      <main className={`container ${style.filterPage} `}>
        <div className={`${style.filterSidebar}`}>
          <div className={style.buttons}>
            <button onClick={() => fetchData(queryParams)}>
              {t('filter')} <i className="fa-solid fa-filter"></i>
            </button>
            <button onClick={() => ResetData()}>
              {t('reset')} <i className="fa-solid fa-arrow-rotate-left"></i>
            </button>
          </div>
          <div>
            <h3>{t('catalogue')}</h3>
            <ul>
              {catalogue ? (
                catalogue.map((cat, index) => (
                  <li key={index}>
                    <div htmlFor={cat.id} className={style.main_catalog}>
                      <input
                        type="checkbox"
                        name="parentCatalogIds"
                        value={cat.id}
                        id={cat.id}
                        checked={cat.isChecked}
                        onChange={(e) =>
                          handleChangeMainCategory(cat.id, e.target.checked)
                        }
                      />{' '}
                      <p>{cat.catalogLanguages[0].name}</p>
                      <i
                        onClick={() =>
                          activeCatalog == cat.id
                            ? setActiveCatalog(null)
                            : setActiveCatalog(cat.id)
                        }
                        className="fa-solid fa-circle-arrow-right"
                      ></i>
                    </div>
                    {activeCatalog == cat.id && (
                      <ul className={style.AltCatalog}>
                        {subcategories[cat.id] &&
                          subcategories[cat.id].map((item, index2) => (
                            <li key={index2}>
                              <input
                                type="checkbox"
                                name="catalogIds"
                                value={item.id}
                                id={item.id}
                                checked={item.isChecked}
                                onChange={(e) =>
                                  handleChangeSubcategory(
                                    cat.id,
                                    item.id,
                                    e.target.checked,
                                  )
                                }
                              />
                              <label htmlFor={item.id}>
                                {item.catalogLanguages[0].name}
                              </label>
                            </li>
                          ))}
                      </ul>
                    )}
                  </li>
                ))
              ) : (
                <i className="fa-solid fa-ellipsis fa-fade"></i>
              )}
            </ul>
          </div>
          <div>
            <h3>{t('brands')}</h3>
            <ul >
              {brands && !loading ? (
                brands.map((brand, index) => (
                  <li key={brand.id}>
                    <input
                      type="checkbox"
                      name="brandIds"
                      value={brand.id}
                      id={brand.id}
                      onChange={(e) => handleChangeBrand(e)}
                    />{' '}
                    <label htmlFor={brand.id}>{brand.name}</label>
                  </li>
                ))
              ) : (
                <i className="fa-solid fa-ellipsis fa-fade"></i>
              )}
            </ul>
          </div>
        </div>
        <div className={`${style.filterMain}`}>
          {loading ? (
            <div className={style.loading}>
              <i className="fa-solid fa-spinner fa-spin"></i>
            </div>
          ) : (
            <>
              {products.items?.length ? (
                products.items?.map((data, i) => {
                  return <Card_v2 key={data.id} {...data} />
                })
              ) : (
                <h1>{t('noResultsFound')}</h1>
              )}
            </>
          )}
        </div>
      </main>
    </motion.div>
  )
}

export default Filter
