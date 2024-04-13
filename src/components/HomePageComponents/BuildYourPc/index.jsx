import React from 'react'
import style from './index.module.scss'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
function BuildYourPc() {
  const { t } = useTranslation()
  return (
   <section className={style.BuildYourPc}>
        <div className={style.circle1}></div>
        <div className={style.circle2}></div>
     <article   >
        <h2>{t("HomePageBuildYourPC_header")}</h2>
        <p>{t("HomePageBuildYourPC_content")}</p>
        <Link to={"/build"}><button><i className="fa-solid fa-screwdriver-wrench"></i> <span>{t("HomePageBuildYourPC_button")} </span></button></Link>
    </article>
   </section>
  )
}

export default BuildYourPc