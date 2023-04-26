import { FetchDataResponseWithPagination, FetchNoDataResponse } from "data"

export interface IOrder {
  order_id: number
  sub_total: number
  created_at: string
  updated_at: string
  items: IOrderItem[]
}

export interface IOrderItem {
  product_id: string
  product_name: string
  quantity: number
  price: number
  total_price: number
  image: string
}

export interface IOrderPayload {
  orders: IOrderItemPayload[]
}

export interface IOrderItemPayload {
  product_id: string
  quantity: number
}

export async function fetchUserOrders(
  headers: HeadersInit,
  size?: number,
  page?: number
): Promise<FetchDataResponseWithPagination<IOrder[]>> {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}api/orders/${
        size && page ? `?size=${size}&page=${page}` : ""
      }`,
      {
        headers: headers,
        cache: "no-store",
      }
    )
    const json = await resp.json()
    return { data: json.data, meta: json.meta, isError: false }
  } catch (error) {
    return {
      data: [],
      meta: {
        current_page: 0,
        total_data: 0,
        total_page: 0,
        next_page: 0,
        previous_page: 0,
      },
      isError: true,
    }
  }
}

export async function postOrder(
  headers: HeadersInit,
  payload: IOrderPayload
): Promise<FetchNoDataResponse> {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}api/orders/`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
      method: "POST",
      body: JSON.stringify(payload),
    })
    return { isError: false }
  } catch (error) {
    return { isError: true }
  }
}
