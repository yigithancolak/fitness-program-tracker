import { Button, Card, Unstable_Grid2 as Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { muscles } from '../../utils/constans'
import { MuscleExercises } from './components/MuscleExercises'

export const ExercisesSection = () => {
  const [showedMuscle, setShowedMuscle] = useState(muscles[0])
  return (
    <Card sx={{ height: '100%', overflow: 'auto' }}>
      <Grid container height='100%'>
        <Grid
          xs={4}
          padding={1}
          borderRight='1px solid gainsboro'
          display='flex'
          flexDirection='column'
        >
          {muscles.map((muscle, index) => (
            <Button
              key={index}
              variant='outlined'
              color='warning'
              size='small'
              sx={{ fontSize: 12 }}
              onClick={() => setShowedMuscle(muscle)}
            >
              {muscle}
            </Button>
          ))}
        </Grid>

        <Grid xs={8} padding={1}>
          <Typography textAlign='center' textTransform='uppercase'>
            {showedMuscle}
          </Typography>
          <MuscleExercises muscle={showedMuscle} />
        </Grid>
      </Grid>
    </Card>
  )
}
