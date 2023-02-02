import Link from "next/link"

import { ProductCard } from "./components/productcard"

export interface IProduct {
  id: string
  product_name: string
  product_category: {
    category_id: number
    category: string
    icon: string
  }
  price: number
  is_available: boolean
  description: string
  min_order: number
  images?: IProductImages[]
  created_at: string
  updated_at: string
}

interface IProductImages {
  image_id: string
  url: string
}

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined }
}

async function fetchProducts(categoryId: number): Promise<IProduct[]> {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}api/products?category_id=${categoryId}&size=20`
    )
    const json = await resp.json()
    return json.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function Products({ searchParams }: Props) {
  const categoryId = Number(searchParams?.["id"]) ?? 0
  const category = searchParams?.["category"] ?? ""
  const products = categoryId ? await fetchProducts(categoryId) : []

  return (
    <>
      <div className="sm:h-48 h-32 bg-primary relative w-full">
        <h2 className="absolute sm:bottom-12 bottom-6 left-[2%] sm:text-4xl text-2xl text-white">
          {category}
        </h2>
        <div className="flex items-center gap-4 bg-white absolute bottom-[-1rem] left-[2%] shadow-xl py-2 px-[2%] w-3/4 rounded-md sm:text-lg text-xs">
          <Link href={"/"} className="text-primary font-bold">
            Beranda
          </Link>
          {" > "}
          <Link
            href={`/products/?category=${encodeURIComponent(
              String(category)
            )}&id=${categoryId}`}
          >
            {category}
          </Link>
        </div>
      </div>
      <div className="flex sm:justify-start justify-center sm:gap-6 gap-3 items-start flex-wrap mt-12 px-[2%]">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </>
  )
}
