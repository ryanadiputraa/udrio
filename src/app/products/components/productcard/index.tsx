import Image from "next/image"

import { IProduct } from "data/products"
import { formatCurrency } from "utils/currency"
import ImagePlaceholder from "assets/svg/placeholder.svg"

interface Props {
  product: IProduct
}

export function ProductCard({ product }: Props) {
  return (
    <div className="w-full h-full mx-auto shadow-2xl rounded-xl hover:scale-105 transition-all overflow-hidden">
      <div className="w-full sm:h-64 h-40">
        <Image
          src={product.images?.[0]?.url ?? ImagePlaceholder}
          width={120}
          height={200}
          alt={product.product_name}
          className={`w-full h-full object-cover ${
            product.images?.[0]?.url ? "" : "p-2"
          }`}
        />
      </div>
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
