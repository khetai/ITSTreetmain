import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../../layouts/Navbar/Navbar";
import MainSlider from "../../components/HomePageComponents/MainSlider/MainSlider";
import Footer from "../../layouts/Footer/Footer";
import TopSlickSlider from "../../components/HomePageComponents/TopSlickSlider";
import Logo from "../../assets/imgs/Logo.jpg";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import BuildYourPc from "../../components/HomePageComponents/BuildYourPc";

function Home() {
  const { t } = useTranslation();

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
      <main className="container">
        <MainSlider></MainSlider>
        <BuildYourPc/>
        <TopSlickSlider header={t("Most_recommended")}></TopSlickSlider>
        <TopSlickSlider header={t("Most_viewed")}></TopSlickSlider>
        <TopSlickSlider header={t("Best_seller")}></TopSlickSlider>
        <TopSlickSlider header={t("Favorites")}></TopSlickSlider>
      </main>
    </motion.div>
  );
}

export default Home;
