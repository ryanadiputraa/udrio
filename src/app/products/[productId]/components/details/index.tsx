import Image from "next/image"
import { MdOutlineEditNote } from "react-icons/md"
import { RxDotFilled } from "react-icons/rx"

import { IProduct } from "hooks/products"
import { formatCurrency } from "utils/currency"

interface Props {
  product: IProduct
}

export function ProductDetails({ product }: Props) {
  return (
    <div className="sm:w-2/4 w-full sm:px-8 px-2 flex flex-col gap-1">
      <h2 className="text-xl font-bold ">{product.product_name}</h2>
      <span className="flexrc justify-start text-sm gap-1">
        <Image
          src={product.product_category.icon}
          width={20}
          height={20}
          alt={product.product_category.category}
        />
        {product.product_category.category}
        <RxDotFilled />
        <MdOutlineEditNote />
        Minimal pemesanan: {product.min_order}
      </span>
      <h4 className="text-2xl font-bold text-primary">
        {formatCurrency(product.price)}
      </h4>
      <p className="text-sm text-dark-grey">{product.description}</p>
    </div>
  )
}
