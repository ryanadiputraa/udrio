"use client"

import Image from "next/image"
import Link from "next/link"
import { AiOutlinePhone, AiOutlineShoppingCart } from "react-icons/ai"
import { IoLocationOutline } from "react-icons/io5"
import { BsPersonCircle } from "react-icons/bs"
import { useContext, useState } from "react"

import { AppContext } from "context"
import { useOutsideClick } from "hooks/utils"
import { useToken } from "hooks/token"
import { useFetchUserData } from "hooks/fetch/useFetchUserData"
import { useFetchUserCart } from "hooks/fetch/useFetchUserCart"

interface IDropdownMenu {
  href: string
  name: string
  callback?: () => any
}

export default function Header() {
  const { main } = useContext(AppContext)
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false)
  const { removeToken } = useToken()
  const isLoggedIn = main.userData.id

  useFetchUserData()
  useFetchUserCart()
  useOutsideClick(() => setIsOpenDropdown(false))

  const dropdownMenu: IDropdownMenu[] = [
    {
      href: isLoggedIn
        ? "/"
        : `${process.env.NEXT_PUBLIC_BASE_API_URL}oauth/login/google`,
      name: isLoggedIn ? "Keluar" : "Login",
      callback: isLoggedIn ? removeToken : () => {},
    },
  ]

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
          {isLoggedIn ? (
            <Link href={"/cart"}>
              <button>
                <AiOutlineShoppingCart className="btn sm:text-4xl text-3xl relative top-[0.15rem]" />
              </button>
            </Link>
          ) : (
            <a
              href={`${process.env.NEXT_PUBLIC_BASE_API_URL}oauth/login/google`}
            >
              <button>
                <AiOutlineShoppingCart className="btn sm:text-4xl text-3xl relative top-[0.15rem]" />
              </button>
            </a>
          )}
          <button onClick={() => setIsOpenDropdown(true)}>
            {isLoggedIn ? (
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
          {/* Dropdown menu */}
          <div
            id="profile-dropdown"
            className={`${
              isOpenDropdown ? "" : "hidden"
            } absolute top-[5.5rem] right-[1.3rem] z-10 bg-white rounded-lg shadow-2xl w-44`}
          >
            <ul
              className="py-2 text-sm text-black"
              aria-labelledby="dropdownDefaultButton"
            >
              {dropdownMenu?.map((menu, idx) => (
                <li key={idx} onClick={menu.callback}>
                  <a
                    href={menu.href}
                    className="block px-4 py-2 hover:bg-primary hover:text-white"
                  >
                    {menu.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
