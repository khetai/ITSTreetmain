import { motion } from 'framer-motion'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import OrderContainer from '../../components/OrderPageComponents/OrderContainer'

function Order() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <main style={{ position: 'relative' }} className="container">
        <OrderContainer></OrderContainer>
      </main>
    </motion.div>
  )
}

export default Order
