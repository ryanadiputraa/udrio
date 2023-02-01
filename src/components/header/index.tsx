import Image from "next/image"
import Link from "next/link"
import { AiOutlinePhone, AiOutlineShoppingCart } from "react-icons/ai"
import { BsPersonCircle } from "react-icons/bs"

export default function Header() {
  return (
    <header className="w-full flex flex-col justify-center gap-1 py-4 px-[2%]">
      <span className="flex items-center text-sm text-grey">
        Senin-Sabtu 08:00-21:00 | <AiOutlinePhone /> 08114548080
      </span>
      <div className="flex justify-between items-center gap-4">
        <Link href={"/"}>
          <Image
            src={"/images/logo.png"}
            width={140}
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
