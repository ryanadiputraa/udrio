export interface IToken {
  accessToken: string
  expiresIn: number
  refreshToken: string
}

const ls = window.localStorage

export const setToken = (token: object) => {
  ls.setItem("jwt_token", JSON.stringify(token))
}

export const getToken = (): IToken => {
  const { jsonToken } = JSON.parse(ls.getItem("jwt_token") ?? "")
  const token: IToken = {
    accessToken: jsonToken["accessToken"] ?? "",
    expiresIn: jsonToken["expiresIn"] ?? 0,
    refreshToken: jsonToken["refreshToken"] ?? "",
  }
  return token
}
