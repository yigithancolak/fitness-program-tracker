import { AddBoxOutlined, QuestionMark } from '@mui/icons-material'
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { getExercises } from '../../../api/apiRequests'
import { CalendarContext } from '../../../store/context'
import { ActionTypes } from '../../../store/reducer/actions'
import { ExerciseDetailModal } from './ExerciseDetailModal'

interface MuscleExercisesProps {
  muscle: string
}

interface ExerciseType {
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
    queryFn: () => getExercises(muscle)
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
      <Stack component='div'>
        {data.map((exercise: ExerciseType, index: number) => {
          return (
            <Box
              key={index}
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Typography>{exercise.name}</Typography>
              <Box display='flex'>
                <IconButton
                  onClick={() => {
                    dispatch({
                      type: ActionTypes.ADD_TO_PLAN,
                      payload: exercise.name
                    })
                  }}
                >
                  <AddBoxOutlined />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setShowDetail(true)
                    setExerciseData(exercise)
                  }}
                >
                  <QuestionMark />
                </IconButton>
              </Box>
            </Box>
          )
        })}
      </Stack>
    </>
  )
}
