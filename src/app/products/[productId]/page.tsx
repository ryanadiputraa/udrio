import Link from "next/link"
import { MdPlayArrow } from "react-icons/md"

import { fetchProductDetail } from "data/products"
import { ProductDetails } from "./components/details"
import { ProductOrder } from "./components/order"
import { ProductImages } from "./components/productimages"

interface Props {
  params: { productId: string }
}

export default async function Product({ params }: Props) {
  const { data: product } = await fetchProductDetail(params?.productId)
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
      <div className="product-detail flex flex-wrap items-start justify-between">
        {product && (
          <>
            <ProductImages images={product.images ?? []} />
            <ProductDetails product={product} />
            <ProductOrder product={product} />
          </>
        )}
      </div>
    </div>
  )
}
