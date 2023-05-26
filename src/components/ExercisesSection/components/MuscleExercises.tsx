import { Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getExercises } from '../../../api/apiRequests'

interface MuscleExercisesProps {
  muscle: string
}

type ExerciseType = {
  difficulty: string
  equipment: string
  instructions: string
  muscle: string
  name: string
  type: string
}

export const MuscleExercises = (props: MuscleExercisesProps) => {
  const { muscle } = props
  const [exercises, setExercises] = useState<ExerciseType[]>([])

  useEffect(() => {
    getExercises(muscle).then((data) => setExercises(data || []))
  }, [muscle])

  return (
    <Stack component='div'>
      {exercises &&
        exercises.map((exercise: ExerciseType, index: number) => {
          return <Typography key={index}>{exercise.name}</Typography>
        })}
    </Stack>
  )
}
