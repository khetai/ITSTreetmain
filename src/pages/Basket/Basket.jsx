import { motion } from "framer-motion";
import React from "react";
import { Helmet } from "react-helmet-async";
import BasktContainer from "../../components/BasketPageComponents/BasketContainer";

function Basket() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Helmet>
        <title>Basket</title>
      </Helmet>
      <main style={{ position: "relative" }} className="container">
        <BasktContainer></BasktContainer>
        {/* <TopSlickSlider header={'Ən çox tövsiye edilən'}></TopSlickSlider> */}
        {/* <TopSlickSlider header={'Ən çox baxılan'}></TopSlickSlider>
        <TopSlickSlider header={'Ən çox satılan'}></TopSlickSlider>
        <TopSlickSlider header={'Ən sevimlilər'}></TopSlickSlider> */}
      </main>
    </motion.div>
  );
}

export default Basket;
