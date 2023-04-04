export interface ICart {
  quantity: number
  product_id: string
  product_name: string
  price: number
  is_available: boolean
  image: string
  min_order: number
}

export interface ICartPayload {
  quantity: number
  product_id: string
}

export async function fetchUserCart(
  headers: HeadersInit
): Promise<ICart[] | null> {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}api/cart/`,
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

export async function putUserCart(
  headers: HeadersInit,
  payload: ICartPayload
): Promise<boolean> {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}api/cart/`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
      method: "PUT",
      body: JSON.stringify({
        product_id: payload.product_id,
        quantity: payload.quantity,
      }),
    })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function deleteCartItem(
  headers: HeadersInit,
  productId: string
): Promise<boolean> {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}api/cart/${productId}`,
      {
        headers: headers,
        method: "DELETE",
      }
    )
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
