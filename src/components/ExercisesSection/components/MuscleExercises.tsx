import { AddBoxOutlined, QuestionMark } from '@mui/icons-material'
import { Box, IconButton, Modal, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getExercises } from '../../../api/apiRequests'

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
                  <IconButton>
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
