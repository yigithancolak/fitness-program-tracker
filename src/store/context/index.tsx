import { PropsWithChildren, createContext, useReducer } from 'react'
import { getStorageDays } from '../../utils/localStorage'
import { reducer } from '../reducer'

export type InitialStateType = {
  plannedDays: string[]
}

export const initialState: InitialStateType = {
  plannedDays: getStorageDays()
}

export const CalendarContext = createContext<{
  state: InitialStateType
  dispatch: any
}>({ state: initialState, dispatch: () => null })

export const CalendarProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <CalendarContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CalendarContext.Provider>
  )
}
