import { AddTask } from '@mui/icons-material'
import {
  Box,
  Button,
  Unstable_Grid2 as Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import { FormEventHandler, useContext, useState } from 'react'
import { CalendarContext } from '../../../store/context'
import { ActionTypes } from '../../../store/reducer/actions'

interface PlannedExerciseProps {
  exerciseName: string
  exerciseDate: string
  repeats: string
  sets: string
}

export const PlannedExercise = (props: PlannedExerciseProps) => {
  const { exerciseName, exerciseDate, repeats, sets } = props
  const { dispatch } = useContext(CalendarContext)
  const [editMode, setEditMode] = useState(false)
  const [repsCount, setRepsCount] = useState('')
  const [setsCount, setSetsCount] = useState('')

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (repsCount !== '' && setsCount !== '') {
      dispatch({
        type: ActionTypes.CHANGE_REPS_SETS,
        payload: {
          date: exerciseDate,
          reps: repsCount,
          sets: setsCount,
          exerciseName: exerciseName
        }
      })
      setEditMode(false)
    }
  }

  return (
    <Grid container>
      <Grid xs={6} display='flex' alignItems='center'>
        <Typography>{exerciseName}</Typography>
      </Grid>

      <Grid xs={6}>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <Box display='flex' alignItems='center'>
              <TextField
                value={setsCount}
                onChange={(e) => setSetsCount(e.target.value)}
                type='number'
                label='sets'
                variant='outlined'
              />
              <TextField
                value={repsCount}
                onChange={(e) => setRepsCount(e.target.value)}
                type='number'
                label='reps'
                variant='outlined'
              />
              <IconButton type='submit'>
                <AddTask sx={{ color: 'coral' }} />
              </IconButton>
            </Box>
          </form>
        ) : (
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
          >
            {sets !== '' && repeats !== '' && (
              <Typography>
                {sets}x{repeats}
              </Typography>
            )}
            <Box display='flex' flexDirection='column' justifyContent='center'>
              <Button
                variant='text'
                onClick={() => setEditMode(true)}
                sx={{ fontSize: 10 }}
              >
                {!repeats && !sets ? 'Add' : 'Change'}
              </Button>
              <Button variant='text' sx={{ fontSize: 10 }}>
                Remove
              </Button>
            </Box>
          </Box>
        )}
      </Grid>
    </Grid>
  )
}
