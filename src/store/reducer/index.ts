import { sortPlanByDate } from '../../utils/helpers'
import { setStorageDays } from '../../utils/localStorage'
import { InitialStateType } from '../context'
import { ActionTypes } from './actions'

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

type ReducerPayload = {
  [ActionTypes.ADD_DAY]: {
    date: string
    id: string
    exercises: []
  }
  [ActionTypes.DELETE_DAY]: string
  [ActionTypes.SET_SELECTED_DAY]: string
  [ActionTypes.ADD_TO_PLAN]: {
    exerciseName: string
    id: string
  }
  [ActionTypes.CHANGE_REPS_SETS]: {
    sets: string
    reps: string
    id: string
    date: string
    exerciseName: string
  }
  [ActionTypes.REMOVE_EXERCISE]: {
    dayId: string
    exerciseId: string
  }
}

export type ReducerActions =
  ActionMap<ReducerPayload>[keyof ActionMap<ReducerPayload>]

export const reducer = (
  state: InitialStateType,
  action: ReducerActions
): InitialStateType => {
  switch (action.type) {
    case ActionTypes.ADD_DAY: {
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
      const { sets, reps, id } = action.payload

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
          return { ...day, exercises: newExercises || [] }
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
