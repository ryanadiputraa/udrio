export interface Category {
  category_id: number
  category: string
  icon: string
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}api/categories/`
    )
    const json = await resp.json()
    return json.data
  } catch (error) {
    console.error(error)
    return []
  }
}
