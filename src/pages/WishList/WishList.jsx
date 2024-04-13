import { motion } from "framer-motion"
import React from 'react'
import { Helmet } from 'react-helmet-async'
import WishListContainer from '../../components/WishListPageComponents/WishListContainer'

function WishList() {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}}>
      <Helmet>
        <title>IT STREET</title>
      </Helmet>
      <main className="container">
       <WishListContainer></WishListContainer>
      </main>
    </motion.div>
  )
}

export default WishList