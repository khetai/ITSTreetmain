import React from 'react'
import './assets/scss/main.scss'
import { MainContextProvider } from './contexts/mainContextProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home/Home'
import Basket from './pages/Basket/Basket'
import PrivateRoute from './routes/PrivateRoute'
import Login from './pages/Login/Login'
import UserProfile from './pages/UserProfile'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import WishList from './pages/WishList/WishList'
import Products from './pages/Products/Products'
import NotFound from './pages/NotFound/NotFound'
import Filter from './pages/Filter/Filter'
import MainLayout from './layouts/MainLayout/MainLayout'
import Order from './pages/Order'
import BuildPc from './pages/BuildPc/BuildPc'

function App() {
  return (
    <>
      <HelmetProvider>
        <MainContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/index" element={<Home />}></Route>
                <Route path="/product/:id" element={<ProductDetail />}></Route>
                <Route path="/products" element={<Products />}></Route>
                <Route path="/wishlist" element={<WishList></WishList>}></Route>
                <Route path="/basket" element={<Basket />}></Route>
                <Route path="/filter" element={<Filter />}></Route>
                <Route path="/build" element={<BuildPc />}></Route>
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/order" element={<Order />}></Route>
                <Route path="/user/:username" element={<UserProfile />}></Route>
              </Route>            
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </BrowserRouter>
        </MainContextProvider>
      </HelmetProvider>
    </>
  )
}

export default App
