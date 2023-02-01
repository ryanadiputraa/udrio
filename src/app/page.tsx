import Image from "next/image"
import Link from "next/link"

import Banners from "./components/banners"
import { IProducts } from "./products/page"

interface Category {
  category_id: number
  category: string
  icon: string
}

async function fetchCategories(): Promise<Category[]> {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}api/categories/`
    )
    const json = await resp.json()
    return json.data
  } catch (error) {
    console.error(error)
    return []
  }
}

async function fetchProducts(): Promise<IProducts[]> {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}api/products?size=20`
    )
    const json = await resp.json()
    return json.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function Home() {
  const categories = await fetchCategories()
  const products = await fetchProducts()

  return (
    <>
      <Banners />
      <div className="flexrc gap-4 p-2 mt-2">
        {categories.map((category) => (
          <Link
            key={category.category_id}
            href={`/products?category_id=${category.category_id}`}
          >
            <button className="w-28 h-28 text-sm p-2 text-center flexcc shadow-xl rounded-lg hover:scale-105 transition-all">
              <Image
                src={category.icon}
                alt={category.category}
                width={60}
                height={60}
              />
              <span>{category.category}</span>
            </button>
          </Link>
        ))}
      </div>
      <div>
        {products.map((product) => (
          <p key={product.id}>{product.product_name}</p>
        ))}
      </div>
    </>
  )
}
