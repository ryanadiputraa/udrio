"use client"

import { useCallback, useContext, useRef, useState } from "react"
import { format } from "date-fns"
import * as Locales from "date-fns/locale"
import { BsCalendar3 } from "react-icons/bs"

import { AppContext } from "context"
import { OrderItem } from "./orderitem"
import { formatCurrency } from "utils/currency"
import { useFetchUserOrders } from "hooks/fetch/user"
import Spinner from "app/components/spinner"

export default function Order() {
  const { main } = useContext(AppContext)
  const [page, setPage] = useState(1)

  const { isLoading, hasMore } = useFetchUserOrders(page)

  const nullRef = useRef(null)
  const observer = useRef(null) as any
  const lastOrderRef = useCallback(
    (node: any) => {
      if (isLoading) return
      if (observer.current) observer.current?.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries?.[0]?.isIntersecting && hasMore) {
          setPage((currentPage) => currentPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [isLoading, hasMore]
  )

  return (
    <div className="sm:px-[20%] px-[10%]">
      <h2 className="font-bold text-xl mb-4">Pesanan</h2>
      {main.orders?.map((order, idx) => (
        <div
          key={order.order_id ?? idx}
          ref={main.orders.length === idx + 1 ? lastOrderRef : nullRef}
          className="flecc w-full gap-8 px-4 shadow-lg rounded-md mb-10 pt-2"
        >
          <div className="flex justify-between">
            <p className="flexrc gap-1">
              <BsCalendar3 />
              Pesanan
              <span className="text-primary font-bold">
                {format(new Date(order.created_at), "dd MMMM yyyy", {
                  locale: Locales["id"],
                })}
              </span>
            </p>
            <p>
              Sub Total:{" "}
              <span className="font-bold text-primary">
                {formatCurrency(order.sub_total)}
              </span>
            </p>
          </div>
          {order.items?.map((item, idx) => (
            <OrderItem
              item={item}
              totalItems={order.items.length}
              idx={idx}
              key={item.product_id ?? idx}
            />
          ))}
        </div>
      ))}
      {isLoading && <Spinner />}
    </div>
  )
}
