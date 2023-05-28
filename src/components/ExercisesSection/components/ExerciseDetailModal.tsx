import { Box, Modal, Typography } from '@mui/material'

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
  onModalClose: () => void
  exerciseInstructions: string | undefined
  exerciseName: string | undefined
}

export const ExerciseDetailModal = (props: DetailModalProps) => {
  const { showDetail, onModalClose, exerciseInstructions, exerciseName } = props
  return (
    <Modal
      open={showDetail}
      onClose={onModalClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style} overflow='auto'>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          {exerciseName}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          {exerciseInstructions}
        </Typography>
      </Box>
    </Modal>
  )
}
