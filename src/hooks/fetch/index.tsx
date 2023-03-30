"use client"

import { AppContext } from "context"
import { fetchUserCart } from "data/cart"
import { fetchUserData } from "data/user"
import { IToken, useToken } from "hooks/token"
import { useContext } from "react"

export const useFetch = () => {
  const BASE_URL = String(process.env.NEXT_PUBLIC_BASE_API_URL)
  const { main } = useContext(AppContext)
  const { hasValidToken, getToken, setToken } = useToken()
  const { accessToken, refreshToken } = getToken()

  const refresh = async () => {
    try {
      const resp = await fetch(`${BASE_URL}oauth/refresh`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
      if (resp.status !== 200) throw new Error("fail to refresh")

      const json = await resp.json()
      const token: IToken = {
        accessToken: json.data?.access_token,
        expiresIn: json.data?.expires_in,
        refreshToken: json.data?.refresh_token,
      }
      setToken(token)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  if (accessToken && !hasValidToken()) {
    refresh()
  }

  const authHeaders: HeadersInit = {
    Authorization: `Bearer ${accessToken}`,
  }
  const getUserData = () =>
    accessToken && !main.userData.id ? fetchUserData(authHeaders) : null
  const getUserCart = () => (accessToken ? fetchUserCart(authHeaders) : null)

  return { getUserData, getUserCart }
}
