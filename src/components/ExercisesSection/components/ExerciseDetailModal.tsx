import { Box, Modal, Typography } from '@mui/material'
import { textChanger } from '../../../utils/helpers'
import { ExerciseType } from './MuscleExercises'

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

interface DetailModalProps {
  showDetail: boolean
  setShowDetail: (val: boolean) => void
  exerciseData: ExerciseType | null
}

export const ExerciseDetailModal = (props: DetailModalProps) => {
  const { showDetail, setShowDetail, exerciseData } = props
  return (
    <Modal
      open={showDetail}
      onClose={() => setShowDetail(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style} overflow='auto'>
        <Typography
          id='modal-modal-title'
          variant='body1'
          component='h3'
          color='primary'
          textTransform='uppercase'
        >
          {exerciseData?.name}
        </Typography>
        <Typography textTransform='capitalize'>
          Difficulty:{' '}
          <Typography component='span' color='secondary'>
            {exerciseData?.difficulty}
          </Typography>
        </Typography>
        <Typography textTransform='capitalize'>
          Equipment:
          <Typography component='span' color='secondary'>
            {textChanger(exerciseData?.equipment)}
          </Typography>
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }} variant='body2'>
          {exerciseData?.instructions}
        </Typography>
      </Box>
    </Modal>
  )
}
