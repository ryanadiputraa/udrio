"use client"

import { IToken, setToken } from "utils/token"
import { redirect } from "next/navigation"

interface Props {
  searchParams?: { [key: string]: string | undefined }
}

export default function ({ searchParams }: Props) {
  const token: IToken = {
    accessToken: searchParams?.["access_token"] ?? "",
    expiresIn: Number(searchParams?.["expires_in"]),
    refreshToken: searchParams?.["refresh_token"] ?? "",
  }

  if (token.accessToken && window !== undefined) {
    setToken
  }

  redirect("/")
}
