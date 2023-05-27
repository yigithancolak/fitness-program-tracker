import { AddBoxOutlined, QuestionMark } from '@mui/icons-material'
import { Box, IconButton, Modal, Stack, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { getExercises } from '../../../api/apiRequests'
import { CalendarContext } from '../../../store/context'
import { ActionTypes } from '../../../store/reducer/actions'

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
  const [instructionData, setInstructionData] = useState<ExerciseType | null>(
    null
  )
  const { dispatch } = useContext(CalendarContext)

  useEffect(() => {
    getExercises(muscle).then((data) => setExercises(data || []))
  }, [muscle])

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }

  return (
    <>
      <Modal
        open={showDetail}
        onClose={() => {
          setShowDetail(false)
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style} overflow='auto'>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {instructionData?.name}
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {instructionData?.instructions}
          </Typography>
        </Box>
      </Modal>
      <Stack component='div'>
        {exercises &&
          exercises.map((exercise: ExerciseType, index: number) => {
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
                      setInstructionData(exercise)
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
