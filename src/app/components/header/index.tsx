"use client"

import Image from "next/image"
import Link from "next/link"
import { AiOutlinePhone, AiOutlineShoppingCart } from "react-icons/ai"
import { IoLocationOutline } from "react-icons/io5"
import { BsPersonCircle } from "react-icons/bs"
import { useContext, useEffect } from "react"
import useSWR from "swr"

import { useFetch } from "hooks/fetch"
import { AppContext } from "context"

export default function Header() {
  const { main, mainDispatch } = useContext(AppContext)
  const { getUserData } = useFetch()

  const { data } = useSWR("userData", getUserData)
  useEffect(() => {
    if (data) {
      mainDispatch({ type: "SET_USER_DATA", payload: data })
    }
  }, [data])

  return (
    <header className="flex w-full flex-col justify-center gap-1 shadow-md mb-4 px-[2%] py-2">
      <span className="flex items-center sm:text-sm text-xs text-grey">
        <IoLocationOutline />
        Jl.Tadulako, Palu | <AiOutlinePhone /> 08114548080
      </span>
      <div className="flex justify-between items-center gap-4">
        <Link href={"/"}>
          <Image
            src={"/images/logo.png"}
            width={160}
            height={100}
            priority
            className="max-h-14 w-auto"
            alt="Rio Digital Printing"
          />
        </Link>
        <input
          type="text"
          placeholder={"Cari..."}
          className="w-1/2 border-2 border-solid border-grey py-1 px-4 rounded-2xl"
        />
        <div className="flexrc text-grey sm:gap-4 gap-2">
          <button>
            <AiOutlineShoppingCart className="sm:text-4xl text-3xl" />
          </button>
          <button>
            {main.userData.id ? (
              <Image
                src={main.userData.picture}
                width={30}
                height={30}
                className=" min-w-[2rem] rounded-full"
                alt={main.userData.first_name}
              />
            ) : (
              <BsPersonCircle className="sm:text-3xl text-2xl" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
