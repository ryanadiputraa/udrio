interface Props {
  params: { productId: string }
}

export default function Product({ params }: Props) {
  return <div>{params.productId}</div>
}
