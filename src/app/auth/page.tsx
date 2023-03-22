"use client"

import { redirect } from "next/navigation"
import { IToken, useToken } from "hooks/token"

interface Props {
  searchParams?: { [key: string]: string | undefined }
}

export default function Auth({ searchParams }: Props) {
  const { setToken } = useToken()

  const token: IToken = {
    accessToken: searchParams?.["access_token"] ?? "",
    expiresIn: Number(searchParams?.["expires_in"]),
    refreshToken: searchParams?.["refresh_token"] ?? "",
  }

  if (token.accessToken) {
    setToken(token)
  }

  redirect("/")
}
