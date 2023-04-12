"use client"

import { redirect, useSearchParams } from "next/navigation"
import { ReactNode, useContext, useEffect } from "react"

import { IToken, useToken } from "hooks/token"
import { AppContext } from "context"

export default function Auth(): ReactNode | Promise<ReactNode> {
  const { mainDispatch } = useContext(AppContext)
  const params = useSearchParams()
  const { setToken } = useToken()

  const token: IToken = {
    accessToken: params.get("access_token") ?? "",
    expiresIn: Number(params.get("expires_in")),
    refreshToken: params.get("refresh_token") ?? "",
  }

  if (token.accessToken) {
    setToken(token)
  }

  useEffect(() => {
    if (params.get("err")) {
      mainDispatch({
        type: "SHOW_TOAST",
        payload: {
          message: decodeURIComponent(String(params.get("err"))),
          type: "ERROR",
        },
      })
    }
    redirect("/")
  }, [params, mainDispatch])

  if (params.get("err")) return <div></div>
  return <div>{redirect("/")}</div>
}
