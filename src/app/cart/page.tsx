"use client"

import { useEffect, useState } from "react"

import { ICart } from "data/cart"
import { useFetch } from "hooks/fetch"
import { CartItem } from "./components/cartitem"
import { formatCurrency } from "utils/currency"

export default function Cart() {
  const { getUserCart } = useFetch()
  const [cart, setCart] = useState<ICart[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setCart(await getUserCart())
    }
    fetchData()
  }, [])

  return (
    <div className="flex justify-center items-center sm:flex-row flex-col gap-8">
      <div className="flex-[2] flexcc items-start">
        <h2 className="font-bold text-xl mb-4">Keranjang</h2>
        <div className="flexcc gap-2 items-start w-full">
          {cart?.map((data, idx) => (
            <CartItem key={idx} cartItem={data} />
          ))}
        </div>
      </div>
      <div className="flex-[1] border-grey border-2 rounded-lg px-4 py-2 font-bold text-md">
        <div className="flex justify-between">
          <h4>Total Harga:</h4>
          <span>{formatCurrency(2000)}</span>
        </div>
        <button className="btn btn-primary w-full rounded-md py-1 mt-4">
          Beli (1)
        </button>
      </div>
    </div>
  )
}
