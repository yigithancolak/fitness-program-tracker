import axios from 'axios'
import { fitnesApiKey } from '../utils/envVariables'

export const getExercises = async (muscle: string) => {
  try {
    const response = await axios.get(
      `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`,
      {
        headers: { 'X-Api-Key': fitnesApiKey }
      }
    )
    const data = await response.data

    console.log(data)

    return data
  } catch (error) {
    console.log(error)
  }
}
