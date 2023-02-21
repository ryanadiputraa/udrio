import Image from "next/image"

import { IProduct } from "data/products"
import { formatCurrency } from "utils/currency"

interface Props {
  product: IProduct
}

export function ProductCard({ product }: Props) {
  return (
    <div className="sm:w-56 w-36 sm:min-h-[22rem] min-h-[16.5rem] shadow-2xl rounded-xl hover:scale-105 transition-all overflow-hidden">
      <Image
        src={product.images?.[0]?.url ?? ""}
        width={120}
        height={200}
        alt={product.product_name}
        className="w-full"
      />
      <div className="py-2 px-4">
        <h4 className="font-bold sm:text-md text:sm line-clamp-2">
          {product.product_name}
        </h4>
        <p className="text-xs text-grey line-clamp-2">{product.description}</p>
        <span className="text-primary font-bold sm:text-md text-sm">
          {formatCurrency(product.price)}
        </span>
      </div>
    </div>
  )
}
