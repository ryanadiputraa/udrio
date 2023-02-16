"use client"

import { KeyboardEvent } from "react"
import Image from "next/image"
import { ChangeEvent, useState } from "react"

import { IProduct } from "app/products/page"
import { formatCurrency } from "utils/currency"

interface Props {
  product: IProduct
}

const MAX_ORDER = 1000

export function ProductOrder({ product }: Props) {
  const [count, setCount] = useState<number>(product.min_order)
  const [subtotal, _] = useState<number>(product.price)

  const handleCountDown = () =>
    setCount((current) => {
      if (current <= product.min_order) return current
      return (current -= 1)
    })

  const handleCountUp = () =>
    setCount((current) => {
      if (current + 1 > MAX_ORDER) return current
      return (current += 1)
    })

  const hanldeInputCount = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    setCount((current) => {
      if (val > MAX_ORDER) return current
      return val
    })
  }
  const handleInputCountKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const disabledKey = ["-", "+", ",", "ArrowUp", "ArrowDown"]
    if (disabledKey.includes(e.key)) e.preventDefault()
  }

  // TODO: handle cart
  const onAddToCart = () => {}

  // TODO: integrate direct purchase
  const onPurchase = () => {}

  return (
    <div className="sm:w-1/4 w-full border-grey border-2 rounded-lg px-4 py-2">
      <h4 className="text-md font-bold">Pemesanan</h4>
      <span className="flex items-center gap-1 border-grey border-b-[1px] py-2">
        <Image
          src={product.images?.[0]?.url ?? ""}
          className="rounded-md"
          width={45}
          height={65}
          alt={product.product_name}
        />
        {product.product_name}
      </span>
      <div className="flex items-center gap-2 mt-2 ">
        <div className="flex justify-between w-32 rounded-md overflow-hidden border-grey border-[1px]">
          <button className="w-1/4 bg-light-grey" onClick={handleCountDown}>
            -
          </button>
          <input
            type="number"
            className="w-2/4 outline-none text-center"
            value={count}
            onChange={(e) => hanldeInputCount(e)}
            onKeyDown={(e) => handleInputCountKeyDown(e)}
          />
          <button className="w-1/4 bg-light-grey" onClick={handleCountUp}>
            +
          </button>
        </div>
        <span className="text-sm">
          Stok:{" "}
          <span
            className={`text-${
              product.is_available ? "primary" : "red"
            } font-bold`}
          >
            {product.is_available ? "Ada" : "Habis"}
          </span>
        </span>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h4 className="font-light">Subtotal</h4>
        <span className="font-bold text-xl">
          {formatCurrency(subtotal * count)}
        </span>
      </div>
      <button
        className="btn-primary w-full font-medium rounded-md py-1 mt-4"
        onClick={onAddToCart}
      >
        + Keranjang
      </button>
      <button
        className="btn-secondary w-full font-medium rounded-md py-1 mt-1"
        onClick={onPurchase}
      >
        Beli Langsung
      </button>
    </div>
  )
}
