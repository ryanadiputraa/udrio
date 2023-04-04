"use client"

import Link from "next/link"
import Image from "next/image"
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react"
import { BsTrash } from "react-icons/bs"
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai"

import { ICart } from "data/cart"
import { formatCurrency } from "utils/currency"
import { useFetch } from "hooks/fetch"

interface Props {
  cartItem: ICart
}

const MAX_ORDER = 1000
let counterTimeout: NodeJS.Timeout

export function CartItem({ cartItem }: Props) {
  const { updateUserCart } = useFetch()
  const [count, setCount] = useState<number>(cartItem.quantity)

  const handleCountDown = () =>
    setCount((current) => {
      if (current <= cartItem.min_order) return current
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

  useEffect(() => {
    clearTimeout(counterTimeout)
    counterTimeout = setTimeout(async () => {
      await updateUserCart({ product_id: cartItem.product_id, quantity: count })
    }, 1000)
  }, [count])

  return (
    <div className="flex justify-start w-full gap-4 py-2 border-b-[0.05rem] border-grey border-solid">
      <input type="checkbox" className="w-6 cursor-pointer" />
      <Link href={`/products/${cartItem.product_id}`}>
        <Image
          src={cartItem.image}
          width={80}
          height={80}
          className="rounded-md cursor-pointer"
          alt={cartItem.product_name}
        />
      </Link>
      <div className="w-full flex justify-between flex-wrap">
        <div>
          <h4>{cartItem.product_name}</h4>
          <span className="font-bold text-primary">
            {formatCurrency(cartItem.price)}
          </span>
        </div>
        <div className="self-end flex gap-2">
          <button className="btn flexrc gap-1 text-xs text-grey">
            Hapus
            <BsTrash className="text-black" />
          </button>
          |
          <div className="flexrc gap-2">
            <button className="btn" onClick={handleCountDown}>
              <AiOutlineMinusCircle className="text-xl text-primary" />
            </button>
            <input
              type="number"
              className="w-6 outline-none text-center"
              value={count}
              onChange={(e) => hanldeInputCount(e)}
              onKeyDown={(e) => handleInputCountKeyDown(e)}
            />
            <button className="btn" onClick={handleCountUp}>
              <AiOutlinePlusCircle className="text-xl text-primary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
