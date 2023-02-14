import Link from "next/link"
import { MdPlayArrow } from "react-icons/md"

import { IProduct } from "../page"
import { ProductImages } from "./components/productimages"

interface Props {
  params: { productId: string }
}

async function fetchProduct(productId: string): Promise<IProduct | null> {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}api/products/${productId}`
    )
    const json = await resp.json()
    return json.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export default async function Product({ params }: Props) {
  const product = await fetchProduct(params?.productId)
  const categoryLink = `/products?category=${encodeURIComponent(
    String(product?.product_category.category)
  )}&id=${product?.product_category.category_id}`

  return (
    <div className="px-[2%] flex flex-col gap-2">
      <div className="flex items-center justify-start sm:text-sm text-xs gap-1">
        <Link href={"/"} className="text-primary font-bold">
          Beranda
        </Link>
        <MdPlayArrow />
        <Link href={categoryLink} className="text-primary font-bold">
          {product?.product_category.category}
        </Link>
        <MdPlayArrow />
        {product?.product_name}
      </div>
      <ProductImages images={product?.images ?? []} />
    </div>
  )
}
