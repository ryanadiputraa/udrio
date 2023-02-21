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

export interface IProductImages {
  image_id: string
  url: string
}

export async function useFetchProducts(
  categoryId?: number
): Promise<IProduct[]> {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}api/products${
        categoryId ? "?category_id=${categoryId}&size=20" : ""
      }`
    )
    const json = await resp.json()
    return json.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function useFetchProductDetail(
  productId: string
): Promise<IProduct | null> {
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
