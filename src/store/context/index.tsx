import { PropsWithChildren, createContext, useReducer } from 'react'
import { PlanType } from '../../components/UserDatePicker/UserDatePicker'
import { getStorageDays } from '../../utils/localStorage'
import { reducer } from '../reducer'

export type InitialStateType = {
  plannedDays: PlanType[]
  selectedDay: string
}

export const initialState: InitialStateType = {
  plannedDays: getStorageDays(),
  selectedDay: getStorageDays()[0].date || ''
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
