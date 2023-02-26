"use client"

import Slider, { Settings } from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./index.css"

const banners = Array(12).fill(0)

export function Banners() {
  const settings: Settings = {
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (idx) => <button key={idx} className="dot" />,
  }

  return (
    <Slider
      {...settings}
      className="banners sm:w-[103.5%] w-[108%] sm:right-[1.8%] right-[4%]"
    >
      {banners.map((_, idx) => (
        <img
          key={idx}
          className="rounded-xl min-h-[7rem]"
          src={`/images/banners/banner-${idx + 1}.jpeg`}
          alt="banner"
        />
      ))}
    </Slider>
  )
}
