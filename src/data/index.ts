export type FetchDataResponse<T> = {
  data: T
  isError: boolean
}

export type FetchNoDataResponse = Omit<FetchDataResponse<null>, "data">
