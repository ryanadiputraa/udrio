"use client"

import { useContext, useEffect } from "react"

import { useFetch } from "."
import { AppContext } from "context"

export const useFetchUserData = (): void => {
  const { main, mainDispatch } = useContext(AppContext)
  const { getUserData } = useFetch()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData()
      if (data) {
        mainDispatch({ type: "SET_USER_DATA", payload: data })
      }
    }
    !main.userData.id && fetchData()
  }, [getUserData, main.userData.id, mainDispatch])
}
