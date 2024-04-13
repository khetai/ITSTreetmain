import React, { useContext, useEffect, useState } from 'react'
import Card_v2 from '../../CommonComponents/Card_v2'
import style from './index.module.scss'
import { MainContext } from '../../../contexts/mainContextProvider'

function WishListContainer() {
  const { wishList } = useContext(MainContext)
  console.log(wishList);
  return (
    <div>
      {wishList.length > 0 ? (
        <div className={style.container}>
          {wishList.map((x) => (
            <Card_v2 key={x.id} {...x}></Card_v2>
          ))}
        </div>
      ) : (
        <h1>WishList boşdur</h1>
      )}
    </div>
  )
}

export default WishListContainer
