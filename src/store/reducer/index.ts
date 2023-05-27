import { InitialStateType } from '../context'
import { ActionTypes } from './actions'

export const reducer = (state: InitialStateType, action: any) => {
  switch (action.type) {
    case ActionTypes.ADD_DAY:
      return {
        ...state,
        plannedDays: [...state.plannedDays, action.payload]
      }
    case ActionTypes.SET_SELECTED_DAY:
      return {
        ...state,
        selectedDay: action.payload
      }

    default:
      return state
  }
}
