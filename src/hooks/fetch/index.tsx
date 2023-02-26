"use client"

import { IToken, useToken } from "hooks/token"

export const useFetch = () => {
  const BASE_URL = String(process.env.NEXT_PUBLIC_BASE_API_URL)
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
    } catch (error) {
      window.location.href = `${BASE_URL}oauth/login/google`
    }
  }

  if (!hasValidToken()) {
    refresh()
  }
}
