import { useContext, useState } from 'react'
import { MainContext } from '../contexts/mainContextProvider'

function useWishList() {
  const { wishList, setWishList } = useContext(MainContext)

  const checkIsInWishList = (id) => {
    return wishList.find((x) => x.id == id) !== undefined
  }
  const addWishList = (
    productLanguages,
    price,
    id,
    imageUrl,
    discountPrice,
    description,
  ) => {
    const isInWishList = !checkIsInWishList(id)
    if (isInWishList) {
      setWishList([
        ...wishList,
        {
          productLanguages,
          price,
          id,
          imageUrl,
          discountPrice,
          description,
          isFaworite: true,
        },
      ])
    } else {
      setWishList(wishList.filter((x) => x.id !== id))
    }
  }

  return { wishList, checkIsInWishList, addWishList }
}

export default useWishList
