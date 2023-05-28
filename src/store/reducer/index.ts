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

    case ActionTypes.ADD_TO_PLAN: {
      const newExerciseDetail = {
        exerciseName: action.payload,
        sets: '',
        repeats: ''
      }
      const newPlannedDays = [...state.plannedDays].map((day) => {
        if (day.date === state.selectedDay) {
          return { ...day, exercises: [...day.exercises, newExerciseDetail] }
        }
        return day
      })
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
