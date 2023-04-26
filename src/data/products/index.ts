import { FetchDataResponse } from "data"

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

export async function fetchProducts(
  categoryId?: number,
  query?: string
): Promise<FetchDataResponse<IProduct[]>> {
  let url = `${process.env.NEXT_PUBLIC_BASE_API_URL}api/products/${
    categoryId ? `?category_id=${categoryId}&size=40` : ""
  }`
  if (query) url += `?query=${encodeURIComponent(query)}`

  try {
    const resp = await fetch(url, {
      next: { revalidate: 60 },
    })
    const json = await resp.json()
    return { data: json.data, isError: false }
  } catch (error) {
    return { data: [], isError: true }
  }
}

export async function fetchProductDetail(
  productId: string
): Promise<FetchDataResponse<IProduct | null>> {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}api/products/${productId}`,
      { next: { revalidate: 60 } }
    )
    const json = await resp.json()
    return { data: json.data, isError: false }
  } catch (error) {
    return { data: null, isError: true }
  }
}
