import Image from "next/image"
import Link from "next/link"

import { useFetchCategories } from "hooks/categories"
import { useFetchProducts } from "hooks/products"
import { Banners } from "./components/banners"
import { ProductCard } from "./products/components/productcard"

export default async function Home() {
  const categories = await useFetchCategories()
  const products = await useFetchProducts()

  return (
    <div className="px-[2%]">
      <Banners />
      <div className="sm:flexrc flex sm:justify-center justify-start sm:flex-wrap gap-4 pb-4 my-4 overflow-auto">
        {categories.map((category) => (
          <Link
            key={category.category_id}
            href={`/products?category=${encodeURIComponent(
              category.category
            )}&id=${category.category_id}`}
          >
            <button className="sm:w-32 w-24 h-24 sm:text-sm text-xs p-2 text-center flexcc shadow-md rounded-lg hover:scale-105 transition-all">
              <Image
                src={category.icon}
                alt={category.category}
                width={40}
                height={40}
              />
              <span>{category.category}</span>
            </button>
          </Link>
        ))}
      </div>
      <div className="flex sm:justify-start justify-center sm:gap-6 gap-3 items-start flex-wrap">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  )
}
