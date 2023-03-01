"use client"

export interface IToken {
  accessToken: string
  expiresIn: number
  refreshToken: string
}

export const useToken = () => {
  const ls = typeof window !== "undefined" ? window.localStorage : null

  const hasValidToken = (): boolean => {
    const jsonToken = JSON.parse(ls?.getItem("jwt_token") ?? "")
    if (!jsonToken) return false

    const isNotExpire = jsonToken?.["expiresIn"] > Math.floor(Date.now() / 1000)

    return isNotExpire
  }

  const setToken = (token: IToken) => {
    ls?.setItem("jwt_token", JSON.stringify(token))
  }

  const getToken = (): IToken => {
    const jsonToken = JSON.parse(ls?.getItem("jwt_token") ?? "")
    const token: IToken = {
      accessToken: jsonToken?.["accessToken"] ?? "",
      expiresIn: jsonToken?.["expiresIn"] ?? 0,
      refreshToken: jsonToken?.["refreshToken"] ?? "",
    }
    return token
  }

  return { hasValidToken, setToken, getToken }
}
