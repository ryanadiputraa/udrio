import Link from "next/link"

import { fetchCategories } from "data/categories"
import { fetchProducts } from "data/products"
import { Banners } from "./components/banners"
import { ProductCard } from "./products/components/productcard"

export default async function Home() {
  const { data: categories } = await fetchCategories()
  const { data: products } = await fetchProducts()

  return (
    <>
      <Banners />
      <div className="sm:flexrc flex sm:justify-center justify-start sm:flex-wrap gap-4 pb-4 my-4 overflow-auto">
        {categories?.map((category) => (
          <Link
            key={category.category_id}
            href={`/products?category=${encodeURIComponent(
              category.category
            )}&id=${category.category_id}`}
          >
            <button className="btn sm:w-32 w-24 h-24 sm:text-sm text-xs p-2 text-center flexcc gap-1 shadow-md rounded-lg transition-all">
              <img
                className="w-1/3 max-h-full"
                src={category.icon}
                alt={category.category}
              />
              <span>{category.category}</span>
            </button>
          </Link>
        ))}
      </div>
      <div className="flex justify-center sm:gap-6 gap-3 items-start flex-wrap">
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
