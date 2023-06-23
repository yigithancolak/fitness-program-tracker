import { CircularProgress } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getExercises } from '../../../api/apiRequests'
import { ExerciseBox } from './ExerciseBox'
import { ExerciseDetailModal } from './ExerciseDetailModal'

interface MuscleExercisesProps {
  muscle: string
}

export interface ExerciseType {
  difficulty: string
  equipment: string
  instructions: string
  muscle: string
  name: string
  type: string
}

export const MuscleExercises = (props: MuscleExercisesProps) => {
  const { muscle } = props
  const [showDetail, setShowDetail] = useState(false)
  const [exerciseData, setExerciseData] = useState<ExerciseType | null>(null)

  // useEffect(() => {

  //   getExercises(muscle)
  //     .then((data) => {
  //       setExercises(data || [])
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [muscle])

  const { isFetching, data } = useQuery({
    queryKey: ['muscleExercises', muscle],
    queryFn: () => getExercises(muscle),
    refetchOnWindowFocus: false
  })

  if (isFetching) {
    return <CircularProgress thickness={10} color='primary' />
  }

  return (
    <>
      <ExerciseDetailModal
        showDetail={showDetail}
        setShowDetail={setShowDetail}
        exerciseData={exerciseData}
      />

      {data.map((exercise: ExerciseType, index: number) => {
        return (
          <ExerciseBox
            key={index}
            exercise={exercise}
            setShowDetail={setShowDetail}
            setExerciseData={setExerciseData}
          />
        )
      })}
    </>
  )
}
