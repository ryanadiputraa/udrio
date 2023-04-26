import { IMetaPagination } from "./meta"

export type FetchDataResponse<T> = {
  data: T
  isError: boolean
}

export interface FetchDataResponseWithPagination<T>
  extends FetchDataResponse<T> {
  meta: IMetaPagination
}

export type FetchNoDataResponse = Omit<FetchDataResponse<null>, "data">
