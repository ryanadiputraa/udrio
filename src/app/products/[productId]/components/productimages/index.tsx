"use client"

import Image from "next/image"
import { useState } from "react"
import Slider, { Settings } from "react-slick"
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs"

import "./style.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface Props {
  images: IProductImages[]
}

interface IProductImages {
  image_id: string
  url: string
}

export function ProductImages({ images }: Props) {
  const [selected, setSelected] = useState<string>(images[0].url)

  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <BsFillArrowLeftCircleFill />,
    nextArrow: <BsFillArrowRightCircleFill />,
  }

  return (
    <div className="sm:w-1/4 w-full flex flex-col gap-1">
      <Image
        src={selected}
        width={400}
        height={600}
        alt={selected}
        className="rounded-lg w-full"
      />
      <Slider {...settings} className="w-full">
        {images.map((image) => (
          <Image
            src={image.url}
            width={80}
            height={80}
            alt={image.url}
            className="w-20 p-2 cursor-pointer"
            onClick={() => setSelected(image.url)}
          />
        ))}
      </Slider>
    </div>
  )
}