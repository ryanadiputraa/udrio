export interface IProducts {
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
  images: IProductImages[]
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

async function fetchProducts(categoryId: number): Promise<IProducts[]> {
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
  const products = await fetchProducts(Number(searchParams?.category_id ?? 0))

  return <div></div>
}
