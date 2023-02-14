import { IProduct } from "app/products/page"

interface Props {
  product: IProduct
}

export function ProductOrder({ product }: Props) {
  return <div className="sm:w-1/4 w-full"></div>
}
