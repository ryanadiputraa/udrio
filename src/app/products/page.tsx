"use client"

import Link from "next/link"
import { MdPlayArrow } from "react-icons/md"
import { useSearchParams } from "next/navigation"

import { fetchProducts, IProduct } from "data/products"
import { ProductCard } from "./components/productcard"
import { useEffect, useState } from "react"

export default function Products() {
  const params = useSearchParams()
  const categoryId = Number(params.get("id")) ?? 0
  const category = params.get("category") ?? ""
  const search = params.get("search") ?? ""

  const [products, setProducts] = useState<IProduct[]>()

  useEffect(() => {
    const fetchData = async () => {
      const { data } = search
        ? await fetchProducts(undefined, search)
        : await fetchProducts(categoryId)
      setProducts(data)
    }
    fetchData()
  }, [categoryId, search])

  return (
    <>
      <div className="sm:h-40 h-32 bg-primary absolute left-0 w-full">
        <div className="w-full max-w-7xl h-full mx-auto my-0 relative">
          <h2 className="absolute sm:bottom-12 bottom-6 left-[2%] sm:text-4xl text-2xl text-white">
            {category}
          </h2>
          <div className="flex items-center gap-4 bg-white absolute bottom-[-1rem] left-[2%] shadow-xl py-2 px-[2%] w-3/4 rounded-md sm:text-sm text-xs">
            <Link href={"/"} className="text-primary font-bold">
              Beranda
            </Link>
            <MdPlayArrow />
            {search ? decodeURIComponent(search) : category}
          </div>
        </div>
      </div>
      <div className="flex sm:justify-start justify-center sm:gap-6 gap-3 items-start flex-wrap sm:pt-52 pt-40 px-[2%]">
        {products?.map((product) => (
          <Link
            className="sm:w-56 w-40 sm:h-[23rem] h-72"
            href={`/products/${product.id}`}
            key={product.id}
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </>
  )
}
