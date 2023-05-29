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
      if (state.selectedDay === action.payload) {
        return {
          ...state,
          selectedDay: ''
        }
      }

      return {
        ...state,
        selectedDay: action.payload
      }

    case ActionTypes.ADD_TO_PLAN: {
      const { exerciseName, id } = action.payload
      const newExerciseDetail = {
        id: id,
        exerciseName: exerciseName,
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
      const { date, sets, reps, exerciseName, id } = action.payload

      const newExercises = [...state.plannedDays]
        .find((day) => day.id === state.selectedDay)
        ?.exercises.map((exercise) => {
          if (exercise.id === id) {
            return { ...exercise, sets: sets, repeats: reps }
          }
          return exercise
        })

      const newPlannedDays = [...state.plannedDays].map((day) => {
        if (day.id === state.selectedDay) {
          return { ...day, exercises: newExercises }
        }
        return day
      })

      return { ...state, plannedDays: newPlannedDays }
    }

    case ActionTypes.REMOVE_EXERCISE: {
      const { dayId, exerciseId } = action.payload

      const newPlannedDays = [...state.plannedDays].map((day) => {
        if (day.id === dayId) {
          const newExercises = day.exercises.filter(
            (exercise) => exercise.id !== exerciseId
          )

          return { ...day, exercises: newExercises }
        }

        return day
      })

      setStorageDays(newPlannedDays)
      return { ...state, plannedDays: newPlannedDays }
    }

    default:
      return state
  }
}
