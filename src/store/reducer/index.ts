import { sortPlanByDate } from '../../utils/helpers'
import { setStorageDays } from '../../utils/localStorage'
import { InitialStateType } from '../context'
import { ActionTypes } from './actions'

export type ReducerAction = { type: string; payload: any }

export const reducer = (state: InitialStateType, action: ReducerAction) => {
  switch (action.type) {
    case ActionTypes.ADD_DAY: {
      const isAddedBefore = [...state.plannedDays].some(
        (day) => day.date === action.payload.date
      )

      if (isAddedBefore) {
        return state
      }

      const newPlannedDays = [...state.plannedDays, action.payload]
      const sortedPlannedDays = sortPlanByDate([...newPlannedDays])

      setStorageDays(sortedPlannedDays)

      return {
        ...state,
        plannedDays: sortedPlannedDays
      }
    }

    case ActionTypes.DELETE_DAY: {
      const newPlannedDays = [...state.plannedDays].filter(
        (day) => day.id !== action.payload
      )
      setStorageDays([...newPlannedDays])
      return { ...state, plannedDays: newPlannedDays }
    }

    case ActionTypes.SET_SELECTED_DAY:
      return {
        ...state,
        selectedDay: action.payload
      }

    case ActionTypes.ADD_TO_PLAN: {
      const newExerciseDetail = {
        exerciseName: action.payload,
        sets: '',
        repeats: ''
      }
      const newPlannedDays = [...state.plannedDays].map((day) => {
        if (day.id === state.selectedDay) {
          return { ...day, exercises: [...day.exercises, newExerciseDetail] }
        }
        return day
      })
      setStorageDays([...newPlannedDays])

      return {
        ...state,
        plannedDays: newPlannedDays
      }
    }

    case ActionTypes.CHANGE_REPS_SETS: {
      const { date, sets, reps, exerciseName } = action.payload

      const newExercises = [...state.plannedDays]
        .find((day) => day.date === date)
        ?.exercises.map((exercise) => {
          if (exercise.exerciseName === exerciseName) {
            return { ...exercise, sets: sets, repeats: reps }
          }
          return exercise
        })

      const newPlannedDays = [...state.plannedDays].map((day) => {
        if (day.date === date) {
          return { ...day, exercises: newExercises }
        }
        return day
      })

      return { ...state, plannedDays: newPlannedDays }
    }

    default:
      return state
  }
}
