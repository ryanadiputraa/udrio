import { ICart } from "data/cart"
import { IUserData } from "data/user"

export const mainReducer = (state: IMainState, action: IMainAction) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload,
      }

    case "SET_CART":
      return {
        ...state,
        cart: action.payload,
      }

    default:
      return { ...state }
  }
}

export interface IMainState {
  userData: IUserData
  cart: ICart[]
}

export type IMainAction =
  | { type: "SET_USER_DATA"; payload: IUserData }
  | { type: "SET_CART"; payload: ICart[] }
