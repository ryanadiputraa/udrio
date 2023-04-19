import { FetchDataResponse, FetchNoDataResponse } from "data"

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
): Promise<FetchDataResponse<ICart[]>> {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}api/carts/`,
      {
        headers: headers,
        cache: "no-store",
      }
    )
    const json = await resp.json()
    return { data: json.data, isError: false }
  } catch (error) {
    return { data: [], isError: true }
  }
}

export async function putUserCart(
  headers: HeadersInit,
  payload: ICartPayload
): Promise<FetchNoDataResponse> {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}api/carts/`, {
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
    return { isError: false }
  } catch (error) {
    return { isError: true }
  }
}

export async function deleteCartItem(
  headers: HeadersInit,
  productId: string
): Promise<FetchNoDataResponse> {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}api/carts/${productId}`,
      {
        headers: headers,
        method: "DELETE",
      }
    )
    return { isError: false }
  } catch (error) {
    return { isError: true }
  }
}
