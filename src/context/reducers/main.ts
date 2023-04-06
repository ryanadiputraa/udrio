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

    case "SHOW_TOAST":
      return {
        ...state,
        toast: {
          isOpen: true,
          ...action.payload,
        },
      }

    case "CLOSE_TOAST":
      if (action.callback) action.callback()
      const defaultToast: Toast = {
        isOpen: false,
        message: "",
        type: "SUCCESS",
      }

      return {
        ...state,
        toast: defaultToast,
      }

    default:
      return { ...state }
  }
}

export interface IMainState {
  userData: IUserData
  cart: ICart[]
  toast: Toast
}

export type IMainAction =
  | { type: "SET_USER_DATA"; payload: IUserData }
  | { type: "SET_CART"; payload: ICart[] }
  | { type: "SHOW_TOAST"; payload: ToastPayload }
  | { type: "CLOSE_TOAST"; callback?: () => any }

type Toast = {
  isOpen: boolean
  message: string
  type: "SUCCESS" | "ERROR" | "WARNING"
}

type ToastPayload = Omit<Toast, "isOpen">
