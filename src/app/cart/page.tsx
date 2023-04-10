"use client"

import { useContext, useEffect, useState } from "react"

import { AppContext } from "context"
import { CartItem } from "./components/cartitem"
import { formatCurrency } from "utils/currency"
import { ICart } from "data/cart"

export default function Cart() {
  const { main } = useContext(AppContext)
  const [selectedItem, setSelectedItem] = useState<ICart[]>([])
  const [totalPrice, setTotalPrice] = useState(0)

  const updateTotalPrice = () =>
    setTotalPrice(
      selectedItem.reduce((sum, item) => sum + item.price * item.quantity, 0)
    )

  const onSelectItem = (selected: ICart) => {
    let duplicated = false

    setSelectedItem(
      selectedItem.filter((item) => {
        if (item.product_id === selected.product_id) {
          duplicated = true
        }
        return item.product_id !== selected.product_id
      })
    )

    if (duplicated) return
    setSelectedItem([...selectedItem, selected])
  }

  const onUpdateItemCount = (id: string, count: number) => {
    selectedItem.forEach((item, idx) => {
      if (item.product_id === id) {
        console.log(item.product_id, id)
        selectedItem[idx] = {
          ...item,
          quantity: count,
        }
        updateTotalPrice()
      }
    })
  }

  useEffect(() => {
    updateTotalPrice()
  }, [selectedItem])

  return (
    <div className="flex justify-center sm:items-start items-center sm:flex-row flex-col gap-8">
      <div className="flex-[2] flexcc items-start">
        <h2 className="font-bold text-xl mb-4">Keranjang</h2>
        <div className="flexcc gap-2 items-start w-full">
          {main.cart.length ? (
            main.cart.map((data, idx) => (
              <CartItem
                key={idx}
                cartItem={data}
                onSelectItem={onSelectItem}
                onUpdateItemCount={onUpdateItemCount}
              />
            ))
          ) : (
            <span>Belum ada produk di keranjang...</span>
          )}
        </div>
      </div>
      <div className="flex-[1] border-grey border-2 rounded-lg sm:mt-12 mt-0 px-4 py-2 font-bold text-md">
        <div className="flex justify-between">
          <h4>Total Harga:</h4>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        <button
          className={`btn btn-primary w-full rounded-md py-1 mt-4 ${
            totalPrice ? "" : "disabled"
          }`}
        >
          Pesan
        </button>
      </div>
    </div>
  )
}
