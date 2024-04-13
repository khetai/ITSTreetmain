import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss"
import { Link } from "react-router-dom";


function  MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Slider {...settings}>
        <div>
          <img src="https://avatars.mds.yandex.net/get-market-adv/8282799/2579a22d-b0a1-4eae-b8c7-13b7c7c34aa8/1440x300" alt="" />
        </div>
        <div>
          <img src="https://avatars.mds.yandex.net/get-market-adv/8282799/e9f54196-35bc-462e-a608-cdb1f2e5936a/1440x300" alt="" />
        </div>
        <div>
          <img src="https://avatars.mds.yandex.net/get-market-adv/8282799/53eea2fd-1472-48ad-bdf5-bd6712e94f6c/1440x300" alt="" />
        </div>
        <div>
          <img src="https://avatars.mds.yandex.net/get-market-adv/8777695/03ee9062-76ec-4603-bee3-0f55d0183405/1440x300" alt="" />
        </div>
        <div>
          <img src="https://avatars.mds.yandex.net/get-market-adv/8781404/40a1cfae-cfb9-4c1d-bf3e-67e7963eb09d/1440x300" alt="" />
        </div>
        <div>
          <img src="https://avatars.mds.yandex.net/get-market-adv/8282799/18bb1448-59d9-4768-9015-af51c30e3d64/1440x300" alt="" />
        </div>
      </Slider>
    </>
  );
}

export default MainSlider;
