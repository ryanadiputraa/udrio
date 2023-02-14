import Image from "next/image"
import Link from "next/link"
import { AiOutlinePhone, AiOutlineShoppingCart } from "react-icons/ai"
import { IoLocationOutline } from "react-icons/io5"
import { BsPersonCircle } from "react-icons/bs"

export function Header() {
  return (
    <header className="w-full flex flex-col justify-center gap-1 pt-4 pb-2 px-[2%] shadow-md mb-4">
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
            className="max-h-14"
            alt="Rio Digital Printing"
          />
        </Link>
        <input
          type="text"
          placeholder={"Cari..."}
          className="w-1/2 border-2 border-solid border-grey py-1 px-4 rounded-2xl"
        />
        <div className="flexrc text-grey sm:gap-6 gap-2">
          <button>
            <AiOutlineShoppingCart className="sm:text-4xl text-3xl" />
          </button>
          <button>
            <BsPersonCircle className="sm:text-3xl text-2xl" />
          </button>
        </div>
      </div>
    </header>
  )
}
