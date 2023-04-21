"use client"

import { useContext, useEffect } from "react"
import { format } from "date-fns"
import * as Locales from "date-fns/locale"
import { BsCalendar3 } from "react-icons/bs"

import { AppContext } from "context"
import { useFetch } from "hooks/fetch"
import { OrderItem } from "./orderitem"
import { formatCurrency } from "utils/currency"

export default function Order() {
  const { main, mainDispatch } = useContext(AppContext)
  const { getUserOrders } = useFetch()

  useEffect(() => {
    if (!main.userData.id) return
    const fetchOrders = async () => {
      const resp = await getUserOrders()
      mainDispatch({ type: "SET_ORDERS", payload: resp?.data ?? [] })
    }
    fetchOrders()
  }, [main.userData.id, mainDispatch]) // eslint-disable-line

  return (
    <div className="sm:px-[20%] px-[10%]">
      <h2 className="font-bold text-xl mb-4">Pesanan</h2>
      {main.orders?.map((order, idx) => (
        <div
          key={order.order_id ?? idx}
          className="flecc w-full gap-8 px-4 shadow-lg rounded-md mb-4 pt-2"
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
    </div>
  )
}
