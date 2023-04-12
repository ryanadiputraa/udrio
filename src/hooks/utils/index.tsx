"use client"

import { useEffect } from "react"

export const useOutsideClick = (callback: () => any): void => {
  useEffect(() => {
    const root = document.querySelector("#root")
    root?.addEventListener("click", () => callback())

    return () => root?.removeEventListener("click", () => callback())
  }, []) // eslint-disable-line
}
