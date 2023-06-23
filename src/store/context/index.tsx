import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react'
import { PlanType } from '../../components/UserDatePicker/UserDatePicker'
import { getStorageDays } from '../../utils/localStorage'
import { ReducerActions, reducer } from '../reducer'

export type InitialStateType = {
  plannedDays: PlanType[]
  selectedDay: string
}

export const initialState: InitialStateType = {
  plannedDays: getStorageDays(),
  selectedDay: ''
}

export const CalendarContext = createContext<{
  state: InitialStateType
  dispatch: Dispatch<ReducerActions>
}>({ state: initialState, dispatch: () => null })

export const CalendarProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <CalendarContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CalendarContext.Provider>
  )
}
