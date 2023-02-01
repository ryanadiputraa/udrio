"use client"

import Slider, { Settings } from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./index.css"

const banners = Array(12).fill(0)

export default function Banners() {
  const settings: Settings = {
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (idx) => <button key={idx} className="dot" />,
  }

  return (
    <Slider
      {...settings}
      className="sm:w-[102%] w-[108%] sm:right-[1%] right-[4%]"
    >
      {banners.map((_, idx) => (
        <img
          key={idx}
          className="rounded-xl"
          src={`/images/banners/banner-${idx + 1}.jpeg`}
          alt="banner"
        />
      ))}
    </Slider>
  )
}
