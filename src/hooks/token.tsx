"use client"

export interface IToken {
  accessToken: string
  expiresIn: number
  refreshToken: string
}

export const useToken = () => {
  const ls = window.localStorage

  const hasValidToken = (): boolean => {
    const { jsonToken } = JSON.parse(ls.getItem("jwt_token") ?? "")

    const d = new Date()
    const isNotExpire = jsonToken["expiresIn"] > Math.floor(d.getTime() / 1000)

    return Boolean(jsonToken["accessToken"]) && isNotExpire
  }

  const setToken = (token: object) => {
    ls.setItem("jwt_token", JSON.stringify(token))
  }

  const getToken = (): IToken => {
    const { jsonToken } = JSON.parse(ls.getItem("jwt_token") ?? "")
    const token: IToken = {
      accessToken: jsonToken["accessToken"] ?? "",
      expiresIn: jsonToken["expiresIn"] ?? 0,
      refreshToken: jsonToken["refreshToken"] ?? "",
    }
    return token
  }

  return { hasValidToken, setToken, getToken }
}
