import { Box, Button, Typography } from '@mui/material'

interface SetsRepsTypes {
  sets: string
  repeats: string
  setEditMode: (state: boolean) => void
}

export const SetsRepsDetail = (props: SetsRepsTypes) => {
  const { sets, repeats, setEditMode } = props
  return (
    <Box display='flex' alignItems='center' justifyContent='flex-end'>
      {sets !== '' && repeats !== '' && (
        <Typography marginRight={2}>
          {sets}x{repeats}
        </Typography>
      )}
      <Box display='flex' flexDirection='column' justifyContent='center'>
        <Button
          variant='text'
          onClick={() => setEditMode(true)}
          sx={{ fontSize: 10 }}
        >
          {!repeats && !sets ? 'Add' : 'Change'}
        </Button>
        <Button variant='text' sx={{ fontSize: 10 }}>
          Remove
        </Button>
      </Box>
    </Box>
  )
}
