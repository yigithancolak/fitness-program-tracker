import { Button, Card, Unstable_Grid2 as Grid } from '@mui/material'
import { useState } from 'react'
import { muscles } from '../../utils/constans'
import { buttonTextChanger } from '../../utils/helpers'
import { MuscleExercises } from './components/MuscleExercises'

export const ExercisesSection = () => {
  const [showedMuscle, setShowedMuscle] = useState(muscles[0])
  return (
    <Card sx={{ height: 525, overflow: 'auto' }}>
      <Grid container height='100%'>
        <Grid
          xs={4}
          padding={1}
          borderRight='1px solid gainsboro'
          display='flex'
          flexDirection='column'
          gap={1}
        >
          {muscles.map((muscle, index) => (
            <Button
              key={index}
              variant={showedMuscle === muscle ? 'contained' : 'outlined'}
              color='primary'
              size='small'
              sx={{ fontSize: 12 }}
              onClick={() => setShowedMuscle(muscle)}
            >
              {buttonTextChanger(muscle)}
            </Button>
          ))}
        </Grid>

        <Grid
          xs={8}
          padding={1}
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <MuscleExercises muscle={showedMuscle} />
        </Grid>
      </Grid>
    </Card>
  )
}
