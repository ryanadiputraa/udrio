const CURRENCY_OPTION: Intl.NumberFormatOptions = {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
}

export const formatCurrency = (price: number): string =>
  price.toLocaleString("id-ID", CURRENCY_OPTION)
