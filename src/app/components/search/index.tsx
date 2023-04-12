"use client"

import { fetchProducts } from "data/products"
import { useRouter } from "next/navigation"
import AsyncSelect from "react-select/async"

interface IOption {
  value: string
  label: string
}

export default function Search() {
  let searchTimeout: NodeJS.Timeout
  const MAX_LIST_OPTION = 3
  const router = useRouter()

  const searchProducts = (
    inputValue: string,
    callback: (products: IOption[]) => void
  ) => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(async () => {
      let options: IOption[] = []
      if (inputValue) {
        const resp = await fetchProducts(undefined, inputValue)
        resp.data?.forEach((product, idx) => {
          if (idx === MAX_LIST_OPTION) return
          options.push({
            value: product.id,
            label: product.product_name,
          })
        })
      }
      callback(options)
    }, 1000)
  }

  return (
    <AsyncSelect
      instanceId={"productSearch"}
      placeholder={"Cari..."}
      className="w-1/2 border-2 border-solid border-grey py-1 px-4 rounded-2xl"
      cacheOptions
      loadOptions={searchProducts}
      defaultOptions={[]}
      noOptionsMessage={({ inputValue }) =>
        !inputValue ? "Ketik untuk mencari" : "Produk tidak ditemukan"
      }
      loadingMessage={({ inputValue }) => `Mencari ${inputValue}...`}
      onChange={(e) => router.push(`/products/${e?.value}`)}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      styles={{
        control: (base, state) => ({
          ...base,
          border: 0,
          boxShadow: state.isFocused ? "none" : "none",
          "&:hover": {
            border: state.isFocused ? 0 : 0,
          },
        }),
      }}
    />
  )
}
