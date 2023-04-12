"use client"

import { useContext, useEffect } from "react"

import { AppContext } from "context"
import { useFetch } from "."

export const useFetchUserCart = () => {
  const { mainDispatch } = useContext(AppContext)
  const { getUserCart } = useFetch()

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getUserCart()
      mainDispatch({ type: "SET_CART", payload: resp?.data ?? [] })
    }
    fetchData()
  }, [mainDispatch, getUserCart])
}
