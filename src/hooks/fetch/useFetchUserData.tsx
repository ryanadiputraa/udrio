"use client"

import { useContext, useEffect } from "react"

import { useFetch } from "."
import { AppContext } from "context"

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
  }, [main.userData.id, mainDispatch, getUserData])
}
