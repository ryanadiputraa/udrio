"use client"

import Image from "next/image"
import Link from "next/link"

import { IOrderItem } from "data/order"
import { formatCurrency } from "utils/currency"

interface Props {
  item: IOrderItem
  totalItems: number
  idx: number
}

export function OrderItem({ item, totalItems, idx }: Props) {
  return (
    <div
      className={`flex justify-start w-full gap-2 py-4 py ${
        totalItems - 1 !== idx
          ? "border-b-[0.05rem] border-grey border-solid"
          : ""
      }`}
    >
      <Link href={`/products/${item.product_id}`}>
        <Image
          src={item.image}
          width={80}
          height={80}
          className="rounded-md cursor-pointer"
          alt={item.product_name}
        />
      </Link>
      <div className="w-full flex justify-between flex-wrap">
        <div>
          <h4 className="font-bold">{item.product_name}</h4>
          <span className="text-grey text-sm">
            {item.quantity} pesanan x {formatCurrency(item.price)}
          </span>
        </div>
        <div className="flexcc text-sm">
          <span>Total Harga</span>
          <h4 className="font-semibold text-primary">
            {formatCurrency(item.total_price)}
          </h4>
        </div>
      </div>
      <div></div>
    </div>
  )
}
