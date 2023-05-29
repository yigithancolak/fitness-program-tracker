import { AddBoxOutlined, QuestionMark } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { CalendarContext } from '../../../store/context'
import { ActionTypes } from '../../../store/reducer/actions'
import { ExerciseType } from './MuscleExercises'

interface ExerciseBoxProps {
  exercise: ExerciseType
  setShowDetail: (key: boolean) => void
  setExerciseData: (key: ExerciseType) => void
}

export const ExerciseBox = (props: ExerciseBoxProps) => {
  const { exercise, setShowDetail, setExerciseData } = props
  const { dispatch } = useContext(CalendarContext)
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      border={2}
      paddingX={1}
      borderRadius={3}
      borderColor='coral'
    >
      <Typography>{exercise.name}</Typography>
      <Box display='flex'>
        <IconButton
          onClick={() => {
            dispatch({
              type: ActionTypes.ADD_TO_PLAN,
              payload: { id: uuidv4(), exerciseName: exercise.name }
            })
          }}
        >
          <AddBoxOutlined />
        </IconButton>
        <IconButton
          onClick={() => {
            setShowDetail(true)
            setExerciseData(exercise)
          }}
        >
          <QuestionMark />
        </IconButton>
      </Box>
    </Box>
  )
}