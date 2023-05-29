import { CircularProgress, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { getExercises } from '../../../api/apiRequests'
import { CalendarContext } from '../../../store/context'
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
  const [exercises, setExercises] = useState<ExerciseType[]>([])
  const [showDetail, setShowDetail] = useState(false)
  const [exerciseData, setExerciseData] = useState<ExerciseType | null>(null)
  const { dispatch } = useContext(CalendarContext)

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

  const onModalClose = () => setShowDetail(false)

  if (isFetching) {
    return <CircularProgress thickness={10} color='warning' />
  }

  return (
    <>
      <ExerciseDetailModal
        showDetail={showDetail}
        onModalClose={onModalClose}
        exerciseInstructions={exerciseData?.instructions}
        exerciseName={exerciseData?.name}
      />
      <Stack component='div' gap={2}>
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
      </Stack>
    </>
  )
}
