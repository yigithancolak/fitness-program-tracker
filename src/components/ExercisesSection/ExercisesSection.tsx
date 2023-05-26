import { Button, Card, Unstable_Grid2 as Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { muscles } from '../../utils/constans'
import { MuscleExercises } from './components/MuscleExercises'

export const ExercisesSection = () => {
  const [showedMuscle, setShowedMuscle] = useState(muscles[0])
  return (
    <Card sx={{ height: '100%' }}>
      <Typography textAlign='center'>Third Part</Typography>
      <Grid container>
        <Grid
          md={4}
          padding={1}
          border='1px solid black'
          display='flex'
          flexDirection='column'
        >
          {muscles.map((muscle, index) => (
            <Button
              key={index}
              variant='outlined'
              color='warning'
              size='small'
              sx={{ fontSize: 10 }}
              onClick={() => setShowedMuscle(muscle)}
            >
              {muscle}
            </Button>
          ))}
        </Grid>

        <Grid md={8}>
          <MuscleExercises muscle={showedMuscle} />
        </Grid>
      </Grid>
    </Card>
  )
}
