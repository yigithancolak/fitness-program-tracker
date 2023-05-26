import { AddBoxOutlined, QuestionMark } from '@mui/icons-material'
import { Box, IconButton, Modal, Stack, Typography } from '@mui/material'
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
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    getExercises(muscle).then((data) => setExercises(data || []))
  }, [muscle])

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }

  return (
    <Stack component='div'>
      {exercises &&
        exercises.map((exercise: ExerciseType, index: number) => {
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
                <Box sx={style}>
                  <Typography
                    id='modal-modal-title'
                    variant='h6'
                    component='h2'
                  >
                    Text in a modal
                  </Typography>
                  <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                  </Typography>
                </Box>
              </Modal>
              <Box
                key={index}
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography>{exercise.name}</Typography>
                <Box display='flex'>
                  <IconButton>
                    <AddBoxOutlined />
                  </IconButton>
                  <IconButton onClick={() => setShowDetail(true)}>
                    <QuestionMark />
                  </IconButton>
                </Box>
              </Box>
            </>
          )
        })}
    </Stack>
  )
}
