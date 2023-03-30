export interface ICart {
  quantity: number
  product_id: string
  product_name: string
  price: number
  is_available: boolean
  image: string
  min_order: number
}

export async function fetchUserCart(
  headers: HeadersInit
): Promise<ICart[] | null> {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}api/cart`,
      {
        headers: headers,
        cache: "no-store",
      }
    )
    const json = await resp.json()
    return json.data
  } catch (error) {
    console.error(error)
    return []
  }
}
