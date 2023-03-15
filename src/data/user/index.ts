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
): Promise<IUserData | null> {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}api/users/`,
      {
        headers: headers,
        cache: "no-store",
      }
    )
    const json = await resp.json()
    return json.data
  } catch (error) {
    console.error(error)
    return null
  }
}
