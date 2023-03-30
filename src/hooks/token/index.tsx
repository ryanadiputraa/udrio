"use client"

export interface IToken {
  accessToken: string
  expiresIn: number
  refreshToken: string
}

export const useToken = () => {
  const ls = typeof window !== "undefined" ? window.localStorage : null

  const hasValidToken = (): boolean => {
    let token: IToken
    const tokenString = ls?.getItem("jwt_token")

    if (!tokenString) return false
    token = JSON.parse(tokenString)

    return token.expiresIn > Math.floor(Date.now() / 1000)
  }

  const setToken = (token: IToken) => {
    ls?.setItem("jwt_token", JSON.stringify(token))
  }

  const removeToken = () => ls?.removeItem("jwt_token")

  const getToken = (): IToken => {
    let token: IToken
    const tokenString = ls?.getItem("jwt_token")

    if (!tokenString)
      return {
        accessToken: "",
        expiresIn: 0,
        refreshToken: "",
      }

    token = JSON.parse(tokenString)
    return token
  }

  return { hasValidToken, setToken, removeToken, getToken }
}
