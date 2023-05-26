import { InitialStateType } from '../context'
import { ActionTypes } from './actions'

export const reducer = (state: InitialStateType, action: any) => {
  switch (action.type) {
    case ActionTypes.ADD_DAY:
      return {
        ...state,
        plannedDays: [...state.plannedDays, action.payload]
      }

    default:
      return state
  }
}
