"use client"

import { useContext, useEffect, useState } from "react"

import { AppContext } from "context"
import { useFetch } from "."

export const useFetchUserData = (): void => {
  const { main, mainDispatch } = useContext(AppContext)
  const { getUserData } = useFetch()

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getUserData()
      if (resp?.isError) {
        mainDispatch({
          type: "SHOW_TOAST",
          payload: { message: "Gagal mengambil data pengguna", type: "ERROR" },
        })
      } else if (resp?.data) {
        mainDispatch({ type: "SET_USER_DATA", payload: resp.data })
      }
    }
    !main.userData.id && fetchData()
  }, [main.userData.id, mainDispatch]) // eslint-disable-line
}

export const useFetchUserCart = () => {
  const { main, mainDispatch } = useContext(AppContext)
  const { getUserCart } = useFetch()

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getUserCart()
      mainDispatch({ type: "SET_CART", payload: resp?.data ?? [] })
    }
    main.userData.id && fetchData()
  }, [main.userData.id, mainDispatch]) // eslint-disable-line
}

export const useFetchUserOrders = (page: number) => {
  const { main, mainDispatch } = useContext(AppContext)
  const { getUserOrders } = useFetch()
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const resp = await getUserOrders(10, page)
      mainDispatch({
        type: "SET_ORDERS",
        payload:
          page === 1
            ? resp?.data ?? []
            : [...main.orders, ...(resp?.data ?? [])] ?? main.orders,
      })
      setHasMore(resp?.meta?.next_page !== resp?.meta?.current_page)
      setIsLoading(false)
    }
    main.userData.id && fetchData()
  }, [main.userData.id, mainDispatch, page]) // eslint-disable-line

  return { isLoading, hasMore }
}
