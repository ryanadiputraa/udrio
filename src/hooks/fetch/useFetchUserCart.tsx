"use client"

import { useContext, useEffect } from "react"

import { AppContext } from "context"
import { useFetch } from "."

export const useFetchUserCart = () => {
  const { main, mainDispatch } = useContext(AppContext)
  const { getUserCart } = useFetch()

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getUserCart()
      mainDispatch({ type: "SET_CART", payload: resp?.data ?? [] })
    }
    main.userData.id && fetchData()
  }, [main.userData.id, mainDispatch, getUserCart])
}
