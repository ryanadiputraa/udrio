import { IUserData } from "data/user"

export const mainReducer = (state: IMainState, action: IMainAction) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload,
      }

    default:
      return { ...state }
  }
}

export interface IMainState {
  userData: IUserData
}

export type IMainAction = { type: "SET_USER_DATA"; payload: IUserData }
