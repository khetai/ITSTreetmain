import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Card_v2 from '../../CommonComponents/Card_v2'
import style from './index.module.scss'
import { useSelector } from "react-redux";
function TopSlickSlider({ header }) {
  const url = useSelector(state => state.store.url);
  const [prodcuts, setProdcuts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${url}Product/GetAllPaginated?page=1&count=10`)
      .then((res) => res.json())
      .then((data) => {
        setProdcuts(data.items)
        setLoading(false)
      })
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    draggable: false,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 672,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 440,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <>
      <h2 className={style.header}>{header}</h2>
      {loading ? (
        <i className="fa-solid fa-spinner fa-spin"></i>
      ) : (
        <Slider {...settings}>
          {prodcuts?.map((data, i) => {
            return <Card_v2 key={data.id} {...data} />
          })}
        </Slider>
      )}
    </>
  )
}

export default TopSlickSlider
