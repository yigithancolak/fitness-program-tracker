import { AddBoxOutlined, QuestionMark } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { CalendarContext } from '../../../store/context'
import { ActionTypes } from '../../../store/reducer/actions'
import { theme } from '../../../styles/theme'
import { ExerciseType } from './MuscleExercises'

interface ExerciseBoxProps {
  exercise: ExerciseType
  setShowDetail: (key: boolean) => void
  setExerciseData: (key: ExerciseType) => void
}

export const ExerciseBox = (props: ExerciseBoxProps) => {
  const { exercise, setShowDetail, setExerciseData } = props
  const {
    dispatch,
    state: { selectedDay }
  } = useContext(CalendarContext)

  const handleAddPlan = () => {
    if (selectedDay === '') {
      toast.error('Please choose a day before you add an exercise')
    }

    dispatch({
      type: ActionTypes.ADD_TO_PLAN,
      payload: { id: uuidv4(), exerciseName: exercise.name }
    })
  }

  const handleShowDetail = () => {
    setShowDetail(true)
    setExerciseData(exercise)
  }

  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      border={2}
      paddingX={1}
      borderRadius={3}
      width={250}
      borderColor={theme.palette.primary.main}
    >
      <Typography>{exercise.name}</Typography>
      <Box display='flex'>
        <IconButton onClick={() => handleAddPlan()}>
          <AddBoxOutlined htmlColor={theme.palette.primary.main} />
        </IconButton>
        <IconButton onClick={() => handleShowDetail()}>
          <QuestionMark htmlColor={theme.palette.primary.main} />
        </IconButton>
      </Box>
    </Box>
  )
}
