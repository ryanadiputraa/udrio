import { FetchDataResponse } from "data"

export interface ICategory {
  category_id: number
  category: string
  icon: string
}

export async function fetchCategories(): Promise<
  FetchDataResponse<ICategory[]>
> {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}api/categories/`
    )
    const json = await resp.json()
    return { data: json.data, isError: false }
  } catch (error) {
    return { data: [], isError: true }
  }
}
