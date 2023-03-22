"use client"

import { redirect, useSearchParams } from "next/navigation"
import { ReactNode } from "react"

import { IToken, useToken } from "hooks/token"

export default function Auth(): ReactNode | Promise<ReactNode> {
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

  return <div>{redirect("/")}</div>
}
