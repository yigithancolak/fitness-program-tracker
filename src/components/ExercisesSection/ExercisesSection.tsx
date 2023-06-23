import { Button, Unstable_Grid2 as Grid } from '@mui/material'
import { useState } from 'react'
import { theme } from '../../styles/theme'
import { muscles } from '../../utils/constans'
import { textChanger } from '../../utils/helpers'
import { MuscleExercises } from './components/MuscleExercises'

export const ExercisesSection = () => {
  const [showedMuscle, setShowedMuscle] = useState(muscles[0])
  return (
    <Grid container overflow='auto'>
      <Grid
        xs={12}
        borderRight={`1px solid ${theme.palette.secondary.main}`}
        display='flex'
        gap={1}
        padding={2}
        overflow='auto'
      >
        {muscles.map((muscle, index) => (
          <Button
            key={index}
            variant={showedMuscle === muscle ? 'contained' : 'outlined'}
            color='primary'
            sx={{ fontSize: 12, minWidth: 100 }}
            onClick={() => setShowedMuscle(muscle)}
            disableRipple
          >
            {textChanger(muscle)}
          </Button>
        ))}
      </Grid>

      <Grid
        xs={12}
        padding={1}
        display='flex'
        flexWrap='wrap'
        justifyContent='center'
        alignItems='center'
        gap={2}
      >
        <MuscleExercises muscle={showedMuscle} />
      </Grid>
    </Grid>
  )
}
