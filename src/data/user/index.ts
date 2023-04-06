import { FetchDataResponse } from "data"

export interface IUserData {
  id: string
  first_name: string
  last_name: string
  email: string
  picture: string
  locale: string
}

export async function fetchUserData(
  headers: HeadersInit
): Promise<FetchDataResponse<IUserData | null>> {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}api/users/`,
      {
        headers: headers,
        cache: "no-store",
      }
    )
    const json = await resp.json()
    return { data: json.data, isError: false }
  } catch (error) {
    return { data: null, isError: true }
  }
}
