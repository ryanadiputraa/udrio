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

import { IProductImages } from "data/products"
import ImagePlaceholder from "assets/svg/placeholder.svg"

interface Props {
  images: IProductImages[]
}

export function ProductImages({ images }: Props) {
  const [selected, setSelected] = useState<string>(images[0]?.url)

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
        src={selected ?? ImagePlaceholder}
        width={400}
        height={600}
        alt={selected}
        className="rounded-lg w-full h-auto mb-2"
      />
      <Slider {...settings} className="w-full mb-8">
        {images?.map((image, idx) => (
          <Image
            key={idx}
            src={image.url}
            width={100}
            height={100}
            alt={image.url}
            className="p-2 w-20 h-auto cursor-pointer rounded-xl border-2 border-grey border-solid"
            onClick={() => setSelected(image.url)}
          />
        ))}
      </Slider>
    </div>
  )
}
