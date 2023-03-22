"use client"

import { createContext, Dispatch, ReactNode, useReducer } from "react"

import { IMainAction, IMainState, mainReducer } from "./reducers/main"

interface IInitialState {
  main: IMainState
}
const initialState: IInitialState = {
  main: {
    userData: {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      picture: "",
      locale: "",
    },
  },
}

const AppContext = createContext<{
  main: IMainState
  mainDispatch: Dispatch<IMainAction>
}>({
  main: initialState.main,
  mainDispatch: () => null,
})

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mainState, mainDispatch] = useReducer(
    (main: IMainState, action: IMainAction) => mainReducer(main, action),
    initialState.main
  )

  return (
    <AppContext.Provider
      value={{
        main: mainState,
        mainDispatch: mainDispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
