import { Box, Button, Typography } from '@mui/material'
import { useContext } from 'react'
import { CalendarContext } from '../../../store/context'
import { ActionTypes } from '../../../store/reducer/actions'
import { theme } from '../../../styles/theme'

interface SetsRepsTypes {
  dayId: string
  exerciseId: string
  sets: string
  repeats: string
  setEditMode: (state: boolean) => void
}

export const SetsRepsDetail = (props: SetsRepsTypes) => {
  const { sets, repeats, exerciseId, setEditMode, dayId } = props
  const { dispatch } = useContext(CalendarContext)

  const handleRemoveExercise = () => {
    dispatch({
      type: ActionTypes.REMOVE_EXERCISE,
      payload: { dayId, exerciseId }
    })
  }

  return (
    <Box display='flex' alignItems='center' justifyContent='flex-end'>
      {sets !== '' && repeats !== '' && (
        <Typography marginRight={2} overflow='auto'>
          {sets} x {repeats}
        </Typography>
      )}
      <Box display='flex' flexDirection='column' justifyContent='center'>
        <Button
          variant='text'
          onClick={() => setEditMode(true)}
          sx={{ fontSize: 10, color: theme.palette.primary.main }}
        >
          {!repeats && !sets ? 'Add' : 'Change'}
        </Button>
        <Button
          variant='text'
          sx={{ fontSize: 10, color: theme.palette.primary.main }}
          onClick={() => handleRemoveExercise()}
        >
          Remove
        </Button>
      </Box>
    </Box>
  )
}
