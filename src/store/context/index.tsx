import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react'
import { PlanType } from '../../components/UserDatePicker/UserDatePicker'
import { getStorageDays } from '../../utils/localStorage'
import { reducer } from '../reducer'
import { ActionTypes } from '../reducer/actions'

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
  dispatch: Dispatch<{ type: ActionTypes; payload: any }>
}>({ state: initialState, dispatch: () => null })

export const CalendarProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useReducer(
    reducer as any,
    initialState as InitialStateType
  )

  return (
    <CalendarContext.Provider value={{ state, dispatch } as any}>
      {props.children}
    </CalendarContext.Provider>
  )
}
