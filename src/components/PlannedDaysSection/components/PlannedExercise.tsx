import { AddTask } from '@mui/icons-material'
import {
  Box,
  Button,
  Unstable_Grid2 as Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'

interface PlannedExerciseProps {
  exerciseName: string
  exerciseDate: string
  repeats: string
  sets: string
}

export const PlannedExercise = (props: PlannedExerciseProps) => {
  const { exerciseName, exerciseDate, repeats, sets } = props
  const [editMode, setEditMode] = useState(false)
  return (
    <Grid container>
      <Grid xs={6} display='flex' alignItems='center'>
        <Typography bgcolor='red'>{exerciseName}</Typography>
      </Grid>

      <Grid xs={6}>
        {editMode ? (
          <form>
            <Box display='flex' alignItems='center'>
              <TextField label='sets' variant='outlined' />
              <TextField label='reps' variant='outlined' />
              <IconButton type='submit'>
                <AddTask sx={{ color: 'coral' }} />
              </IconButton>
            </Box>
          </form>
        ) : (
          <Box>
            <Typography>
              {repeats}
              {sets}
            </Typography>
            <Button variant='text' onClick={() => setEditMode(true)}>
              {!repeats && !sets ? 'Add' : 'Change'}
            </Button>
            <Button variant='text'>Remove</Button>
          </Box>
        )}
      </Grid>
    </Grid>
  )
}
